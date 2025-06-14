import {generateUniqueCompanyId} from "../utils/generateCompanyId.js";
import Company from "../models/Company.js";
import { registerUser } from "./userController.js";

export async function registerCompany(data) {
    const {name, description, address, phone, admin} = data;
    if (!name || !admin.email) {
        throw new Error("Company name and admin user are required" );
    }

    try {
        const companyId = await generateUniqueCompanyId();

        // Create and save the new company in MongoDB
        const newCompany = new Company({
            company_id: companyId,
            name,
            description,
            address,
            phone,
            email: admin.email,
        });

        const newCompanyRegister = await newCompany.save();
        // Register the admin user for the company
        const userData = {
            name: admin.name,
            email: admin.email,
            password: admin.password, 
            phone: admin.phone,
            role: 'admin', 
            company: newCompany._id, 
            store: null
        };
        const newUserRegister = await registerUser(userData);
        return {company: newCompany, admin: newUserRegister };
    }catch (error) {
        console.error("Error registering company:", error);
        throw new Error(`Error registering company: ${error}` );
    }
}

export async function listStoresByCompanyId(companyId) {
    try {
        const company = await Company.findOne({ company_id: companyId }).populate('stores');
        if (!company) {
            throw new Error("Company not found");
        }
        return company.stores;
    } catch (error) {
        console.error("Error fetching stores by company ID:", error);
        throw new Error("Internal server error");
    }
}