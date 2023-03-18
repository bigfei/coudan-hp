import React from 'react';

export interface CartItem {
  Id: string;
  Name: string;
  Price: number;
  PriceShow: string;
  PriceReal: number;
  Num: number;
  ImgSrc: string;
}

interface CartItemsProps {
  items: CartItem[];
}

function CartItems({ items }: CartItemsProps) {
  return (
    <ul className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <li key={item.Id} className="">
          <div className="">
            <img
              className="w-20 h-20 rounded-md object-contain"
              src={item.ImgSrc}
              alt={item.Name}
            />
            <p className="text-gray-900 font-medium">{item.Name}</p>
            <p className="text-gray-500">{item.PriceShow} {item.Num}个</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CartItems;
