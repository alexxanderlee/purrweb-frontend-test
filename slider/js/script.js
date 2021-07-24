const sliderTrack = document.querySelector('.slider__track');
const slides = document.querySelectorAll('.slider__item');
const btnPrev = document.querySelector('.slider__btn_prev');
const btnNext = document.querySelector('.slider__btn_next');
const dots = document.querySelectorAll('.dots__item');

const slideWidth = slides[0].offsetWidth;
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
const firstIndex = 1;
const lastIndex = slides.length;

const TRANSITION_SPEED = 600;
const ANIMATION_INTERVAL = 3000;
const isAnimated = true;

let timer = null;
let currentIndex = firstIndex;

sliderTrack.prepend(lastSlideClone);
sliderTrack.append(firstSlideClone);

function setSliderTransition() {
  sliderTrack.style.transition = `transform ${TRANSITION_SPEED}ms ease`;
}

function removeSliderTransition() {
  sliderTrack.style.removeProperty('transition');
}

function setSlide(index) {
  currentIndex = index;
  const position = -(currentIndex * slideWidth);
  sliderTrack.style.transform = `translateX(${position}px)`;
}

function setDotActive(newIndex, prevIndex) {
  if (prevIndex) {
    const prevDot = document.querySelector(`[data-dot-index="${prevIndex}"]`);
    prevDot.classList.remove('dots__item_active');
  }
  const curDot = document.querySelector(`[data-dot-index="${newIndex}"]`);
  curDot.classList.add('dots__item_active');
}

function onNextSlide() {
  const prevIndex = currentIndex;
  const newIndex = currentIndex + 1;

  removeListeners();
  setSliderTransition();
  setSlide(newIndex);

  setTimeout(() => {
    addListeners();
    removeSliderTransition();
  }, TRANSITION_SPEED);

  if (newIndex > lastIndex) {
    setTimeout(() => setSlide(firstIndex), TRANSITION_SPEED);
    setDotActive(firstIndex, prevIndex);
  } else {
    setDotActive(newIndex, prevIndex);
  }
  isAnimated && runSlider();
}

function onPrevSlide() {
  const prevIndex = currentIndex;
  const newIndex = currentIndex - 1;

  removeListeners();
  setSliderTransition();
  setSlide(newIndex);

  setTimeout(() => {
    addListeners();
    removeSliderTransition();
  }, TRANSITION_SPEED);

  if (newIndex < firstIndex) {
    setTimeout(() => setSlide(lastIndex), TRANSITION_SPEED);
    setDotActive(lastIndex, prevIndex);
  } else {
    setDotActive(newIndex, prevIndex);
  }
  isAnimated && runSlider();
}

function handleDotClick(event) {
  const prevIndex = currentIndex;
  const newIndex = Number(event.target.dataset.dotIndex);

  removeListeners();
  setSliderTransition();
  setSlide(newIndex);
  
  setTimeout(() => {
    addListeners(); 
    removeSliderTransition();
  }, TRANSITION_SPEED);

  setDotActive(newIndex, prevIndex);

  isAnimated && runSlider();
}

function addListeners() {
  btnNext.addEventListener('click', onNextSlide);
  btnPrev.addEventListener('click', onPrevSlide);
  dots.forEach((dot) => dot.addEventListener('click', handleDotClick));
}

function removeListeners() {
  btnNext.removeEventListener('click', onNextSlide);
  btnPrev.removeEventListener('click', onPrevSlide);
  dots.forEach((dot) => dot.removeEventListener('click', handleDotClick));
}

function runSlider() {
  clearInterval(timer);
  timer = setInterval(() => onNextSlide(), ANIMATION_INTERVAL);
}

function initSlider() {
  setSlide(firstIndex);
  setDotActive(firstIndex);
  addListeners();
  isAnimated && runSlider();
}

window.onload = () => initSlider();
