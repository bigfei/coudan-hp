import React, { useState, useEffect } from 'react';
import './Popup.scss';
// import CartItems, { CartItem } from '../../containers/Cart/CartItems'
import Cart, { CartItem } from '../../containers/Cart/Cart';
import { filterItems } from './constant';

const Popup = () => {
  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(300);

  useEffect(() => {
    chrome.cookies.getAll({ domain: '.jd.com' }).then((cookies) => {
      setCookies(
        cookies.filter(
          (c) =>
            c.name.startsWith('ipLoc') ||
            c.name.startsWith('user-key') ||
            c.value.startsWith('jdd')
        )
      );
    });
  }, []);

  useEffect(() => {
    if (cookies.length > 0) {
      const fetchCartData = async () => {
        setIsLoading(true);

        const url = 'https://api.m.jd.com/api';
        const body = {
          serInfo: {
            area: '2_2830_61101_0',
            'user-key': cookies.find((c) => c.name.startsWith('user-key'))
              ?.value!,
          },
          cartExt: { specialId: 1 },
        };
        const queryParams = {
          functionId: 'pcCart_jc_getCurrentCart',
          appid: 'JDC_mall_cart',
          loginType: '3',
          'x-api-eid-token': cookies.find((c) => c.value.startsWith('jdd'))
            ?.value!,
          body: JSON.stringify(body),
        };
        console.log(queryParams);
        const params = new URLSearchParams(queryParams);

        const opts: RequestInit = {
          method: 'POST',
          headers: {
            accept: 'application/json, text/plain, */*',
          },
          referrer: 'https://cart.jd.com/',
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          mode: 'cors',
          credentials: 'include',
        };
        const res = await fetch(url + '?' + params.toString(), opts);
        const data = await res.json();
        return data;
      };
      fetchCartData().then((cartData) => {
        setCartItems(filterItems(cartData));
        setIsLoading(false);
      });
    }
  }, [cookies]);

    const handleLimitChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setLimit(Number(event.target.value));
    };
  
  return (
    <div className="">
      <input className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id="limit"
        name="limit"
        value={limit}
        onChange={handleLimitChange}/>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">计算</button>
      {isLoading ? <p>Loading...</p> : <Cart items={cartItems} />}
    </div>
  );
};

export default Popup;
