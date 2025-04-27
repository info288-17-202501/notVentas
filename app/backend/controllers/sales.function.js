import prisma from "../db/client.js";

export async function createSale(data) {
    const { sale_number, store_id, user_id, sale_total } = data; 
   
    let sale_date = new Date().toISOString(); // fecha actual en formato ISO 8601 (tipo datetime)
    try {
        const newSale = await prisma.sale.create({
            data: {
                sale_number,
                sale_date,
                sale_total,
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
        where: { sale_id }
    });
    return sale;
}

export async function updateSale(updateData) {
    const { sale_id, sale_number, sale_date, store_id, user_id, sale_total } = updateData;

    SaleValidation.validateSaleId(sale_id);

    const updatedSale = await prisma.sale.update({
        where: { sale_id },
        data: {
            ...(sale_number && { sale_number }),
            ...(sale_date && { sale_date }),
            ...(store_id && { store_id }),
            ...(user_id && { user_id }),
            ...(sale_total && { sale_total })
        }
    });
    return updatedSale;
}

export async function deleteSale({ sale_id }) {
    SaleValidation.validateSaleId(sale_id);

    const deletedSale = await prisma.sale.delete({
        where: { sale_id }
    });
    return deletedSale;
}


class SaleValidation {
    static validateSaleId(sale_id) {
        if (!sale_id) {
            throw new Error('Sale ID is required');
        }
    }
}