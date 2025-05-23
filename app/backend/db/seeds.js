import prisma from './client.js' 
import bcrypt from 'bcryptjs';


async function main() {
  // Crear empresa
  // Buscar o crear empresa
  let company = await prisma.company.findFirst({ where: { rut: '76.123.456-7' } })
  if (!company) {
    company = await prisma.company.create({
      data: {
        name: 'Mi Empresa S.A.',
        rut: '76.123.456-7',
        address_street: 'Av. Principal 123',
        address_city: 'Santiago',
        address_state: 'RM',
        postal_code: 1230000,
      },
    })
  }

  // Buscar o crear tienda
  let store = await prisma.store.findFirst({ where: { name: 'Tienda Central', company_id: company.id } })
  if (!store) {
    store = await prisma.store.create({
      data: {
        name: 'Tienda Central',
        address_street: 'Calle Comercio 456',
        address_city: 'Santiago',
        address_state: 'RM',
        postal_code: 1230001,
        company: { connect: { id: company.id } },
      },
    })
  }

  // Buscar o crear usuarios
  let admin = await prisma.user.findFirst({ where: { email: 'admin@empresa.cl' } })
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        name: 'Administrador General',
        email: 'admin@empresa.cl',
        password: await bcrypt.hash('123456', 10),
        rut: '12.345.678-9',
        role: 'admin',
        company: { connect: { id: company.id } },
      },
    })
  }

  let seller = await prisma.user.findFirst({ where: { email: 'seller@empresa.cl' } })
  if (!seller) {
    seller = await prisma.user.create({
      data: {
        name: 'Vendedor Uno',
        email: 'seller@empresa.cl',
        password: await bcrypt.hash('123456', 10),
        rut: '11.111.111-1',
        role: 'seller',
        store: { connect: { id: store.id } },
      },
    })
  }

  // Buscar o crear categorías
  let catElectro = await prisma.category.findFirst({ where: { name: 'Electrodomésticos' } })
  if (!catElectro) {
    catElectro = await prisma.category.create({ data: { name: 'Electrodomésticos' } })
  }
  let catRopa = await prisma.category.findFirst({ where: { name: 'Ropa' } })
  if (!catRopa) {
    catRopa = await prisma.category.create({ data: { name: 'Ropa' } })
  }

  // Buscar o crear marcas
  let marcaX = await prisma.brand.findFirst({ where: { name: 'MarcaX' } })
  if (!marcaX) {
    marcaX = await prisma.brand.create({ data: { name: 'MarcaX' } })
  }
  let marcaY = await prisma.brand.findFirst({ where: { name: 'MarcaY' } })
  if (!marcaY) {
    marcaY = await prisma.brand.create({ data: { name: 'MarcaY' } })
  }

  // Buscar o crear colores
  let rojo = await prisma.color.findFirst({ where: { name: 'Rojo' } })
  if (!rojo) {
    rojo = await prisma.color.create({ data: { name: 'Rojo', code: '#FF0000' } })
  }
  let azul = await prisma.color.findFirst({ where: { name: 'Azul' } })
  if (!azul) {
    azul = await prisma.color.create({ data: { name: 'Azul', code: '#0000FF' } })
  }
  let negro = await prisma.color.findFirst({ where: { name: 'Negro' } })
  if (!negro) {
    negro = await prisma.color.create({ data: { name: 'Negro', code: '#000000' } })
  }

const [licuadora, polera, microondas] = await Promise.all([
  prisma.product.create({
    data: {
      name: 'Licuadora X100',
      description: 'Potente y silenciosa.',
      price: 59990,
      category: { connect: { id: catElectro.id } },
      brand: { connect: { id: marcaX.id } },
      colors: {
        create: [
          { color: { connect: { id: rojo.id } } }
        ]
      },
      storeProducts: {
        create: {
          store: { connect: { id: store.id } },
          quantity: 10
        }
      }
    }
  }),

  prisma.product.create({
    data: {
      name: 'Polera Azul',
      description: '100% algodón',
      price: 14990,
      category: { connect: { id: catRopa.id } },
      brand: { connect: { id: marcaY.id } },
      colors: {
        create: [
          { color: { connect: { id: azul.id } } }
        ]
      },
      storeProducts: {
        create: {
          store: { connect: { id: store.id } },
          quantity: 20
        }
      }
    }
  }),

  prisma.product.create({
    data: {
      name: 'Microondas 800W',
      description: 'Compacto y eficiente.',
      price: 89990,
      category: { connect: { id: catElectro.id } },
      brand: { connect: { id: marcaX.id } },
      colors: {
        create: [
          { color: { connect: { id: negro.id } } }
        ]
      },
      storeProducts: {
        create: {
          store: { connect: { id: store.id } },
          quantity: 5
        }
      }
    }
  })
]);

  // Venta simulada
  const sale = await prisma.sale.create({
    data: {
      number: 'SALE-001',
      total: 59990 + 14990,
      user: { connect: { id: seller.id } },
      store: { connect: { id: store.id } },
      saleItems: {
        create: [
          {
            product: { connect: { id: licuadora.id } },
            quantity: 1,
            price: 59990,
          },
          {
            product: { connect: { id: polera.id } },
            quantity: 1,
            price: 14990,
          },
        ],
      },
    },
  })

  console.log('✅ Seed completo con productos y una venta simulada.')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
