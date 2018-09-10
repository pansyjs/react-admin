export function urlToLiat(url) {
  const urlList = url.split('/').filter((i) => i);
  return urlList.map(
    (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`
  );
}
