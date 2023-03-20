export default function searchToList(list, input) {
  if (!input) return;

  const searchArr = [];
  list.querySelectorAll('li').forEach((item) => {
    if (!item.classList.contains('is-hidden')) searchArr.push(item);
  });

  input.addEventListener('keyup', () => {
    const regPhrase = new RegExp(input.value, 'i');
    let flag = false;

    for (let i = 0; i < searchArr.length; i += 1) {
      flag = regPhrase.test(searchArr[i].innerText);
      if (flag) searchArr[i].classList.remove('is-hidden');
      else searchArr[i].classList.add('is-hidden');
    }
  });
}
