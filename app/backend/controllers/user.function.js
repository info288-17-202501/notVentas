import bcrypt from 'bcryptjs';
import prisma  from '../db/client.js';

export async function createUser( { email, password, name, rut, company_id, role_id }){
    Validation.email(email);
    Validation.password(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
       data: { email, password: hashedPassword, rut, name, role_id, company_id }
    });
    return newUser;
} 

export async function getUsers() {
    const users = await prisma.user.findMany();
    return users.map(({ password, ...user }) => user); // quitar contraseña de usuarios
    //falta quitar de la lista los usuarios que fueron "borrados"
}


export async function login({ email, password }) {
    Validation.email(email);
    Validation.password(password);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    if(!user.is_active){
        throw new Error('User not found')
    }
    const { password: _, ...publicUser } = user; // no devuelve la contraseña
    return publicUser;
}

export async function updateUser({ email, username, password, role_id }) {
    if (!email) {
        throw new Error('Email is required to update user');
    }

    const updateData = {};

    if (username) {
        updateData.name = username;
    }

    if (password) {
        Validation.password(password);
        updateData.password = await bcrypt.hash(password, 10);
    }

    if (role_id) {
        updateData.role_id = role_id;
    }

    const updatedUser = await prisma.user.update({
        where: { email },
        data: updateData
    });

    const { password: _, ...publicUser } = updatedUser;
    return publicUser;
}

export async function deleteUser({ email, password }) {
    try {
        const user = await login({ email, password });
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { is_active: false }
        });
        return updatedUser;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}

class Validation{
    static email(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof email !== 'string' || !emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
    }

    static password(password){
        if(typeof password !== 'string') throw new Error('password must be a string');
        if(password.length < 6) throw new Error('password must be at least 6 characters long');
    }
}
