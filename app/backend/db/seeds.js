import prisma from './client.js'

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

 
    // Crea la tienda
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

    // registramos categorias
    const categories = await prisma.category.createMany({
      data: [
        {
          category_name: 'Electrónica',
        },
        {
          category_name: 'Ropa',
        }
      ]
    });
    // registrar colores
    const colors = await prisma.color.createMany({
      data: [
        {
          color_name: 'Rojo',
          color_code: '#FF0000'
        },
        {
          color_name: 'Azul',
          color_code: '#0000FF'
        },
        {
          color_name: 'Verde',
          color_code: '#00FF00'
        },
        {
          color_name: 'Amarillo',
          color_code: '#FFFF00'
        },
        {
          color_name: 'Negro',
          color_code: '#000000'
        }
      ]
    });

    // crear productos
    const products = await prisma.product.createMany({
      data: [
        {
          product_name: 'Smartphone X',
          description: 'Teléfono inteligente de última generación',
          is_active: true,
          category_id: 1, // Electrónica
          color_id: 1    // Rojo
        },
        {
          product_name: 'Polera Básica',
          description: 'Polera de algodón, talla M',
          is_active: true,
          category_id: 2, // Ropa
          color_id: 2    // Azul
        },
        {
          product_name: 'Audífonos Bluetooth',
          description: 'Audífonos inalámbricos con cancelación de ruido',
          is_active: true,
          category_id: 1, // Electrónica
          color_id: 5    // Negro
        },
        {
          product_name: 'Chaqueta Impermeable',
          description: 'Chaqueta resistente al agua, talla Ls',
          is_active: true,
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