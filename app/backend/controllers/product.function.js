import prisma  from '../db/client.js';

import { createColor } from './color.function.js'; // Importa la función createColor
import { createCategory } from './category.function.js'; // Importa la función createCategory
import { createBrand } from './brand.function.js'; // Importa la función createBrand
import { addProductToCompany } from './companyProducts.function.js';


export async function createProduct({
    name,
    description,
    price,
    category,
    brand,
    colors, // lista de colores [{ name, code }, ...]
    company_id,
    }) {
    
    const valCategory = await Validation.category(category.name);
    const valBrand = await Validation.brand(brand.name);
    


    // 1. Crear/reutilizar todos los colores
    const colorRecords = await Promise.all(
      colors.map(color => createColor({ name: color.name, code: color.code }))
    );

    // 2. Construir la relación intermedia para la creación
    const colorConnections = colorRecords.map(color => ({
      color: {
        connect: { id: color.id }
      }
    }));

    // 3. Crear el producto con las relaciones a múltiples colores

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category: { connect: { id: valCategory.id } },
        brand: { connect: { id: valBrand.id } },
        colors: {
          create: colorConnections
        }
      },
      include: {
        colors: { include: { color: true } }
      }
    });

    if (!newProduct) {
      throw new Error('Error creating product');
    }
    const productToCompany = await addProductToCompany( {
      company_id,
      product_id: newProduct.id});

    return newProduct;
}


export async function updateProduct(updateData) {
  const {
    id,
    name,
    description,
    price,
    category_id,
    brand_id,
    colors // array opcional: [{ name, code }]
  } = updateData;

  // Validación del producto existente
  await Validation.product(id);
  if (category_id !== undefined) await Validation.category(category_id);
  if (brand_id !== undefined) await Validation.brand(brand_id);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(category_id !== undefined && {
          category: { connect: { id: category_id } }
        }),
        ...(brand_id !== undefined && {
          brand: { connect: { id: brand_id } }
        })
      }
    });

    // Si se actualizan los colores, reemplazarlos
    if (colors && colors.length > 0) {
      // Crear o reutilizar colores
      const colorRecords = await Promise.all(
        colors.map(color => createColor({ name: color.name, code: color.code }))
      );

      // Eliminar asociaciones existentes con colores
      await prisma.productColor.deleteMany({
        where: { product_id: id }
      });

      // Crear nuevas asociaciones
      await Promise.all(
        colorRecords.map(color =>
          prisma.productColor.create({
            data: {
              product: { connect: { id } },
              color: { connect: { id: color.id } }
            }
          })
        )
      );
    }

    if (!updatedProduct) {
      throw new Error('Error updating product');
    }
  
    // Retornar el producto actualizado con los colores asociados
    return await prisma.product.findUnique({
      where: { id },
      include: {
        colors: { include: { color: true } }
      }
    });
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

export async function getProductsByCompany(company_id) {
    if (!company_id) {
        throw new Error("Company ID is required");
    }
    const products = await prisma.companyProduct.findMany({
        where: { company_id },
        include: {
            product: {
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
            }
        }
    });
    if (!products) {
        throw new Error('Error retrieving products for the company');
    }

    return products.map(cp => ({
        ...cp.product,
        category: cp.product.category?.name,
        colors: cp.product.colors.map(pc => pc.color) // extrae solo el color de cada ProductColor
    }));
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


    static async brand(name){
        const existingBrand = await prisma.brand.findUnique({ where: { name } });
        if (!existingBrand) {
            throw new Error('Brand not found');
        }
        return existingBrand;
    }

    static async color(color_id){
        const existingColor = await prisma.color.findUnique({ 
            where: { id: color_id }
        });
        if (!existingColor) {
        throw new Error('Color not found');
        }
        return existingColor;
    }

    static async category(name){
        const existingCategory = await prisma.category.findUnique({ where: { name } });
        if (!existingCategory) {
            throw new Error('Category not found');
        }
        return existingCategory;
    }
    static async product(name){
        const existingProducto = await prisma.product.findUnique({ where: { name } });
        if (!existingProducto) {
            throw new Error('Product not found');
        }
        return existingProducto;
    }
}