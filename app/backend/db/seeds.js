import {prisma} from './client.js'

async function main() {
    // Crear la compañía
    const company = await prisma.company.create({
      data: {
        company_name: 'NotVentas SPA',
        company_rut: '76.123.456-0',
        is_active: true,
        address_street: 'Av. Ejemplo 123',
        address_city: 'Santiago',
        address_state: 'RM',
        address_zip: '8320000'
      }
    });
  
    // Crear el rol de administrador
    const roles = await prisma.role.createMany({
      data: [
      { role_name: 'sadmin' },
      { role_name: 'admin' },
      { role_name: 'seller' }
      ]
    });

    const store = await prisma.store.create({
      data: {
      store_name: 'Tienda Ejemplo',
      coord_latitude: -33.4489,
      coord_longitude: -70.6693,
      address_street: 'Av. Ejemplo 456',
      address_city: 'Santiago',
      address_state: 'RM',
      address_zip: '8320000',
      is_active: true,
      company_id: company.company_id
      }
    });
   
  
    console.log('Compañía, rol y usuarios registrados correctamente');
  }
  
  main()
    .catch((e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });