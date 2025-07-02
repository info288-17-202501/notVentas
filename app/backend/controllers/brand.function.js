import prisma  from '../db/client.js'; // Import the Prisma client instance

// Function to create a new brand
export async function createBrand({name}) {
    console.log("creando marca: ",name)
    if (!name) {
        throw new Error('Brand name is required');
    }

    const existingBrand = await Validation.checkBrandExistence(name);
    if (existingBrand) return existingBrand;

    const newBrand = await prisma.brand.create({data: {name}});
    return newBrand;
}

// Function to get brands
export async function getBrands() {
    try {
        const brands = await prisma.brand.findMany();
        return brands;
    } catch (error) {
        throw new Error('Error connecting to the database');
    }
}
// Function to update a brand
export async function updateBrand({name, new_name}) {
    if (!name) {
        throw new Error('Brand name is required');
    }
    await Validation.brandMustExist(name);

    try {
        const data = {};
        if (new_name) data.name = new_name;

        if (Object.keys(data).length === 0) {
            throw new Error('No fields to update');
        }

        const updatedBrand = await prisma.brand.update({
            where: { name },
            data
        });
        return updatedBrand;
    } catch (error) {
        throw new Error(`Error updating brand: ${error.message}`);
    }
}

// Function to delete a brand
export async function deleteBrand({name}) {
    await Validation.brandMustExist(name);

    try {
        const delBrand = await prisma.brand.delete({
            where: {name}
        });
        return delBrand;
    } catch (error) {
        throw new Error(`Error deleting brand: ${error.message}`);
    }
}

class Validation {
    static async checkBrandExistence(name) {
        const existingBrand = await prisma.brand.findFirst({ where: { name } });
        return existingBrand;
    }

    // Valida que No exista (para crear)
    static async brandDoesNotExist(name) {
        const existingBrand = await this.checkBrandExistence(name);
        if (existingBrand) {
            throw new Error(`Brand with name ${name} already exists`);
        }
    }

    // Valida que SI exista (para eliminar o actualizar)
    static async brandMustExist(name) {
        const existingBrand = await this.checkBrandExistence(name);
        if (!existingBrand) {
            throw new Error(`This brand does not exist: ${name}`);
        }
    }
    
}
