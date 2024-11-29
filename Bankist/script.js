'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// TO LOGIN USE THE first letter from the name and the first letter from the surname and then the associated pin
// js 1111
// kl 2222

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2023-08-01T16:33:06.386Z',
    '2023-08-02T14:43:26.374Z',
    '2023-08-05T18:49:59.371Z',
    '2023-08-06T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Karol Lubicz',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
// Create your own account

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//It is a good practice to always create a function so it doesn't work with the global variables
const displayMovements = function (acc, sort = false) {
  //before we add any data to the container, we should make sure it's clean of the elements when we have been creating it
  containerMovements.innerHTML = '';

  //Creating a copy using the slice method to not change the original array and we are in the middle of the chain as well
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  //If it set to false we gonna to re-arrange it, but if not we just leave the original array

  const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
      Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); //Math.abs return the value without the symbol prefixed so it doesn't matter which date goes first

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0); //So it is formatted as 07 not 7
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();

    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minute = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
    const now = Date.now();

    //It is very good practice to create an object options outside of the API, so it is safe to create changes
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //Long will give us the name of the month
      year: 'numeric', // 2-digit  will give us 2023 -> 23
      // weekday: 'long', //Short  narrow
    };
    // const locale = navigator.language; // It will take the language from the browser
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    const daysPassed = Math.round(calcDaysPassed(new Date(), date));
    // console.log(daysPassed);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    // else {
    //   const day = `${date.getDate()}`.padStart(2, 0); //So it is formatted as 07 not 7
    //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
    //   const year = date.getFullYear();

    //   return `${day}/${month}/${year}`;
    // }
    return new Intl.DateTimeFormat(locale).format(date);
  };
  //Method to loop over different element in the array
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    //When we copy the html, we just need to replace the text values with the values we actually want to pass in. And get rid of what we don't want to keep.

    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
`;

    //We use this to actually display our html onto a website in the container called movements
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  //<p class="balance__value">0000€</p>
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  //As we want to mutate the array we use the forEach method
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  //Display Balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //<p class="summary__value summary__value--in">0000€</p>
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, deposit) => acc + deposit);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // When timeer === 0, stop timer and log out the user
    if (time === 0) {
      clearInterval(timer); // stop timer
      containerApp.style.opacity = 0;

      labelWelcome.textContent = `Log in to get started
        `;
    }
    //Decrease 1 sec
    time--;
  };
  //Set time to 5 minutes
  let time = 30;
  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//Event Handlers

let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// EXPERIMENTING API

//Create current date and time
//<span class="date">05/03/2037</span>

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //It will prevent the form from submitting ##Useful when working on logins etc.

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  ); //Reading an input value and matching with the one in the system
  // console.log(currentAccount);

  //If the current account exist then perfrom the next operation
  if (currentAccount?.pin === +inputLoginPin.value) {
    // console.log('password');
    //Display UI and welcome message

    //<p class="welcome">Log in to get started</p>
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }!`;

    containerApp.style.opacity = 100;

    //Clear login fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // So the window will lose its focus

    //Start the logout timer

    //Timer
    if (timer) clearTimeout(timer);
    timer = startLogOutTimer();

    //Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // that would reload the page if not this line
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  //Cleaning the transfer from variables
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString()); //so it does creates a string not an object
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  //Some method used to check of some element is meeting the criteria
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Update UI
      updateUI(currentAccount);
      //Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    //Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = 'Log in to get started';
});

// To turn on and turn off the varialbe
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted; //Each time we click we change it from true to false, and so on
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
console.log(23 === 23.0);
// Base 10,  0 to 9
// binary base 2 - 0,1

console.log(0.1 + 0.2); //0.30000000000000004 same as in PHP or Ruby
console.log(0.1 + 0.2 === 0.3);

// Conversion
console.log(Number('23'));
console.log(+'23'); //When JavaS sees the plus it will do a type conversion

// Parsing adding another parameter will not create bugs in the codebase
// 2 - Binary
// Base 10 that what we use
console.log(Number.parseInt('30px', 10));

console.log(Number.parseInt('2.5rem')); //2
console.log(Number.parseFloat('2.5rem')); //2.5

// Check if value is not a NaN
// Used to check if a value is not a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x'));
console.log(Number.isNaN(23 / 0));

// Checking if value is a number
// Way better to check if it is a number or it isn't a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20x'));

console.log(Number.isInteger(20));
console.log(Number.isInteger(20.0));
*/
/*
//SQRT
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

//Max value it does type 'coersion' but it doesn't do parsing e.g (23px)
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.min(5, 18, 23, 11, 2)); //2

console.log(Math.PI * Number.parseFloat('10px') ** 2); //Circle

console.log(Math.trunc(Math.random() * 6) + 1);

//Random number
//This is how it should be created
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.trunc(23.3));

//Round to the nearest integer - uses type coercion
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

//Round up - uses type coercion
console.log(`Ceil: `, Math.ceil(23.3));
console.log(`Ceil: `, Math.ceil(23.9));

//Round down - uses type coercion
console.log(`Floor: `, Math.floor(23.3));
console.log(`Floor: `, Math.floor('23.9'));

// Floor is better than trunc
console.log(Math.trunc(-23.3)); //-23
// Math.floor(-45.95); // -46
console.log(Math.floor(-23.3)); //-24

// Rounding decimals

// Will return a string not a number
console.log(+(2.7).toFixed(0)); //3 string
console.log((2.7).toFixed(3)); //2.700
console.log((2.7 / 2).toFixed(3)); //1.350
console.log((2.7 / 2).toFixed(2)); //1.350
*/

