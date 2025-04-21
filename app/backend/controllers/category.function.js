import prisma  from '../db/client.js'; // Import the Prisma client instance

// Function to create a new category
export async function createCategory({category_name}) {
    await Validation.categoryDoesNotExist(category_name)
    try {
        const newCategory = await prisma.category.create({data: {category_name}});
        return newCategory;
        
    } catch (error) {
        throw new Error(`Error creating category: ${error.message}`);
    }
}

// Function to get categories
export async function getCategories() {
    try{
        const categories = await prisma.category.findMany();
        return categories;
    }catch(error){
        throw new Error('Error connecting to the database')
    }
}


// Function to delete a category
export async function deleteCategory({category_name}) {
    await Validation.categoryMustExist(category_name)

    try{
        const delCategory = await prisma.category.delete({
            where: {category_name}
        });
        return delCategory;
    }catch(error){
        throw new Error(`Error deleting category: ${error.message}`)
    }
}
 
class Validation {
    static async checkCategoryExistence(category_name) {
        const existingCategory = await prisma.category.findUnique({ where: { category_name } });
        return existingCategory;
    }

    // Valida que NO exista (para crear)
    static async categoryDoesNotExist(category_name) {
        const existingCategory = await this.checkCategoryExistence(category_name);
        if (existingCategory) {
            throw new Error('This category already exists');
        }
    }

    // Valida que SI exista (para eliminar o editar)
    static async categoryMustExist(category_name) {
        const existingCategory = await this.checkCategoryExistence(category_name);
        if (!existingCategory) {
            throw new Error('This category does not exist');
        }
    }
}