import prisma  from '../db/client.js';

// Create a new company
export async function createCompany(data) {
    try {
        const newCompany = await prisma.company.create({
            data: {
                company_name: data.company_name,
                company_rut: data.company_rut,
                is_active: data.is_active ?? true,
                address_street: data.address_street,
                address_city: data.address_city,
                address_state: data.address_state,
                address_zip: data.address_zip,
            },
        });
        return newCompany;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
}

// Get a company by ID
export async function getCompanyById(companyId) {
    try {
        const company = await prisma.company.findUnique({
            where: { company_id: companyId },
        });
        return company;
    } catch (error) {
        console.error('Error fetching company:', error);
        throw error;
    }
}

// Update a company by ID
export async function updateCompany(companyId, data) {
    try {
        const updatedCompany = await prisma.company.update({
            where: { company_id: companyId },
            data: {
                ...(data.company_name && { company_name: data.company_name }),
                ...(data.company_rut && { company_rut: data.company_rut }),
                ...(data.is_active !== undefined && { is_active: data.is_active }),
                ...(data.address_street && { address_street: data.address_street }),
                ...(data.address_city && { address_city: data.address_city }),
                ...(data.address_state && { address_state: data.address_state }),
                ...(data.address_zip && { address_zip: data.address_zip }),
            },
        });
        return updatedCompany;
    } catch (error) {
        console.error('Error updating company:', error);
        throw error;
    }
}

// Delete a company by ID
export async function deleteCompany({company_id}) {
    await Validation.companyExists(company_id);
    try {
        const deletedCompany = await prisma.company.delete({
            where: { company_id },
        });
        return deletedCompany;
    } catch (error) {
        console.error('Error deleting company:', error);
        throw new Error('Error in database connection');
    }
}

class Validation {
    static async companyExists(company_id) {
        const company = await prisma.company.findUnique({
                where: {company_id}
        });
        if(!company){
            throw new Error(`Company with ID ${company_id} does not exist`);
        }
    }
}