import prisma  from '../db/client.js'; // Import the Prisma client instance

// Function to create a new category
export async function createCategory({name}) {
    await Validation.categoryDoesNotExist(name)
    try {
        const newCategory = await prisma.category.create({data: {name}});
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


// Function to update a category
export async function updateCategory({name, new_name}) {
    if (!name) {
        throw new Error('Category name is required');
    }
    await Validation.categoryMustExist(name)
    try{
        const data = {};
        if (new_name) data.name = new_name;
        
        if (Object.keys(data).length === 0) {
            throw new Error('No fields to update');
        }

        const updatedCategory = await prisma.category.update({
            where: { name },
            data
        });
        return updatedCategory;
    }catch(error){
        throw new Error(`Error updating category: ${error.message}`)
    }
}


// Function to delete a category
export async function deleteCategory({name}) {
    await Validation.categoryMustExist(name)

    try{
        const delCategory = await prisma.category.delete({
            where: {name}
        });
        return delCategory;
    }catch(error){
        throw new Error(`Error deleting category: ${error.message}`)
    }
}
 
class Validation {
    static async checkCategoryExistence(name) {
        const existingCategory = await prisma.category.findUnique({ where: { name } });
        return existingCategory;
    }

    // Valida que NO exista (para crear)
    static async categoryDoesNotExist(name) {
        const existingCategory = await this.checkCategoryExistence(name);
        if (existingCategory) {
            throw new Error('This category already exists');
        }
    }

    // Valida que SI exista (para eliminar o editar)
    static async categoryMustExist(name) {
        const existingCategory = await this.checkCategoryExistence(name);
        if (!existingCategory) {
            throw new Error('This category does not exist');
        }
    }
}