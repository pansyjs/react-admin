//
//
export function urlToList(url: string): string[] {
  const urls = url.split('/').filter((i) => i);
  return urls.map(
    (urlItem, index) => `/${urls.slice(0, index + 1).join('/')}`
  );
}
