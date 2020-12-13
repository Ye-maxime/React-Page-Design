/* eslint-disable import/prefer-default-export */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */

// eslint-disable-next-line import/no-unresolved
import { CoreOptions } from 'request';

/**
 * 生成uuid方法
 * @returns {string}
 */
export const createUUID = (): string => {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const createRequestOptions = (
  method = 'GET',
  payload = '',
  needAuthorization = false,
) => {
  const headers: Headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (needAuthorization) {
    headers.append('Authorization', `Bearer ${localStorage.token}`);
  }

  const options: CoreOptions = {
    method,
    headers,
  };

  if (method === 'POST') {
    options.body = JSON.stringify(payload);
  }

  return options;
};
