import prisma from '../db/client.js';

export async function addProductToStore({ store_id, product_id, colors }) {

    if (!Array.isArray(colors) || colors.length === 0) {
      throw new Error("You must provide a colors array");
    }

    const results = [];    

    for (const { color_id, quantity } of colors) {
      
      const existingProduct = await prisma.storeProduct.findUnique({
        where: {
          store_id_product_id_color_id: {
            store_id,
            product_id,
            color_id
          }
        }
      });

      if (existingProduct) {
        throw new Error(`Product with color ${color_id} already exists in store`);
      }

      const storeProduct = await prisma.storeProduct.create({
        data: {
          store: { connect: { id: store_id } },
          product: { connect: { id: product_id } },
          color: { connect: { id: color_id } },
          quantity
        }
      });

      results.push(storeProduct);
    }
    if (results.length === 0) {
      throw new Error('No products were added to the store');
    }
    return results;
}



export async function updateProductInStore({ store_id, product_id, colors }) {
    
        if (!Array.isArray(colors) || colors.length === 0) {
            throw new Error("You must provide a colors array");
        }
        const results = [];
        for (const { color_id, quantity } of colors) {
            const updatedStoreProduct = await prisma.storeProduct.update({
                where: {
                    store_id_product_id_color_id: { store_id, product_id, color_id }
                },
                data: {
                    quantity
                }
            });
            results.push(updatedStoreProduct);
        }
        if (results.length === 0) {
            throw new Error('No products were updated in the store');
        }
        return results;
   
}

export async function getStoreProducts(store_id) {
        const products = await prisma.storeProduct.findMany({
            where: { store_id },
            include: {
                product: true,
                color: true
            }
        });

        const grouped = {};

        for (const item of products) {
            const key = item.product_id;

            if (!grouped[key]) {
                grouped[key] = {
                    product: item.product,
                    total_quantity: 0,
                    colors: []
                };
            }

            grouped[key].total_quantity += item.quantity;

            grouped[key].colors.push({
                id: item.color.id,
                name: item.color.name,
                code: item.color.code,
                quantity: item.quantity
            });
        }
        if (Object.keys(grouped).length === 0) {
            throw new Error('No products found for this store');
        }
        return Object.values(grouped);
  
}


export async function deleteStoreProduct({ store_id, product_id }) {

    const deleted = await prisma.storeProduct.deleteMany({
      where: { store_id, product_id }
    });
    if (deleted.count === 0) {
      throw new Error('No products were deleted from the store');
    }
    return deleted;
}
