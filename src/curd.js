import trashimage from './assets/trash.png';
import threepoints from './assets/threepoints.png';
import { updateStatus } from './status.js';

export const myList = [];

export const savemyStorage = () => {
  localStorage.setItem('myList', JSON.stringify(myList));
};

export const retrieveLocalStorage = () => {
  const mystorage = localStorage.getItem('myList');
  if (mystorage) {
    return JSON.parse(mystorage);
  }
  return [];
};

export const deleteConfig = (myOptions, groupDiv, x) => {
  myOptions.addEventListener('click', () => {
    myOptions.style.display = 'none';
    const trash = document.createElement('img');
    trash.src = trashimage;
    trash.classList.add('trash');

    groupDiv.appendChild(trash);

    trash.addEventListener('click', () => {
      document.getElementById(`id${x}`).remove();
      trash.style.display = 'none';
      myList.splice(x, 1);

      for (let y = 0; y < myList.length; y += 1) {
        myList[y].index = y + 1;
      }

      savemyStorage();
    });
  });
};

export const allmylist = () => {
  const father = document.getElementById('allitems');
  father.innerHTML = '';
  const ul = document.createElement('ul');
  ul.classList.add('ul');

  for (let x = 0; x < myList.length; x += 1) {
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('groupdiv');
    groupDiv.setAttribute('id', `id${x}`);
    const div = document.createElement('div');
    div.classList.add('div');
    const box = document.createElement('input');
    box.classList.add('box');
    box.setAttribute('type', 'checkbox');
    box.setAttribute('data-index', x);
    box.setAttribute('id', `chk${x}`);
    box.addEventListener('change', (event) => {
      const newData = event.target.getAttribute('data-index');
      updateStatus(myList, savemyStorage, newData);
    });

    const li = document.createElement('li');
    li.classList.add('li');
    li.setAttribute('id', `descp${x}`);
    li.setAttribute('contentEditable', 'true');

    li.textContent = myList[x].description;
    li.addEventListener('input', () => {
      const newDescription = li.textContent.trim();

      if (newDescription !== '') {
        myList[x].description = newDescription;

        allmylist();

        savemyStorage();
      }
    });

    const config = document.createElement('img');
    config.classList.add('threepoints');
    config.src = threepoints;
    deleteConfig(config, groupDiv, x);

    div.appendChild(box);
    div.appendChild(li);
    groupDiv.appendChild(div);
    groupDiv.appendChild(config);
    ul.appendChild(groupDiv);
  }
  father.appendChild(ul);
};

export const inputFunction = () => {
  const input = document.getElementById('input');

  const storedValue = localStorage.getItem('inputValue');
  if (storedValue) {
    input.value = storedValue;
  }

  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const theIt = {
        description: input.value,
        completed: false,
        index: myList.length + 1,
      };

      myList.push(theIt);

      savemyStorage();
      allmylist();
      input.value = '';
    }
  });
};
