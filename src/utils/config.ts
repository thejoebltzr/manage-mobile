import axios, {AxiosInstance} from 'axios';

import {API_TOKEN} from './urls';
import {BASE_URL} from './urls';

const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Token token=${API_TOKEN}`,
  },
});

const SPLIT_CONFIG = {
  core: {
    authorizationKey: 'gllooipn7v5uakiv9nrjp6h2q00us65h55nf',
    key: 'USER_ID', // need to update this to identify the user
  },
};

export {HTTP_CLIENT, SPLIT_CONFIG};
