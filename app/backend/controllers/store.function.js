import prisma from '../db/client.js';

export async function createStore({ store_name, coord_latitude, coord_longitude, address_street, address_city, address_state, address_zip, company_id}) {
    const newStore = await prisma.store.create({
        data: {
            store_name,
            coord_latitude,
            coord_longitude,
            address_street,
            address_city,
            address_state,
            address_zip,
            company_id
        }
    });
    return newStore;
}

export async function getStores() {
    const stores = await prisma.store.findMany();
    return stores;
}

export async function getStoreById(store_id) {
    StoreValidation.validateStoreId(store_id);

    const store = await prisma.store.findUnique({
        where: { store_id }
    });
    return store;
}

export async function updateStore(updateData) {
    const { store_id, store_name, coord_latitude, coord_longitude, address_street, address_city, address_state, address_zip } = updateData;

    if (!store_id) {
        throw new Error('Store ID is required to update store');
    }

    const updatedStore = await prisma.store.update({
        where: { store_id },
        data: {
            ...(store_name && { store_name }),
            ...(coord_latitude && { coord_latitude }),
            ...(coord_longitude && { coord_longitude }),
            ...(address_street && { address_street }),
            ...(address_city && { address_city }),
            ...(address_state && { address_state }),
            ...(address_zip && { address_zip })
        }
    });
    return updatedStore;
}

export async function deleteStore({ store_id }) {
    StoreValidation.validateStoreId(store_id);

    const deletedStore = await prisma.store.delete({
        where: { store_id }
    });
    return deletedStore;
}


// Validation class for store data
class StoreValidation {
    static validateStoreName(store_name) {
        if (!store_name || typeof store_name !== 'string') {
            throw new Error('Invalid store name');
        }
    }

    static validateStoreId(store_id) {
        if (!store_id || typeof store_id !== 'number') {
            throw new Error('Invalid store ID');
        }
    }

    static validateCoordinates(coord_latitude, coord_longitude) {
        if (typeof coord_latitude !== 'number' || typeof coord_longitude !== 'number') {
            throw new Error('Invalid coordinates');
        }
    }

    static validateAddress(address_street, address_city, address_state, address_zip) {
        if (!address_street || !address_city || !address_state || !address_zip) {
            throw new Error('Invalid address');
        }
    }
}

