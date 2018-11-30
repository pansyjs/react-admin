import { parse, stringify } from 'qs';

export function parseQuery(data?: string) {
  const url = data || window.location.href.split('?')[1];
  return parse(url);
}

export function stringifyQuery() {}
