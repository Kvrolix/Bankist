'use strict';

///////////////////////////////////////
// Modal window
//Better file organization
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault(); // the page doesn't jump
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Adds the functionality for openModal buttons
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//btn--scroll-to
// always if its a section use  a #

//Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event deleagtion
// 1. Add the event listener to a parent element of all the elements that we are interested in
// 2. Determine what element originated the event.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target); //we can see where the event happened

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause, the if statement which will return early if some condition is matched
  if (!clicked) return;

  // Remove the active classes for both tabs and tabsContent
  //Clearing the class on all of them and then inserting a new one
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Active Tab
  tabsContent.forEach(tabContenet =>
    tabContenet.classList.remove('operations__content--active')
  );

  //Activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Pasing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// // Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// // Do not use it normally
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
/*
//This callback function will get called each time the observed element (target element) is intersecting the root element at the treshold(viewport at 10%) that we defined
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

//Root is the element that the target is intersecting

const obsOptions = {
  root: null,
  //There can be multiple thresholds
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const header = document.querySelector('header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

//root is null as we are interested in the entire viewport
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace the src atribute with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `300px`,
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class ="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //Go to the next slide (cahnge value in the transform)

  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    activateDot(slide);
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
    activateDot(curSlide);
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// SELECTING ELEMENT
/*
//If we want to apply the CSS to the entire page we always need to select the documentElement
// console.log(document.documentElement);
// console.log(document.head); //Not visible on the page
// console.log(document.body);

// This is used not only on the document node but on the Element as well
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

//Only pass the name without the selector '#'
// <section class="section" id="section--1">
document.getElementById('secion--1');

//Returns HTML Collection (Live collection) if the DOM changes then this collection is updated too.
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// No need for a selector '.', Returns HTML Collection (Live collection)

// console.log(document.getElementsByClassName('btn'));
*/
////////////////////////////////////////////////////////////////
// CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML

//It creates the DOM element and stores into a message
const message = document.createElement('div');
message.classList.add('cookie-message'); // can be found in the CSS
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie">Got it!</button>';

//It is in a LiveCollection and only the second version will be there as it cannot be in two places (double sleve is forbidden)

//Can be used to move elements around !!
// header.prepend(message); //Adds the element as the FIRST child of the (header) element
header.append(message); //Adds the element as the LAST child

//To use the same element we need to copy it
// header.append(message.cloneNode(true));

// header.before(message); //Adds the element as the LAST child
// header.after(message); //Adds the element as the LAST child

////////////////////////////////////////////////////////////////
// DELETING ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.parentElement.removeChild(message); //Old way
    // message.remove(); // New way
  });
//<button class="btn btn--close-cookie">Got it!</button>

/*
////////////////////////////////////////////////////////////////
//Styles, Attributes and Classes

//Styles

//Inline styles to
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // No where to be found
console.log(message.style.backgroundColor); //rgb(55, 56, 61) It will work just because of the inline changes we have made to the object

console.log(getComputedStyle(message).color); // To get the value from the DOM
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

console.log(message.style.height);

//CSS Variables
document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes
//src alt class id

//We are able to acces seperate attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //Bankist logo
console.log(logo.src); //http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png //Absolute URL
console.log(logo.className); //nav__logo

// Setting
logo.alt = 'Beautiful minimalist logo';

//It only expects standard property
// Non- standard
console.log(logo.designer); //undefined
console.log(logo.getAttribute('designer')); // Karol
logo.setAttribute('company', 'Bankist');

console.log(logo.src); //http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/img/logo.png

console.log(logo.getAttribute('src')); //img/logo.png //Relative

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //http://127.0.0.1:5500/13-Advanced-DOM-Bankist/starter/#
console.log(link.getAttribute('href')); // #

// Data Attributes
// We work a lot with it when we create the UI, espescially when we want to keep the values.
// it has to start with 'data' in the HTML
console.log(logo.dataset.versionNumber); // 3.0 use camelCase !!!

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

//Don't use, as it allows only to put 1 class on the element. And it will override the rest
// logo.className = 'Karol';
*/

/*
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading.');

  //To remove it after it already happened once but it needs to be in its own function
  // It can be done at any place in the document
  // h1.removeEventListener('mouseenter', alertH1);
};
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//there is option do to that in the HTML as well but this is from thea early days so don't use it

//This one can be removed later
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1);

//Old way not good now, it overwrites the first function
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading.');
// };
*/

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

/*
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, 'Curr:', e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation not a good idea to use,only use if there are many handlers
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, 'Curr:', e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Nav', e.target, 'Curr:', e.currentTarget);
  },
  true
); // If this is set to true it won't listen to the bubbling events but instead it will listen to the capturing events
*/
/*
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
//It selects all the highlight class, that are children of 'h1' element.
//It will work, no matter how deep is the child element
//If there would be different elements of the h1 element they wouldn't be selected as they're not children of 'h1' element.
console.log(h1.childNodes); //Don't use
console.log(h1.children); // Only for direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Going upwards: parents

//Very important for event delegation
console.log(h1.parentElement);
//It selected the sclosest header to our h1 element, the closest parent element that has this class and then it applied its style to that element.
h1.closest('.header').style.background = 'var(--gradient-secondary)';
//Closes is the opposit of the querySelector, they both receive the input but querrySelector finds children no matter how deep in the DOM tree, while the closest method finds its parents laso no matter how UP in the DOM tree.

//Going sideways: siblings
//In JS we can only access direct siblings such as next one and the previous one.
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); //Don't use
console.log(h1.nextSibling); //Don't use

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log(`HTML parsed and DOM tree build!`, e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//Use it only when user is in the middle of the task
// //Immediately created just before the user wants to leave the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
