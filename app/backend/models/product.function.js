import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export async function createProduct({product_name, description, category_id, color_id}) {
    
    Validation.color(color_id);
    Validation.category(category_id);

    try{
        const newProduct = await prisma.product.create({
            data: {
                product_name,
                description,
                category_id,
                color_id
            }
        });
        return newProduct;
    }catch(error){
        throw new Error('Error creating product');
    }
    
}

export async function updateProduct({product_id, product_name, description, category_id, color_id}) {
    Validation.product(product_id)
    Validation.category(category_id)
    Validation.color(color_id)

    try {
        const updatedProduct = await prisma.product.update({
            where: { product_id },
            data: {
                product_name: product_name || existingProduct.product_name,
                description: description || existingProduct.description,
                category_id: category_id || existingProduct.category_id,
                color_id: color_id || existingProduct.color_id
            }
        });
        return updatedProduct;
    } catch (error) {
        throw new Error('Error updating product');
    }
}


class Validation{
    static async color(color_id){
        const existingColor = await prisma.color.findUnique({ where: { color_id } });
        if (!existingColor) {
        throw new Error('Color not found');
        }
    }

    static async category(category_id){
        const existingCategory = await prisma.category.findUnique({ where: { category_id } });
        if (!existingCategory) {
            throw new Error('Category not found');
        }
    }
    static async product(product_id){
        const existingProducto = await prisma.product.findUnique({ where: { product_id } });
        if (!existingProducto) {
            throw new Error('Product not found');
        }
    }
}