import axios from 'axios';
import config from './config';

export const CampanhaApiClient = axios.create({ baseURL: config.campanhaApi });
