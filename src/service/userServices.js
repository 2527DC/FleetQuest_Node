import { PrismaClient } from '../../prisma/generated/admin-client/index.js';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

const roleSecrets = {
  superadmin: 'superAdminSecretKey123',
  admin: 'subAdminSecretKey456',
  clientadmin: 'clientAdminSecretKey789',
};


export const getusers = async (req) => {
  const { email, password } = req.body;

  try {
    // Fetch user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('User not found');
      return { message: 'User not found', success: false };
    }

    const { username, role } = user;
    const secretKey = roleSecrets[role];

    if (!secretKey) {
      console.error(`Secret key for role '${role}' is not defined`);
      return { message: `Secret key for role '${role}' is not defined`, success: false };
    }

    // Compare passwords
    
    if (user.password === password) {
      const token = jwt.sign({ username,role}, secretKey, { expiresIn: '1h' });
      console.log('Password matches. User authenticated.',token);
      return { message: 'User authenticated', success: true, user, token :token };
    } else {
      console.log('Invalid password');
      return { message: 'Invalid password', success: false };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { message: 'Error fetching user data', success: false };
  } finally {
    await prisma.$disconnect();
  }
};
