// IMPORTS
import { Card, type CardData } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js"; 
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo, type UserData } from "./UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";

//Token & URL
export const apiToken = "e7d43e0b-f834-466f-a655-8f26bc1474f2";
export const apiUrl = "https://around-api.es.tripleten-services.com/v1";

// DOM SELECTORS

const profileModal = document.querySelector("#edit-popup") as HTMLElement;

const nameInput = profileModal.querySelector(
  ".popup__input_type_name",
) as HTMLInputElement;

const descriptionInput = profileModal.querySelector(
  ".popup__input_type_description",
) as HTMLInputElement;

const openProfileButton = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;

// CARD SELECTORS

const addCardModal = document.querySelector("#new-card-popup") as HTMLElement;

const openAddCardButton = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;

// FORM SELECTORS

const profileForm = profileModal.querySelector(
  ".popup__form",
) as HTMLFormElement;

const addCardForm = addCardModal.querySelector(
  ".popup__form",
) as HTMLFormElement;

// CLASS INSTANCES

const userInfo = new UserInfo({
  nameSelector: ".profile__title",

  aboutSelector: ".profile__description",

  avatarSelector: ".profile__image",
});

async function loadUserInfo(): Promise<void> {
  try {
    const res = await fetch(`${apiUrl}/users/me`, {
      headers: {
        authorization: apiToken,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data: UserData = await res.json();

    userInfo.setUserInfo(data);
  } catch (err) {
    console.error(err);
  }
}

loadUserInfo();

const imagePopup = new PopupWithImage("#image-popup");

imagePopup.setEventListeners();

const section = new Section<CardData>(
  {
    items: [],

    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick, handleDeleteClick);

      return card.generateCard();
    },
  },

  ".cards__list",
);

async function loadInitialCards(): Promise<void> {
  try {
    const res = await fetch(`${apiUrl}/cards`, {
      headers: {
        authorization: apiToken,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data: CardData[] = await res.json();

    section.setItems(data);

    section.renderItems();
  } catch (err) {
    console.error(err);
  }
}

const profilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
  try {
    const res = await fetch(`${apiUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.name || "",
        about: inputValues.description || "",
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const updatedUserData: UserData = await res.json();

    userInfo.setUserInfo(updatedUserData);
    profilePopup.close();
  } catch (err) {
    console.error(err);
  }
});

profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
  try {
    const res = await fetch(`${apiUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues["place-name"] || "",
        link: inputValues.link || "",
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const newCardData: CardData = await res.json();

    const card = new Card(newCardData, "#card-template", handleImageClick, handleDeleteClick);

    section.addItem(card.generateCard());

    addCardPopup.close();
  } catch (err) {
    console.error(err);
  }
});

addCardPopup.setEventListeners();

function handleImageClick(name: string, link: string): void {
  imagePopup.open(name, link);
}

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");

deleteCardPopup.setEventListeners();

function handleDeleteClick(cardData: CardData, cardElement: HTMLElement): void {
  deleteCardPopup.setSubmitCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/cards/${cardData._id}`, {
        method: "DELETE",
        headers: {
          authorization: apiToken,
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      cardElement.remove();
      deleteCardPopup.close();
    } catch (err) {
      console.error(err);
    }
  });

  deleteCardPopup.open();
}

// FORM VALIDATION

const profileFormValidator = new FormValidator(defaultFormConfig, profileForm);

profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(defaultFormConfig, addCardForm);

addCardFormValidator.enableValidation();

// PROFILE MODAL

function fillProfileForm() {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;

  descriptionInput.value = userData.about;
}

function handleOpenEditModal() {
  fillProfileForm();

  profileFormValidator.resetValidation();

  profilePopup.open();
}

openProfileButton.addEventListener("click", handleOpenEditModal);

// ADD CARD MODAL

openAddCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();

  addCardPopup.open();
});

// INITIAL CARDS

loadInitialCards();
