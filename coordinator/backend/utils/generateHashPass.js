import { hash } from 'bcryptjs';
/**
 * Genera el hash de una contraseña.
 * @param {string} password - La contraseña a hashear.
 * @returns {Promise<string>} - El hash generado.
 */

export async function generateHashPass(password) {
    const saltRounds = 10;
    return await hash(password, saltRounds);
}


export async function compareHashPass(password) {
    const { compare } = await import('bcryptjs');
    return await compare(password, hash);
}