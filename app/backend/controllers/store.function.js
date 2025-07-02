import prisma from '../db/client.js';

export async function createStore({ name, coord_latitude, coord_longitude, address_street, address_city, address_state, postal_code, company_id}) {
    const newStore = await prisma.store.create({
        data: {
            name,
            coord_latitude,
            coord_longitude,
            address_street,
            address_city,
            address_state,
            postal_code,
            company_id
        }
    });
    if (!newStore) throw new Error('Error creating store');
    
    return newStore;
}

export async function getStores() {
    const stores = await prisma.store.findMany();
    return stores;
}

export async function getStoreById(id) {
    StoreValidation.validateStoreId(id);

    const store = await prisma.store.findUnique({
        where: { id }
    });
    return store;
}

export async function updateStore(updateData) {
    const { id, name, coord_latitude, coord_longitude, address_street, address_city, address_state, postal_code } = updateData;

    if (!id) {
        throw new Error('Store ID is required to update store');
    }

    const updatedStore = await prisma.store.update({
        where: { id },
        data: {
            ...(name && { name }),
            ...(coord_latitude && { coord_latitude }),
            ...(coord_longitude && { coord_longitude }),
            ...(address_street && { address_street }),
            ...(address_city && { address_city }),
            ...(address_state && { address_state }),
            ...(postal_code && { postal_code })
        }
    });
    return updatedStore;
}

export async function deleteStore({ id }) {
    StoreValidation.validateStoreId(id);

    const deletedStore = await prisma.store.delete({
        where: { id }
    });
    return deletedStore;
}


// Validation class for store data
class StoreValidation {
    static validateStoreName(name) {
        if (!name || typeof name !== 'string') {
            throw new Error('Invalid store name');
        }
    }

    static validateStoreId(id) {
        if (!id || typeof id !== 'number') {
            throw new Error('Invalid store ID');
        }
    }

    static validateCoordinates(coord_latitude, coord_longitude) {
        if (typeof coord_latitude !== 'number' || typeof coord_longitude !== 'number') {
            throw new Error('Invalid coordinates');
        }
    }

    static validateAddress(address_street, address_city, address_state, postal_code) {
        if (!address_street || !address_city || !address_state || !postal_code) {
            throw new Error('Invalid address');
        }
    }
}

