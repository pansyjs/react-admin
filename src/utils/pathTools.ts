export function urlToList(url: string) {
  const urlList = url.split('/').filter((i) => i);
  return urlList.map(
    (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`
  );
}
