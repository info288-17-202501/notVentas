import prisma from '../db/client.js';

export async function addSaleItems({ sale_id, items }) {
    
    console.log("Sale ID", sale_id);
    console.log("Items", items);
    if (!sale_id || !items) {
        throw new Error('Missing required fields for adding sale items');
    }
    const createdItems = [];
    for (const item of items) {
        const { product_id, quantity, price } = item;
        console.log("Item", item);

        if (!product_id || !quantity || !price) {
            throw new Error('Missing required fields for sale item');
        }

        const createdItem = await prisma.saleItem.create({
            data: {
                sale_id,
                product_id,
                quantity,
                price
            }
        });

        createdItems.push(createdItem);
    }
    if (createdItems.length === 0) {
        throw new Error('No sale items were created');
    }

    return createdItems;
    
}
export async function getSaleItems(sale_id) {
    const items = await prisma.saleItem.findMany({
        where: { sale_id },
        include: { product: true }
    });
    if (!items || items.length === 0) {
        throw new Error('No sale items found for this sale');
    }
    return items;
}

export async function deleteSaleItem({ sale_id, product_id }) {
    try {
        const deleted = await prisma.saleItem.delete({
            where: {
                sale_id: sale_id,
                product_id: product_id
            }
        });
        return deleted;
    } catch (error) {
        throw new Error('Error deleting sale item');
    }
}
