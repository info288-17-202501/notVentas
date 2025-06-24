import  Store  from '../models/store.js';
import Company from '../models/company.js';

export async function createStore(data) {
    const storeData = {
        name: data.name,
        host: data.host,
        port: data.port,
        company: data.company_id
    };

    // validate if the company exists
    const companyExists = await Company.findOne({ company_id: storeData.company });

    if (!companyExists) {
        throw new Error("Company does not exist");
    }

    const newStore = new Store(storeData);
    return await newStore.save(); // el esquema se encargará de validar si la company existe
}


// Function to list all stores
export async function listStores() {
    const stores = await Store.find();
    return stores;
}

// Function to activate a store
// Function to activate/deactivate a store
export async function updateStateStore(storeData) {
    const { storeId, is_active } = storeData;

    if (!storeId) {
        throw new Error("Store ID is required");
    }

    // Validate if storeId is a valid ObjectId
    if (!storeId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Invalid Store ID format");
    }

    if (is_active === undefined || is_active === null) {
        throw new Error("State is required");
    }


    const store = await Store.findById(storeId); 

    if (!store) {
        throw new Error("Store not found");
    }

    // Update the store's state
    store.is_active = is_active;
    const updatedStore = await store.save(); 

    return updatedStore;
}

// funtion to update store position
export async function updateStorePosition(storeData) {
    const { storeId, coord_latitude, coord_longitude } = storeData;


    if (!storeId) {
        throw new Error("Store ID is required");
    }

    // Validate if storeId is a valid ObjectId
    if (!storeId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Invalid Store ID format");
    }

    if (!coord_latitude || !coord_longitude) {
        throw new Error("Coordinates are required");
    }

    const store = await Store.findById(storeId); 

    if (!store) {
        throw new Error("Store not found");
    }

    // Update the store's coordinates
    store.coord_latitude = coord_latitude;
    store.coord_longitude = coord_longitude;
    // Save the updated store
    const updatedStore = await store.save(); 

    return updatedStore;
}