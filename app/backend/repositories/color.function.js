import {PrismaClient} from '../generated/prisma/index.js'

const prisma = new PrismaClient();

// función para crear color
export async function createColor({color_name, color_code}) {

    await Validation.colorDoesNotExist(color_code) //Valida que solo exista un color
    try{
        const newColor = await prisma.color.create({data: {color_name, color_code}});
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
    static async checkColorExistence(color_code) {
        const existingColor = await prisma.color.findFirst({ where: { color_code } });
        return existingColor;
    }

    // Valida que NO exista (para crear)
    static async colorDoesNotExist(color_code) {
        const existingColor = await this.checkColorExistence(color_code);
        if (existingColor) {
            throw new Error('This color already exists');
        }
    }

    // Valida que SI exista (para eliminar o editar)
    static async categoryMustExist(color_code) {
        const existingColor = await this.checkColorExistence(color_code);
        if (!existingColor) {
            throw new Error('This color does not exist');
        }
    }
}