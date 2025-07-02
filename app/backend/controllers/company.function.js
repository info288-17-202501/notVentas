import prisma  from '../db/client.js';

// get companies
export async function getCompanies() {
        const companies = await prisma.company.findMany({
            orderBy: { id: 'asc' },
       });
    if (!companies || companies.length === 0) {
        throw new Error('No companies found');
    }
    return companies;
    
}

// Create a new company
export async function createCompany(data) {

    const validation = await Validation.companyExists(data.rut);
    if (validation) {
        throw new Error('A company with this RUT already exists');
    }   
    
    console.log('Creating company with data:', data);

    const newCompany = await prisma.company.create({
        data: {
            name: data.name,
            rut: data.rut,
            is_active: data.is_active ?? true,
            address_street: data.address_street,
            address_city: data.address_city,
            address_state: data.address_state,
            postal_code: data.postal_code,
        },
    });

    if (!newCompany) {
        throw new Error('Error creating company');
    }

    return newCompany;
    
}

// Get a company by ID
export async function getCompanyById(companyId) {

    const company = await prisma.company.findUnique({
        where: { id: companyId },
    });
    if (!company) {
        throw new Error(`Company with ID ${companyId} not found`);
    }
    return company;
    
}

// Update a company by ID
export async function updateCompany(companyId, data) {

    if (!companyId) {
        throw new Error('Company ID is required to update company');
    }

    const updatedCompany = await prisma.company.update({
        where: { id: companyId },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.rut && { rut: data.rut }),
            ...(data.is_active !== undefined && { is_active: data.is_active }),
            ...(data.address_street && { address_street: data.address_street }),
            ...(data.address_city && { address_city: data.address_city }),
            ...(data.address_state && { address_state: data.address_state }),
            ...(data.postal_code && { postal_code: data.postal_code }),
        },
    });
    if (!updatedCompany) {
        throw new Error(`Error updating company with ID ${companyId}`);
    }
    return updatedCompany;
    
}

// Delete a company by ID
export async function deleteCompany({rut}) {
    await Validation.companyExists(rut);
    
    const deletedCompany = await prisma.company.delete({
        where: { rut },
    });
    if (!deletedCompany) {
        throw new Error(`Error deleting company with RUT ${rut}`);
    }
    return deletedCompany;

}

class Validation {
    static async companyExists(rut) {
        const company = await prisma.company.findUnique({
                where: {rut}
        });            
        return company;
    }
}