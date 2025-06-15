import {generateHashPass} from "../utils/generateHashPass.js";
import User from "../models/User.js";

export async function registerUser(data) {
    const { name, email, password, phone, role, company, store} = data;
    // Validate required fields
    if (!name || !email || !password || !role) {
        throw new Error("Name, email, password, role, and company are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Hash the password
    const hashedPassword = await generateHashPass(password);

    // Create the new user object
    const newUser = {
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        company,
        store
    };

    // Save the new user to the database (assuming you have a User model)
    const savedUser = await User.create(newUser);

    if (!savedUser) {
        throw new Error("Error creating user");
    }
    
    return savedUser;   

}