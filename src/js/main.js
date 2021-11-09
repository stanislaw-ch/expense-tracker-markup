const transactionItems = document.querySelectorAll(`.transactions__item`);
const transactionDialog = document.querySelector(`.transaction__dialog`);
const transactionDialogButton = document.querySelector(`.transaction__dialog-btn`);
const transactionSubmitButton = document.querySelector(`.button`);

const similarCardTemplate = document.querySelector(`#edit`).content.querySelector(`.transaction-edit`);

transactionItems.forEach((item) => {
  const transactionEditButton = item.querySelector(`.transactions__item--edit`);
  const transactionCloseButton = item.querySelector(`.transactions__item--close`);

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
      it.classList.remove(`transactions__item--on-click`);
      const card = document.querySelector(`.transaction-edit`);
      if (card) {
        card.remove();
      }
      it.querySelector(`.transactions__item--close`).classList.add(`hidden`);
    });
    transactionCloseButton.classList.toggle(`hidden`);
    item.classList.add(`transactions__item--on-click`);

    const parent = e.target.parentElement.parentElement;

    const cardElement = similarCardTemplate.cloneNode(true);
    const sum = (parent.querySelector(`.transactions__item--expense`).textContent).slice(1, 3);
    const category = (parent.querySelector(`.transactions__item-wrapper p`).textContent);
    const account = (parent.querySelector(`.transactions__item--account`).textContent);

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
      it.querySelector(`.transactions__item--edit`).classList.add(`hidden`);
      it.querySelector(`.transactions__item--close`).classList.add(`hidden`);
    });
    item.classList.toggle(`transactions__item--on-click`);
  };
});

transactionDialogButton.onclick = function () {
  if (transactionDialog.classList.contains(`transaction__dialog--fade-in`)) {
    transactionDialog.classList.toggle(`transaction__dialog--fade-in`);
    transactionDialog.classList.toggle(`transaction__dialog--fade-out`);
    transactionDialogButton.classList.toggle(`transaction__dialog-btn--click`);
    setTimeout(() => transactionDialog.classList.toggle(`transaction__dialog--hidden`), 900);
  } else {
    if (transactionDialog.classList.contains(`transaction__dialog--fade-out`)) {
    transactionDialog.classList.toggle(`transaction__dialog--hidden`);
    transactionDialog.classList.toggle(`transaction__dialog--fade-in`);
    transactionDialog.classList.toggle(`transaction__dialog--fade-out`);
    transactionDialogButton.classList.toggle(`transaction__dialog-btn--click`);
  }
  }
};

transactionSubmitButton.onclick = function () {
  setTimeout(function () {
    transactionDialog.classList.toggle(`transaction__dialog--fade-in`);
    transactionDialog.classList.toggle(`transaction__dialog--fade-out`);
    transactionDialogButton.classList.toggle(`transaction__dialog--btn--click`);
    setTimeout(() => transactionDialog.classList.toggle(`transaction__dialog--hidden`), 900);
  }, 500)
};