/*
// The reaminder operator
//Every number with a reminder %2 === 0 is an even number
//
console.log(5 % 2); //1
console.log(5 / 2); // 5 = 2*2 +1

console.log(6 % 2); // 0

const isEven = n => n % 2 === 0;

console.log(isEven(523));
console.log(isEven(520));

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();

  // 0,2,4,6 every second time
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'lightgrey';

    // 0,3,6,9 every 3rd time
    if (i % 3 === 0) {
      row.style.backgroundColor = 'blue';
    }
  });
});
*/
/*
// Numeric seperators
// 287,460,000,000
// as a thousands seperator
const diameter = 287_460_000_000;
console.log(diameter); //287460000000 ignores the seperators

const priceCents = 345_99;
const price = 345_99;
console.log(priceCents);

const trasnferFee1 = 15_00;
const trasnferFee2 = 1_500;

//Restrictions
// const PI = _3._1415__;
// console.log(PI); //Error

console.log(Number('230_000')); //NaN
*/

/*
console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991

console.log(2 ** 53 + 3); //9007199254740996
console.log(2 ** 53 + 4); //9007199254740996

// BIG INT

// Math operators won't work with BigInt
console.log(41624781289471290582470538823948n); //41624781289471290582470538823948n
console.log(BigInt(41624781289471290582470538823948)); //Different than the above

//Operations

console.log(10000n + 10000n); //20000n
console.log(10000n * 10000000000000000000000000000089689756965n); //20000n

//  Cannot mix BigInt and other types, use explicit conversions
const huge = 234567543636734634643642n;
const num = 23;
console.log(huge * BigInt(num));

//Exceptions
console.log(28n > 15);
console.log(20n === 20); //false as JS does not do type coercion in here
console.log(20n == '20');

console.log(huge + ' is REALLY big');

// Divisions
console.log(10n / 3n); //3n
console.log(10 / 3); //3.333...
*/

/*
// Create a date
const now = new Date();
console.log(now); //Mon Aug 07 2023 12:55:59 GMT+0100 (British Summer Time)

console.log(new Date('Aug 07 2023 12:55:59 '));
console.log(new Date('December 24, 2015')); //Thu Dec 24 2015 00:00:00 GMT+0000 (Greenwich Mean Time)

console.log(new Date(account1.movementsDates[0]));

//Month is 0 based
console.log(new Date(2037, 10, 19, 15, 23, 5)); //Thu Nov 19 2037 15:23:05 GMT+0000

//Auto correct for date
console.log(new Date(2037, 10, 31, 15, 23, 5)); //Tue Dec 01 2037 15:23:05 GMT+0000 (Greenwich Mean Time)

console.log(new Date(0)); //Thu Jan 01 1970 01:00:00 GMT+0100
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //day * hours * minutes * seconds * milliseconds
*/

/*
// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future); //Thu Nov 19 2037 15:23:00 GMT+0000

// Never use getYear, use this one instead
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); //Day of the month
console.log(future.getDay()); //Day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); //2037-11-19T15:23:00.000Z
console.log(future.getTime()); //2142256980000 Number of msc that passed from the 1970

//Timestamps
console.log(new Date(2142256980000)); //Thu Nov 19 2037 15:23:00 GMT+0000

console.log(Date.now());

future.setFullYear(2040);
//Other methods same as above that perform auto correction
console.log(future); //Mon Nov 19 2040 15:23:00 GMT+0000
*/

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future); //2142256980000

// const calcDaysPassed = (date1, date2) =>
//   Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); //Math.abs return the value without the symbol prefixed so it doesn't matter which date goes first

// const days1 = calcDaysPassed(
//   new Date(2037, 3, 4),
//   new Date(2037, 3, 14, 10, 8)
// );

// console.log(days1); //10 days

/*
const num = 4325236326.23;

const options = {
  style: 'currency', //unit percent currency
  // unit: 'celsius',
  currency: 'PLN',
  // useGrouping: false, //seperators
};

console.log(`US:     `, new Intl.NumberFormat('en-US', options).format(num));
console.log(`UK:     `, new Intl.NumberFormat('eng-UK', options).format(num));
console.log(`Poland: `, new Intl.NumberFormat('pl-PL', options).format(num)); //4 325 236 326,23
console.log(`Germany:`, new Intl.NumberFormat('de-DE', options).format(num)); //4.325.236.326,23
console.log(`Syria  :`, new Intl.NumberFormat('ar-SY', options).format(num)); // ٤٬٣٢٥٬٢٣٦٬٣٢٦٫٢٣
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
); // ٤٬٣٢٥٬٢٣٦٬٣٢٦٫٢٣
*/
/*
// setTimeout - schedules a function to run after specifed time
const ingredients = ['olives', ''];

//we have schedule it for 3 secs later

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
); //msc, all the arguments we pass after the delay will have be linked to the function
console.log('Waiting...');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); // used to delete a timer

//What if we would like to run a function every 5 sec / 10 minutes
// setInterval
setInterval(function () {
  const now = new Date();
  //Create a watch
  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
}, 1000);
*/
