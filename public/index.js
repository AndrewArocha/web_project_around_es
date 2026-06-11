// IMPORTS
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";
//Token & URL
export const apiToken = "e7d43e0b-f834-466f-a655-8f26bc1474f2";
export const apiUrl = "https://around-api.es.tripleten-services.com/v1";
// DOM SELECTORS
const profileModal = document.querySelector("#edit-popup");
const nameInput = profileModal.querySelector(".popup__input_type_name");
const descriptionInput = profileModal.querySelector(".popup__input_type_description");
const openProfileButton = document.querySelector(".profile__edit-button");
// CARD SELECTORS
const addCardModal = document.querySelector("#new-card-popup");
const openAddCardButton = document.querySelector(".profile__add-button");
// FORM SELECTORS
const profileForm = profileModal.querySelector(".popup__form");
const addCardForm = addCardModal.querySelector(".popup__form");
// CLASS INSTANCES
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
async function loadUserInfo() {
    try {
        const res = await fetch(`${apiUrl}/users/me`, {
            headers: {
                authorization: apiToken,
            },
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        userInfo.setUserInfo(data);
    }
    catch (err) {
        console.error(err);
    }
}
loadUserInfo();
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const section = new Section({
    items: [],
    renderer: (item) => {
        const card = new Card(item, "#card-template", handleImageClick, handleDeleteClick);
        return card.generateCard();
    },
}, ".cards__list");
async function loadInitialCards() {
    try {
        const res = await fetch(`${apiUrl}/cards`, {
            headers: {
                authorization: apiToken,
            },
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        section.setItems(data);
        section.renderItems();
    }
    catch (err) {
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
        const updatedUserData = await res.json();
        userInfo.setUserInfo(updatedUserData);
        profilePopup.close();
    }
    catch (err) {
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
        const newCardData = await res.json();
        const card = new Card(newCardData, "#card-template", handleImageClick, handleDeleteClick);
        section.addItem(card.generateCard());
        addCardPopup.close();
    }
    catch (err) {
        console.error(err);
    }
});
addCardPopup.setEventListeners();
function handleImageClick(name, link) {
    imagePopup.open(name, link);
}
const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
deleteCardPopup.setEventListeners();
function handleDeleteClick(cardData, cardElement) {
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
        }
        catch (err) {
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
//# sourceMappingURL=index.js.map