const transactionItems = document.querySelectorAll(`.transactions-list__item`);
const transactionAdd = document.querySelector(`.transaction-add`);
const transactionAddButton = document.querySelector(`.transactions__title p`);

const similarCardTemplate = document.querySelector(`#edit`).content.querySelector(`.transaction-edit`);

transactionItems.forEach((item) => {
  const transactionEditButton = item.querySelector(`.transactions-list__item--edit`);
  const transactionCloseButton = item.querySelector(`.transactions-list__item--close`);

  item.onmouseover = function () {
    if (transactionCloseButton.classList.contains(`hidden`)) {
      transactionEditButton.classList.remove(`hidden`);
    }
  };

  item.onmouseout = function () {
    if (transactionCloseButton.classList.contains(`hidden`)) {
      transactionEditButton.classList.add(`hidden`);
    }
  };

  transactionEditButton.onclick = function (e) {
    transactionEditButton.classList.add(`hidden`);
    transactionItems.forEach((it) => {
      it.classList.remove(`transactions-list__item--on-click`);
      const card = document.querySelector(`.transaction-edit`);
      if (card) {
        card.remove();
      }
      it.querySelector(`.transactions-list__item--close`).classList.add(`hidden`);
    });
    transactionCloseButton.classList.toggle(`hidden`);
    item.classList.add(`transactions-list__item--on-click`);

    const parent = e.target.parentElement.parentElement;

    const cardElement = similarCardTemplate.cloneNode(true);
    const sum = (parent.querySelector(`.transactions-list__item--expense`).textContent).slice(1, 3);
    const category = (parent.querySelector(`.transactions-list__item-wrapper p`).textContent);
    const account = (parent.querySelector(`.transactions-list__item--account`).textContent);

    cardElement.querySelector(`#sum`).value = sum;
    cardElement.querySelector(`#category`).value = category;
    cardElement.querySelector(`#account`).value = account;

    item.insertAdjacentElement(`afterend`, cardElement);

    return cardElement;
  };

  transactionCloseButton.onclick = function () {
    transactionItems.forEach((it) => {
      const card = document.querySelector(`.transaction-edit`);
      if (card) {
        card.remove();
      }
      it.querySelector(`.transactions-list__item--edit`).classList.add(`hidden`);
      it.querySelector(`.transactions-list__item--close`).classList.add(`hidden`);
    });
    item.classList.toggle(`transactions-list__item--on-click`);
  };
});

transactionAddButton.onclick = function () {
  // transactionAddButton.classList.toggle(`transactions__on-click`);
  transactionAdd.classList.toggle(`hidden`);
};
