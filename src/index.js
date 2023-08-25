import './style.css';

import {
  myList,
  allmylist,
  inputFunction,
  retrieveLocalStorage,
} from './curd.js';

document.addEventListener('DOMContentLoaded', () => {
  const storedTodoList = retrieveLocalStorage();
  myList.push(...storedTodoList);

  inputFunction();
});
document.addEventListener('DOMContentLoaded', allmylist);