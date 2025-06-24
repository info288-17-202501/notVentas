import {generateUniqueCompanyId} from "../utils/generateCompanyId.js";
import Company from '../models/company.js';
import Store from '../models/store.js';
import { registerUser } from "./userController.js";

export async function registerCompany(data) {
    const {name, description, address, phone, admin} = data;
    if (!name || !admin.email) {
        throw new Error("Company name and admin user are required" );
    }
    
    const companyId = await generateUniqueCompanyId();
    if (!companyId) {
        throw new Error("Error generating unique company ID");
    }


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
        role: "admin", 
        company: newCompany._id, 
        store: null
    };
    const newUserRegister = await registerUser(userData);
    if (!newCompanyRegister || !newUserRegister) {
        throw new Error("Error creating company or user");
    }
    return {company: newCompany, admin: newUserRegister };
    
}

export async function listStoresByCompanyId(companyId) {
    
    if (!companyId) {
        throw new Error("Company ID is required");
    }

    const stores = await Store.findOne({ company: companyId })

    if (!stores) {
        throw new Error("Stores not founds for the given company ID");
    }

    return stores;   
}

export async function listCompanies() {
    const companies = await Company.find();
    return companies;
}