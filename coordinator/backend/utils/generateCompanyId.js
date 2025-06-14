import Company from '../models/Company.js';

function generateIdBase() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 6);
  return `cmp-${timestamp}-${randomStr}`;
}

export async function generateUniqueCompanyId() {
  let id;
  let existe = true;

  while (existe) {
    id = generateIdBase();
    const empresa = await Company.findOne({ company_id: id });
    if (!empresa) existe = false;
  }

  return id;
}
