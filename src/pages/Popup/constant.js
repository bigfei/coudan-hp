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
          const PriceReal = Number(PriceShow.replace(/[^0-9]/g, ''));
          items.push({ Id, Name, ImgSrc, Price, PriceReal, PriceShow, Num });
        } else {
          traverse(obj[key]);
        }
      });
    }
  }

  traverse(json);
  return items;
};

export const chooseItems = (items, limit, maxPrice) => {
  // loop the items for quantity > 1 and generate new products from 1..quantity
  const newItems = items.flatMap((e) =>
    e.a <= 1
      ? e
      : Array.from({ length: e.Num }, (_, i) => ({ Num: i + 1, ...e }))
  );

  // create an array with m columns for each row
  const states = Array.from({ length: newItems.length }, () => new Array(maxPrice).fill(false));

  // do dp based on state array
  states[0][0] = true
  states[0][newItems[0].PriceReal] = true

  for (let i = 1; i < newItems.length; ++i) {
    for (let j = 0; j <= maxPrice; ++j) {
      if (states[i - 1][j])
        states[i][j] = states[i - 1][j]
    }
    for (let j = 0; j <= maxPrice - newItems[i].PriceReal; ++j) {
      if (states[i - 1][j])
        states[i][j + newItems[i].PriceReal] = true
    }
  }

  let fPrice = limit
  for (fPrice = limit; fPrice <= maxPrice; ++fPrice) {
    if (states[newItems.length - 1][fPrice])
      break;
  }
  if (fPrice > maxPrice)
    return [];

  let res = []
  for (let i = newItems.length - 1; i >= 1; --i)//打印该买的商品
  {
    let pr = newItems[i].PriceReal
    if (fPrice - pr >= 0 && states[i - 1][fPrice - pr]) {
      res.push(newItems[i])
      fPrice = fPrice - pr;
    }//else 没有购买这个商品，j不变
  }
  if (fPrice != 0) {
    res.push(newItems[0])
  }
  return res;

};
