import prisma  from '../db/client.js'; // Import the Prisma client instance

// Function to create a new brand
export async function createBrand({name}) {
    try {
        const existingBrand = await Validation.checkBrandExistence(name);
        if (existingBrand) return existingBrand;

        const newBrand = await prisma.brand.create({data: {name}});
        return newBrand;
        
    } catch (error) {
        throw new Error(`Error creating brand: ${error.message}`);
    }
}

class Validation {
    static async checkBrandExistence(name) {
        const existingBrand = await prisma.brand.findFirst({ where: { name } });
        return existingBrand;
    }
}
