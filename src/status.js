export const updateStatus = (
  myList,
  savemyStorage,
  newData,
) => {
  myList[newData].completed = true;
  const updatedJSON = JSON.stringify(myList);

  localStorage.setItem('myList', updatedJSON);
};

export const clear = (myList) => {
  const filter = myList.filter((obj) => obj.completed === false);
  const myIx = filter.length;

  for (let i = 0; i < myIx; i += 1) {
    filter[i].index = i + 1;
  }

  localStorage.setItem('myList', JSON.stringify(filter));

  localStorage.setItem('myList', JSON.stringify(filter));

  window.location.reload();
};