import { API_ENDPOINT } from 'src/contants';

export async function fetchProducts() {
  const response = await fetch(`${API_ENDPOINT}/products/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
