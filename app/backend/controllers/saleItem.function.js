import prisma from '../db/client.js';

export async function addSaleItem({ sale_id, product_id, quantity, price }) {
    try {
        const saleItem = await prisma.sale_Items.create({
            data: {
                sale_id,
                product_id,
                quantity,
                price
            }
        });
        return saleItem;
    } catch (error) {
        throw new Error('Error adding sale item');
    }
}

export async function getSaleItems(sale_id) {
    try {
        const items = await prisma.sale_Items.findMany({
            where: { sale_id },
            include: { product: true }
        });
        return items;
    } catch (error) {
        throw new Error('Error fetching sale items');
    }
}

export async function deleteSaleItem({ sale_id, product_id }) {
    try {
        const deleted = await prisma.sale_Items.delete({
            where: {
                sale_id_product_id: { sale_id, product_id }
            }
        });
        return deleted;
    } catch (error) {
        throw new Error('Error deleting sale item');
    }
}
