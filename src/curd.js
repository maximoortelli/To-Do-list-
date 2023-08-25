import trashimage from './assets/trash.png';
import threepoints from './assets/threepoints.png';

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
    if (myList[x].completed === false) {
      const groupDiv = document.createElement('div');
      groupDiv.classList.add('groupdiv');
      groupDiv.setAttribute('id', `id${x}`);
      const div = document.createElement('div');
      div.classList.add('div');
      const box = document.createElement('input');
      box.setAttribute('type', 'checkbox');
      box.setAttribute('id', `chk${x}`);

      const li = document.createElement('li');
      li.classList.add('li');
      li.setAttribute('id', `descp${x}`);

      li.textContent = myList[x].description;
      li.addEventListener('click', () => {
        // eslint-disable-next-line no-alert
        const descrip = prompt(`Enter a new description: ${x}`);

        if (descrip !== null && descrip !== '') {
          myList[x].description = descrip;

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
