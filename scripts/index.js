// DOM SELECTORS

const profileModal = document.querySelector('#edit-popup');
const nameInput = profileModal.querySelector('.popup__input_type_name');
const descriptionInput = profileModal.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const openProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = profileModal.querySelector('.popup__close');
const popups = document.querySelectorAll('.popup');

// CARD SELECTORS

const cardsContainer = document.querySelector('.cards__list');
const addCardModal = document.querySelector('#new-card-popup');
const openAddCardButton = document.querySelector('.profile__add-button');
const closeAddCardButton = addCardModal.querySelector('.popup__close');
const imagePopup = document.querySelector('#image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupCloseButton = imagePopup.querySelector('.popup__close');

// FORM SELECTORS
const forms = document.querySelectorAll('.popup__form');
const profileForm = profileModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');
const cardTitleInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },{
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },{
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];

//FUNCTIONS

function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);

}


// PROFILE MODAL
openProfileButton.addEventListener('click', handleOpenEditModal);

closeProfileButton.addEventListener('click', () => {
    closeModal(profileModal);
});

function fillProfileForm() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
    fillProfileForm();
    openModal(profileModal);
    resetValidation(profileForm);
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profileModal);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// ADD CARD MODAL

function getCardElement(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');   

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });

    cardDeleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

  cardImage.addEventListener('click', () => {
    openImagePopup(name, link);
    });

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    if (!link) {
        cardImage.src = 'https://via.placeholder.com/150';
    } 
    
    if (!name) {
        cardTitle.textContent = 'Sin título';
    }

    return cardElement;
}

function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

function renderCard(name, link) {
    const cardElement = getCardElement(name, link);
    cardsContainer.prepend(cardElement);
}

openAddCardButton.addEventListener('click', () => {
    openModal(addCardModal);
    resetValidation(addCardForm);
});

closeAddCardButton.addEventListener('click', () => {
    closeModal(addCardModal);
});

popupCloseButton.addEventListener('click', () => {
  closeModal(imagePopup);
});

function handleEscClose(evt) {
    document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});}


popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closeModal(popup);
        }
    });
});


function handleAddCardFormSubmit(event) {
    event.preventDefault();
    const name = cardTitleInput.value.trim();
    const link = cardLinkInput.value.trim();
    renderCard(name, link);
    addCardForm.reset();
    closeModal(addCardModal);
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach(card => {
    renderCard(card.name, card.link);
});

import { setEventListeners, resetValidation } from './validate.js';

forms.forEach(form => {
  setEventListeners(form);
});

resetValidation(profileForm);
resetValidation(addCardForm);