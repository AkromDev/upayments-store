import { API_ENDPOINT } from 'src/contants';

export async function fetchCategories() {
  const response = await fetch(`${API_ENDPOINT}/categories/`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
