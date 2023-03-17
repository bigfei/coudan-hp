import React, { useState, useEffect } from 'react';
import icon from '../../assets/img/icon-128.png';
import './Greetings.scss';

interface Props {
  name: string;
}

const GreetingComponent: React.FC<Props> = ({ name }) => {
  const [userName, setUserName] = useState<string>(name);
  const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);

  useEffect(() => {
    chrome.cookies.getAll({ domain: '.jd.com' }, (cookies) => {
      setCookies(cookies);
    });
  }, []);

  return (
    <div>
      <p>Hello, {userName}!</p>
      <ul>
        {cookies.map((cookie, index) => (
          <li key={index}>
            <strong>Name:</strong> {cookie.name} <br />
            <strong>Value:</strong> {cookie.value} <br />
            <strong>Domain:</strong> {cookie.domain} <br />
            <strong>Path:</strong> {cookie.path} <br />
            <strong>Secure:</strong> {cookie.secure ? 'Yes' : 'No'} <br />
            <strong>HttpOnly:</strong> {cookie.httpOnly ? 'Yes' : 'No'} <br />
            <strong>Expiration Date:</strong> {cookie.expirationDate ? new Date(cookie.expirationDate * 1000).toUTCString() : 'None'} <br />
          </li>
        ))}
      </ul>
      <img src={icon} alt="extension icon" />
    </div>
  );
};

export default GreetingComponent;