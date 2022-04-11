import axios from 'axios';
import { API_ENDPOINT } from 'src/contants';

export default function createNewProduct(newProduct: Record<string, any>) {
  return axios.post(`${API_ENDPOINT}/products/`, newProduct);
}
