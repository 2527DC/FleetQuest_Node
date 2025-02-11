
import { PrismaClient } from '../../prisma/generated/tenent-client/index.js';

const prisma = new PrismaClient();


export const createEmployee = async (req,res) => {
const {name,email,phone,department}=req.body

  try {
    const employee = await prisma.employee.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        department: department
      }
    });

    res.status(201).json({
      message:" employed created "
    })
  } catch (error) {
    if (error.code === 'P2002') { // Unique constraint violation error code
      const failedFields = error.meta.target; // This will contain the violated field(s) as an array
  
      // Log the violated field(s)
      console.log(`Unique constraint failed on fields: ${failedFields.join(', ')}`);
  
      // Send an appropriate response
      res.status(400).json({
        message: ` ${failedFields} aleady exist`,
      });
    } else {
      // Handle other types of errors
      res.status(500).json({ error: error });
    }
  }
  
};



