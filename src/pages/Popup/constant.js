export const filterItems = (json) => {
  const items = [];

  function traverse(obj) {
    if (obj !== null && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        if (
          key === 'item' &&
          obj[key] &&
          typeof obj[key] === 'object' &&
          obj[key].ImgUrl
        ) {
          const { Id, Name, ImgUrl, Price, PriceShow, Num } = obj[key];
          const ImgSrc = `${'https://img'.concat(
            [10, 11, 12, 13, 14, 20, 30][Id % 7].toString(),
            '.360buyimg.com'
          )}/n0/s80x80_${ImgUrl}`;
          items.push({ Id, Name, ImgSrc, Price, PriceShow, Num });
        } else {
          traverse(obj[key]);
        }
      });
    }
  }

  traverse(json);
  return items;
};
