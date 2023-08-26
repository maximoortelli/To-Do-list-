import './style.css';
import {
  myList,
  allmylist,
  inputFunction,
  retrieveLocalStorage,
} from './curd.js';

import { clear } from './status.js';

document.addEventListener('DOMContentLoaded', () => {
  inputFunction();

  const mystorage = retrieveLocalStorage();
  myList.push(...mystorage);

  const Button = document.querySelector('.clear');
  Button.addEventListener('click', (e) => {
    e.preventDefault();
    clear(myList);
  });
  allmylist();
});
