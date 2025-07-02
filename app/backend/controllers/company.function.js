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
    try {
        const company = await prisma.company.findUnique({
            where: { id: companyId },
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
        return updatedCompany;
    } catch (error) {
        console.error('Error updating company:', error);
        throw error;
    }
}

// Delete a company by ID
export async function deleteCompany({rut}) {
    await Validation.companyExists(rut);
    try {
        const deletedCompany = await prisma.company.delete({
            where: { rut },
        });
        return deletedCompany;
    } catch (error) {
        throw new Error('Error in database connection');
    }
}

class Validation {
    static async companyExists(rut) {
        const company = await prisma.company.findUnique({
                where: {rut}
        });            
        return company;
    }
}