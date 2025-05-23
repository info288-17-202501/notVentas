import prisma  from '../db/client.js';

// función para crear color
export async function createColor({name, code}) {
    try{
        const existingColor = await Validation.checkColorExistence(code) //Valida que solo exista un color
        if (existingColor) return existingColor;
        const newColor = await prisma.color.create({data: {name, code}});
        return newColor;
    }catch(error){
        throw new Error('Error connecting to the database')
    }
}

// función para obtener colores
export async function getColor(){
    try{
        const colors = await prisma.color.findMany();
        return colors;
    }catch(error){
        throw new Error('Error connecting to the database')
    }
}

class Validation {
    static async checkColorExistence(code) {
        const existingColor = await prisma.color.findFirst({ where: { code } });
        return existingColor;
    }

    // Valida que NO exista (para crear)
    static async colorDoesNotExist(code) {
        const existingColor = await this.checkColorExistence(code);
        if (existingColor) {
            throw new Error('This color already exists');
        }
    }

    // Valida que SI exista (para eliminar o editar)
    static async categoryMustExist(code) {
        const existingColor = await this.checkColorExistence(code);
        if (!existingColor) {
            throw new Error('This color does not exist');
        }
    }
}