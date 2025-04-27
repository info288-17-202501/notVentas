import prisma from '../db/client.js';

export async function addProductToStore({ store_id, product_id, quantity }) {
    try {
        const storeProduct = await prisma.store_Products.create({
            data: {
                store_id,
                product_id,
                quantity
            }
        });
        return storeProduct;
    } catch (error) {
        throw new Error('Error adding product to store');
    }
}

export async function updateProductInStore({ store_id, product_id, quantity }) {
    try {
        const updatedStoreProduct = await prisma.store_Products.update({
            where: {
                store_id_product_id: { store_id, product_id }
            },
            data: {
                quantity
            }
        });
        return updatedStoreProduct;
    } catch (error) {
        throw new Error('Error updating product in store');
    }
}

export async function getStoreProducts(store_id) {
    try {
        const products = await prisma.store_Products.findMany({
            where: { store_id },
            include: { product: true }
        });
        return products;
    } catch (error) {
        throw new Error('Error fetching store products');
    }
}

export async function deleteStoreProduct({ store_id, product_id }) {
    try {
        const deleted = await prisma.store_Products.delete({
            where: {
                store_id_product_id: { store_id, product_id }
            }
        });
        return deleted;
    } catch (error) {
        throw new Error('Error deleting store product');
    }
}
