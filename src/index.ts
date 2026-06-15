// INDEX
import { Card, type CardData } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo, type UserData } from "./UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./Api.js";

// API INSTANCE
export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "e7d43e0b-f834-466f-a655-8f26bc1474f2",
    "Content-Type": "application/json",
  },
});

// INTERFACES FOR FORM VALUES
interface ProfileFormValues {
  name?: string;
  description?: string;
}

interface CardFormValues {
  "place-name"?: string;
  link?: string;
}

interface AvatarFormValues {
  avatar?: string;
}

// DOM SELECTORS
const profileModal = document.querySelector("#edit-popup") as HTMLElement;
const nameInput = profileModal.querySelector(".popup__input_type_name") as HTMLInputElement;
const descriptionInput = profileModal.querySelector(".popup__input_type_description") as HTMLInputElement;
const openProfileButton = document.querySelector(".profile__edit-button") as HTMLButtonElement;

// CARD SELECTORS
const addCardModal = document.querySelector("#new-card-popup") as HTMLElement;
const openAddCardButton = document.querySelector(".profile__add-button") as HTMLButtonElement;

// AVATAR SELECTORS
const openAvatarButton = document.querySelector(".profile__image-edit-button") as HTMLButtonElement;
const avatarModal = document.querySelector("#avatar-popup") as HTMLElement;

// FORM SELECTORS
const profileForm = profileModal.querySelector(".popup__form") as HTMLFormElement;
const addCardForm = addCardModal.querySelector(".popup__form") as HTMLFormElement;
const avatarForm = avatarModal.querySelector(".popup__form") as HTMLFormElement;

// CLASS INSTANCES
export const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
deleteCardPopup.setEventListeners();

const section = new Section<CardData>(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick, handleDeleteClick, (cardData, cardElement) => {
        handleLikeClick(cardData, cardElement, card);
      });
      return card.generateCard();
    },
  },
  ".cards__list",
);

// INITIAL DATA LOADING FROM API
async function loadInitialData(): Promise<void> {
  try {
    const [userData, cardsData] = await Promise.all([
      api.getUserInfo<UserData>(),
      api.getInitialCards<CardData[]>(),
    ]);

    userInfo.setUserInfo(userData);
    section.setItems(cardsData);
    section.renderItems();
  } catch (err) {
    console.error("Initialization failed:", err);
  }
}

// HANDLERS
async function handleLikeClick(cardData: CardData, cardElement: HTMLElement, cardInstance: Card): Promise<void> {
  try {
    const isCurrentlyLiked = !!cardData.isLiked;
    const updatedCardData = await api.changeLikeStatus<CardData>(cardData._id, isCurrentlyLiked);
    cardInstance.setLikeState(updatedCardData.isLiked || false, cardElement);
  } catch (err) {
    console.error(err);
  }
}

function handleImageClick(name: string, link: string): void {
  imagePopup.open(name, link);
}

function handleDeleteClick(cardData: CardData, cardElement: HTMLElement): void {
  deleteCardPopup.setSubmitCallback(async () => {
    try {

      await api.deleteCard(cardData._id);
      cardElement.remove();
      deleteCardPopup.close();
    } catch (err) {
      console.error(err);
    }
  });
  deleteCardPopup.open();
}

// POPUPS ARCHITECTURE WITH FORMS AND LOADING STATE
const profilePopup = new PopupWithForm("#edit-popup", async (rawInputValues) => {
  const inputValues = rawInputValues as ProfileFormValues;
  try {
    profilePopup.renderLoading(true);
    const updatedUserData = await api.updateUserInfo<UserData>(
      inputValues.name || "",
      inputValues.description || ""
    );
    userInfo.setUserInfo(updatedUserData);
    profilePopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    profilePopup.renderLoading(false);
  }
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#new-card-popup", async (rawInputValues) => {
  const inputValues = rawInputValues as CardFormValues;
  try {
    addCardPopup.renderLoading(true, "Creando...");
    const newCardData = await api.addNewCard<CardData>(
      inputValues["place-name"] || "",
      inputValues.link || ""
    );

    const card = new Card(newCardData, "#card-template", handleImageClick, handleDeleteClick, (cardData, cardElement) => {
      handleLikeClick(cardData, cardElement, card);
    });

    section.addItem(card.generateCard());
    addCardPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    addCardPopup.renderLoading(false);
  }
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-popup", async (rawInputValues) => {
  const inputValues = rawInputValues as AvatarFormValues;
  try {
    avatarPopup.renderLoading(true);
    const updatedUserData = await api.updateAvatar<UserData>(
      inputValues.avatar || ""
    );
    userInfo.setUserInfo(updatedUserData);
    avatarPopup.close();
  } catch (err) {
    console.error(err);
  } finally {
    avatarPopup.renderLoading(false);
  }
});
avatarPopup.setEventListeners();

// FORM VALIDATION
const profileFormValidator = new FormValidator(defaultFormConfig, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(defaultFormConfig, addCardForm);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);
avatarFormValidator.enableValidation();

// EVENT LISTENERS CONTROLLERS
openAvatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

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

openAddCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

// INITIAL EXECUTION
loadInitialData();