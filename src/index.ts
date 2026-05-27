// IMPORTS
import { Card, type CardData } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';
import {
    defaultFormConfig,
    initialCards
} from './utils/constants.js';

// DOM SELECTORS

const profileModal =
    document.querySelector(
        '#edit-popup'
    ) as HTMLElement;

const nameInput =
    profileModal.querySelector(
        '.popup__input_type_name'
    ) as HTMLInputElement;

const descriptionInput =
    profileModal.querySelector(
        '.popup__input_type_description'
    ) as HTMLInputElement;

const openProfileButton =
    document.querySelector(
        '.profile__edit-button'
    ) as HTMLButtonElement;

// CARD SELECTORS

const addCardModal =
    document.querySelector(
        '#new-card-popup'
    ) as HTMLElement;

const openAddCardButton =
    document.querySelector(
        '.profile__add-button'
    ) as HTMLButtonElement;

// FORM SELECTORS

const profileForm =
    profileModal.querySelector(
        '.popup__form'
    ) as HTMLFormElement;

const addCardForm =
    addCardModal.querySelector(
        '.popup__form'
    ) as HTMLFormElement;

// CLASS INSTANCES

const userInfo =
    new UserInfo({
        nameSelector:
            '.profile__title',

        descriptionSelector:
            '.profile__description'
    });

const imagePopup =
    new PopupWithImage(
        '#image-popup'
    );

imagePopup
    .setEventListeners();

const section =
    new Section<CardData>({
        items:
            initialCards,

        renderer:
            (item) => {

                const card =
                    new Card(
                        item,
                        '#card-template',
                        handleImageClick
                    );

                return card
                    .generateCard();
            }
    },

        '.cards__list'
    );

const profilePopup =
    new PopupWithForm(
        '#edit-popup',
        (
            inputValues
        ) => {

            userInfo
                .setUserInfo({
                    name:
                        inputValues
                            .name || '',

                    description:
                        inputValues
                            .description || ''
                });

            profilePopup
                .close();
        }
    );

profilePopup
    .setEventListeners();

const addCardPopup =
    new PopupWithForm(
        '#new-card-popup',
        (
            inputValues
        ) => {

            const card =
                new Card(
                    {
                        name:
                            inputValues[
                                'place-name'
                            ] || '',

                        link:
                            inputValues
                                .link || ''
                    },

                    '#card-template',

                    handleImageClick
                );

            section
                .addItem(
                    card
                        .generateCard()
                );

            addCardPopup
                .close();
        }
    );

addCardPopup
    .setEventListeners();

function handleImageClick(
    name: string,
    link: string
): void {

    imagePopup.open(
        name,
        link
    );
}

// FORM VALIDATION

const profileFormValidator =
    new FormValidator(
        defaultFormConfig,
        profileForm
    );

profileFormValidator
    .enableValidation();

const addCardFormValidator =
    new FormValidator(
        defaultFormConfig,
        addCardForm
    );

addCardFormValidator
    .enableValidation();

// PROFILE MODAL

function fillProfileForm() {

    const userData =
        userInfo
            .getUserInfo();

    nameInput.value =
        userData.name;

    descriptionInput.value =
        userData.description;
}

function handleOpenEditModal() {

    fillProfileForm();

    profileFormValidator
        .resetValidation();

    profilePopup
        .open();
}

openProfileButton
    .addEventListener(
        'click',
        handleOpenEditModal
    );

// ADD CARD MODAL

openAddCardButton
    .addEventListener(
        'click',
        () => {

            addCardFormValidator
                .resetValidation();

            addCardPopup
                .open();
        }
    );

// INITIAL CARDS

section
    .renderItems();