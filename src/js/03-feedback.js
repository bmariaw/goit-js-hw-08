import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');
const refs = {
    input: document.querySelector('[name="email"]'),
    textarea: document.querySelector('[name="message"]'),
}

feedbackForm.addEventListener('submit', onFormSubmit);
feedbackForm.addEventListener('input', throttle(onTexareaInput, 500));
const formData = {};

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onTexareaInput(evt) {
    formData.email = refs.input.value;
    formData.message = refs.textarea.value;      
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

populateTexarea();

function populateTexarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    refs.input.value = savedMessage.email;
    refs.textarea.value = savedMessage.message;
  };
};
