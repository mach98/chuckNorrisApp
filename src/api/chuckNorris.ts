import axios from 'axios';
import {JOKES_URL} from '../constants/URLS';

export default axios.create({
  baseURL: JOKES_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
