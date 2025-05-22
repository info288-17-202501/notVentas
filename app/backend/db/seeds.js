import prisma from './client.js'

async function main() {

    // Crear la compañía
    const company = await prisma.company.create({
      data: {
        name: 'NotVentas SPA',
        rut: '76.123.456-0',
        is_active: true,
        address_street: 'Av. Ejemplo 123',
        address_city: 'Santiago',
        address_state: 'RM',
        postal_code: 8320000
      }
    });

 
    // Crea la tienda
    const store = await prisma.store.create({
      data: {
      name: 'Tienda Ejemplo',
      coord_latitude: -33.4489,
      coord_longitude: -70.6693,
      address_street: 'Av. Ejemplo 456',
      address_city: 'Santiago',
      address_state: 'RM',
      postal_code: 8320000,
      is_active: true,
      company_id: company.id
      }
    });

    // registramos categorias
    const categories = await prisma.category.createMany({
      data: [
        {
          name: 'Electrónica',
        },
        {
          name: 'Ropa',
        }
      ]
    });
    // registrar colores
    const colors = await prisma.color.createMany({
      data: [
        {
          name: 'Rojo',
          code: '#FF0000'
        },
        {
          name: 'Azul',
          code: '#0000FF'
        },
        {
          name: 'Verde',
          code: '#00FF00'
        },
        {
          name: 'Amarillo',
          code: '#FFFF00'
        },
        {
          name: 'Negro',
          code: '#000000'
        }
      ]
    });

    // crear productos
    const products = await prisma.product.createMany({
      data: [
        {
          name: 'Smartphone X',
          description: 'Teléfono inteligente de última generación',
          is_active: true,
          price: 100000,
          category_id: 1, // Electrónica
          color_id: 1    // Rojo
        },
        {
          name: 'Polera Básica',
          description: 'Polera de algodón, talla M',
          is_active: true,
          price: 10000,
          category_id: 2, // Ropa
          color_id: 2    // Azul
        },
        {
          name: 'Audífonos Bluetooth',
          description: 'Audífonos inalámbricos con cancelación de ruido',
          price: 35000,
          is_active: true,
          category_id: 1, // Electrónica
          color_id: 5    // Negro
        },
        {
          name: 'Chaqueta Impermeable',
          description: 'Chaqueta resistente al agua, talla Ls',
          is_active: true,
          price: 65000,
          category_id: 2, // Ropa
          color_id: 3    // Verde
        }
      ]
    });

    
  
    console.log('Compañía y tienda registrados correctamente');

  }
  
  main()
    .catch((e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });