import axios from 'axios';
import config from './config';

export const CampanhaApiClient = axios.create({ baseURL: config.campanhaApi });

export async function getAllVendas() {
    const endpoint = '/api/v1/vendas';
    const res = await CampanhaApiClient.get(endpoint);
    return res.data;
}
