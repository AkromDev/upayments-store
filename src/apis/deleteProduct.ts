import axios from 'axios';
import { API_ENDPOINT } from 'src/contants';

export default function deleteProduct(id: string) {
  return axios.delete(`${API_ENDPOINT}/products/${id}`);
}
