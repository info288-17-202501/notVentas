import prisma  from '../db/client.js';

// crea un producto
export async function createProduct({name, description, price, category_id, color_id}) {
    await Validation.color(color_id);
    await Validation.category(category_id);

    try{
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                category_id,
                price,
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
    const { id, name, description, category_id, color_id } = updateData;

    await Validation.product(id);

    if (category_id !== undefined) await Validation.category(category_id);
    if (color_id !== undefined) await Validation.color(color_id);

    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
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

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: {
          select: { name: true }
        },
        category: {
          select: { name: true }
        },
        colors: {
          include: {
            color: {
              select: {
                name: true,
                code: true
              }
            }
          }
        }
      }
    });

    return products.map(product => ({
      ...product,
      category: product.category?.name,
      colors: product.colors.map(pc => pc.color) // extrae solo el color de cada ProductColor
    }));
  } catch (error) {
    throw new Error('Error retrieving products from the database');
  }
}


// funcion para eliminar un producto
export async function deleteProduct({product_id}) {
    await Validation.product(product_id)
    try{
        const delProduct = await prisma.product.delete({
            where : {id : product_id}
        });       
        return delProduct;
    }catch(error){
        throw new Error('Error deleting the product')
    }
}

class Validation{
    static async color(color_id){
        const existingColor = await prisma.color.findUnique({ 
            where: { id: color_id }
        });
        if (!existingColor) {
        throw new Error('Color not found');
        }
    }

    static async category(category_id){
        const existingCategory = await prisma.category.findUnique({ where: { id: category_id } });
        if (!existingCategory) {
            throw new Error('Category not found');
        }
    }
    static async product(product_id){
        const existingProducto = await prisma.product.findUnique({ where: { id: product_id } });
        if (!existingProducto) {
            throw new Error('Product not found');
        }
    }
}