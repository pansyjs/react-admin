import { parse, stringify } from 'qs';

//
//
export function urlToList(url: string): string[] {
  const urls = url.split('/').filter((i) => i);
  return urls.map(
    (urlItem, index) => `/${urls.slice(0, index + 1).join('/')}`
  );
}

export function parseQuery(data?: string) {
  const url = data || window.location.href.split('?')[1];
  return parse(url);
}

export function stringifyQuery() {}
