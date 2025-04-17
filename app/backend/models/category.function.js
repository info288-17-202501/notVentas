import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

// Function to create a new category
export async function createCategory(category_name) {
    try {
        Validation.category(category_name)
        const newCategory = await prisma.category.create({data: category_name});
        return newCategory;
        
    } catch (error) {
        throw new Error(`Error creating category: ${error.message}`);
    }
}
 
class Validation {
    static async category(category_name){
        const existingCategory = await prisma.category.findUnique({ where: { category_name } });
            if (existingCategory) {
                throw new Error('This category already exists');
            }
    }
}