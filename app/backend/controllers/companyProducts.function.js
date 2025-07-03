import prisma from '../db/client.js';

export async function addProductToCompany({ company_id, product_id }) {
  if (!company_id || !product_id) {
    throw new Error("Missing company_id or product_id");
  }

  const result = await prisma.companyProduct.create({
    data: {
      company: { connect: { id: company_id } },
      product: { connect: { id: product_id } }
    }
  });

  return result;
}

export async function removeProductFromCompany({ company_id, product_id }) {
  const deleted = await prisma.companyProduct.delete({
    where: {
      company_id_product_id: {
        company_id,
        product_id
      }
    }
  });
  return deleted;
}

export async function getCompanyProducts(company_id) {
  const companyProducts = await prisma.companyProduct.findMany({
    where: { company_id },
    include: {
      product: true
    }
  });

  return companyProducts.map(cp => cp.product);
}
