import User from '../models/User.js';
import bcrypt from 'bcryptjs';


export async function loginUser(dataUser) {
   
    const { email, password } = dataUser;
    // Find user by username
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }
    // Return user data without password
    const { password: _, ...userData } = user.toObject();
    return userData;
}

