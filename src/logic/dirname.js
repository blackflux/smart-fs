import { dirname } from 'path';
import filename from './filename.js';

 export default (url) => dirname(filename(url));
