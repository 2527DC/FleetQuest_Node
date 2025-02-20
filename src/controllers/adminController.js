import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addDriver = async (req, res) => {
  try {
    const { driverName, phoneNumber, altPhoneNumber, city, vendor, currentAddress, permanentAddress, gender } = req.body;

    const newDriver = await prisma.driver.create({
      data: {
        driverName,
        phoneNumber,
        altPhoneNumber,
        city,
        vendor,
        currentAddress,
        permanentAddress,
        gender
      }
    });

    res.status(201).json({ message: "Driver added successfullyy", newDriver });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { addDriver };
