// app/front/src/api/store.js

export async function getStores(companyId) {
  return fetch(`/api/store?companyId=${companyId}`);
}

export async function createStore(payload) {
  return fetch('/api/store', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
