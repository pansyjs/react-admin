import { parse } from 'querystring';

export const getPageQuery = () => {
  const { href } = window.location;
  const qsIndex = href.indexOf('?');
  const sharpIndex = href.indexOf('#');

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(href.split('?')[1]);
    }

    return parse(href.slice(qsIndex + 1, sharpIndex));
  }

  return {};
};
