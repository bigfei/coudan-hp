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
  groupItems: CartItem[][];
}

function getRandomColor() {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-gray-500',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function CartItems({ items, groupItems }: CartItemsProps) {
  return (
    <>
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
              <p className="text-gray-500">
                {item.PriceShow} {item.Num}个
              </p>
            </div>
          </li>
        ))}
      </ul>

      <h2>分组方案</h2>
      <div className="">
        {groupItems.map((row, rowIndex) => (
          <div key={rowIndex}>
            <ul className={`grid grid-cols-4 gap-4 ${getRandomColor()}`}>
              {row.map((item) => (
                <li key={item.Id} className="">
                  <div className="">
                    <img
                      className="w-20 h-20 rounded-md object-contain"
                      src={item.ImgSrc}
                      alt={item.Name}
                    />
                    <p className="text-gray-900 font-medium">{item.Name}</p>
                    <p className="text-gray-500">
                      {item.PriceShow} {item.Num}个
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default CartItems;
