import prisma from "../db/client.js";

export async function createSale(data) {
    const { number, store_id, user_id, total } = data; 
   
    let date = new Date().toISOString(); // fecha actual en formato ISO 8601 (tipo datetime)
    try {
        const newSale = await prisma.sale.create({
            data: {
                number,
                date,
                total,
                user_id,
                store_id,
            }
        });
        return {newSale};
    } catch (error) {
        console.error('Error creating sale:', error);
        throw new Error('Error creating sale in the database');
    }
}

export async function getSales() {
    const sales = await prisma.sale.findMany();
    return sales;
}

export async function getSaleById(sale_id) {
    SaleValidation.validateSaleId(sale_id);

    const sale = await prisma.sale.findUnique({
        where: {id: sale_id }
    });
    return sale;
}

export async function updateSale(updateData) {
    const { sale_id, number, date, store_id, user_id, total } = updateData;

    SaleValidation.validateSaleId(sale_id);

    const updatedSale = await prisma.sale.update({
        where: { id: sale_id },
        data: {
            ...(number && { number }),
            ...(date && { date }),
            ...(store_id && { store_id }),
            ...(user_id && { user_id }),
            ...(total && { total })
        }
    });
    return updatedSale;
}

export async function deleteSale({ sale_id }) {
    SaleValidation.validateSaleId(sale_id);

    const deletedSale = await prisma.sale.delete({
        where: { id: sale_id }
    });
    return deletedSale;
}


class SaleValidation {
    static async validateSaleId(sale_id) {
        const sale = await prisma.sale.findUnique({
            where: { id: sale_id }
        });
        if (!sale) {
            throw new Error('Invalid sale ID');
        }
    }
}