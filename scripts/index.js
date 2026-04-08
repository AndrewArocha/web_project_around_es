let initialCards = [
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

initialCards.forEach(card => {
    console.log(card);
});

function openModal(modal) {
    modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

const profileModal = document.querySelector('#edit-popup');
const nameInput = profileModal.querySelector('.popup__input_type_name');
const descriptionInput = profileModal.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const openProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = profileModal.querySelector('.popup__close');

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
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profileModal);
}

const profileForm = profileModal.querySelector('.popup__form');
profileForm.addEventListener('submit', handleProfileFormSubmit);