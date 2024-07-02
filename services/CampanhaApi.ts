import axios from 'axios';
import config from './config';
import { SaleType, ProdutosType, ProdutoUpdateType } from '@/types/types';

export const CampanhaApiClient = axios.create({ baseURL: process.env.REACT_APP_CAMPANHA_API_URL});

export async function getAllVendas() {
    const endpoint = '/sales';
    const res = await CampanhaApiClient.get(endpoint);
    return res.data;
}

export async function postNewSale(newSale : SaleType) {
    const endpoint = '/sales';
    const res = await CampanhaApiClient.post(endpoint, newSale);
    return res.data;
}

export async function getAllProducts() {
    const endpoint = '/products';
    const res = await CampanhaApiClient.get(endpoint);
    console.log(res);
    return res.data;
}

export async function postNewProduct(newProduct : ProdutosType) {
    const endpoint = '/products';
    const res = await CampanhaApiClient.post(endpoint, newProduct);
    return res.data;
}

export async function updateProduct(updateProduct : ProdutoUpdateType) {
    const endpoint = '/products';
    const res = await CampanhaApiClient.put(endpoint, updateProduct);
    return res.data;
}

export async function deleteProduct(productName : String) {
    const endpoint = '/products';
    const res = await CampanhaApiClient.delete(endpoint, {
        data: {
          nome: productName
        }
    });
    return res.data;
}