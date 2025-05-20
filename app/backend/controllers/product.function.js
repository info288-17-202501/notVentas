import prisma  from '../db/client.js';


// crea un producto
export async function createProduct({product_name, description, category_id, color_id}) {
    await Validation.color(color_id);
    await Validation.category(category_id);

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

// actualiza un producto 
export async function updateProduct(updateData) {
    const { product_id, product_name, description, category_id, color_id } = updateData;

    await Validation.product(product_id);

    if (category_id !== undefined) await Validation.category(category_id);
    if (color_id !== undefined) await Validation.color(color_id);

    try {
        const updatedProduct = await prisma.product.update({
            where: { product_id },
            data: {
                ...(product_name !== undefined && { product_name }),
                ...(description !== undefined && { description }),
                ...(category_id !== undefined && { category_id }),
                ...(color_id !== undefined && { color_id })
            }
        });
        return updatedProduct;
    } catch (error) {
        throw new Error('Error updating product');
    }
}

// funcion para obtener una lista de productos filtrados por texto (nombre, categoria, modelo)
export async function getProducts({ search = '' } = {}) {
    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        product_name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        category: {
                            category_name: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        model: {
                            model_name: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            include: {
                category: true,
                model: true
            }
        });
        return products;
    } catch (error) {
        throw new Error('Error connecting to the database');
    }
}

// funcion para eliminar un producto
export async function deleteProduct({product_id}) {
    await Validation.product(product_id)
    try{
        const delProduct = await prisma.product.delete({
            where : {product_id}
        });       
        return delProduct;
    }catch(error){
        throw new Error('Error deleting the product')
    }
}

class Validation{
    static async color(color_id){
        const existingColor = await prisma.color.findUnique({ 
            where: { color_id }
        });
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