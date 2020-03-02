import { extend } from 'umi-request';
import { requestOptions } from '@/config/request';

const request = extend(requestOptions);

export default request;
