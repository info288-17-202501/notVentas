const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();


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
    const role = await prisma.role.create({
      data: {
        role_name: 'admin'
      }
    });
  
    // Crear usuarios asociados a esa compañía y rol
    await prisma.user.createMany({
      data: [
        {
          name: 'Juan Pérez',
          email: 'juan.perez@example.com',
          password: '12345678',
          rut: '12.345.678-9',
          is_active: true,
          company_id: company.company_id,
          role_id: role.role_id
        },
        {
          name: 'María López',
          email: 'maria.lopez@example.com',
          password: 'abcdef12',
          rut: '98.765.432-1',
          is_active: true,
          company_id: company.company_id,
          role_id: role.role_id
        },
        {
          name: 'Carlos Sánchez',
          email: 'carlos.sanchez@example.com',
          password: 'pass1234',
          rut: '11.223.344-5',
          is_active: true,
          company_id: company.company_id,
          role_id: role.role_id
        }
      ]
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