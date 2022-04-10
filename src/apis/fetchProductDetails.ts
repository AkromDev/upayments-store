import { QueryKey } from 'react-query';
import { API_ENDPOINT } from 'src/contants';

export async function fetchProductDetails({ queryKey }: any) {
  const [_key, { id }] = queryKey;

  const response = await fetch(`${API_ENDPOINT}/products/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
