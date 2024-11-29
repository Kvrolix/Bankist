# 💰 Bankist App

The **Bankist App** is a JavaScript-based banking application designed to provide users with an interactive and dynamic experience for managing accounts, transferring funds, requesting loans, and tracking transaction histories. With features like sorting transactions, a logout timer, and date formatting, this project showcases advanced JavaScript concepts and browser APIs.

---

## 🚀 Features

### **1. User Authentication**
- Login using a combination of username (first letters of the name and surname) and a personal PIN:
  - **Example Credentials**:
    - Username: `js` (Jonas Schmedtmann), PIN: `1111`
    - Username: `kl` (Karol Lubicz), PIN: `2222`

### **2. Account Overview**
- Displays a summary of account activities:
  - **Current Balance**: Total amount in the account.
  - **Inflow/Outflow**: Tracks deposits and withdrawals.
  - **Interest**: Calculates interest based on deposits.

### **3. Transaction History**
- View all transactions with:
  - **Type**: Deposit or withdrawal.
  - **Date**: Relative or formatted based on user locale.
  - **Amount**: Displayed in the account's currency.

### **4. Money Transfers**
- Transfer money between accounts by entering the recipient's username and amount.

### **5. Loan Requests**
- Request a loan based on certain criteria:
  - Loan is granted if at least 10% of the loan amount exists as a deposit in the account.

### **6. Account Closure**
- Securely close an account by confirming the username and PIN.

### **7. Sorting Transactions**
- Sort transactions in ascending or descending order for better analysis.

### **8. Logout Timer**
- Automatically logs out the user after a period of inactivity.

### **9. Locale-Based Formatting**
- Date and currency formatting based on user locale settings (e.g., `en-US`, `pt-PT`).

---

## 🛠️ Technologies Used

- **HTML5**: Semantic structure for the app layout.
- **CSS3**: Styling for a clean and responsive interface.
- **JavaScript (ES6+)**: 
  - DOM manipulation.
  - Browser APIs like `Intl.DateTimeFormat` and `Intl.NumberFormat`.
  - Advanced concepts like closures, event delegation, and timers.


---

## 📖 What I Learned

This project was a deep dive into modern JavaScript and browser APIs, covering:

1. **State Management**:
   - Managed account data using objects and updated the UI dynamically.

2. **DOM Manipulation**:
   - Used `querySelector`, `addEventListener`, and `insertAdjacentHTML` to build and update the UI.

3. **Date and Time APIs**:
   - Learned to calculate and format dates using `Intl.DateTimeFormat` and `Date` objects.

4. **Currency Formatting**:
   - Implemented `Intl.NumberFormat` for locale-specific currency display.

5. **Array Methods**:
   - Explored methods like `map`, `filter`, `reduce`, and `forEach` for handling data.

6. **Timers and Intervals**:
   - Used `setTimeout` and `setInterval` for logout timers and animations.

7. **Error Handling**:
   - Ensured secure and seamless transactions with validations and conditions.

8. **Code Optimization**:
   - Modularized functionality into reusable functions for clarity and maintainability.

---

## 🌟 Future Improvements

- **Mobile Responsiveness**:
  - Enhance the UI for better usability on smaller screens.

- **User Authentication**:
  - Add proper encryption for storing and validating credentials.

- **Advanced Analytics**:
  - Include graphical representations for financial insights.

- **Backend Integration**:
  - Store account data in a database for persistence across sessions.

---

## 🧑‍💻 Getting Started

### Prerequisites
- A modern browser (e.g., Chrome, Firefox).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bankist-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bankist-app
   ```
3. Open `index.html` in your browser.

---

## 📷 Screenshots
*Include screenshots or GIFs demonstrating key features of the app.*

---


## 📝 License


This project is based on the coursework and tasks provided in the [Jonas Schmedtmann](https://codingheroes.io/) course titled *"The Complete JavaScript Course 2023: From Zero to Expert!
"* (available on Udemy). The course materials, including designs, flowcharts, and assets, remain the intellectual property of Jonas Schmedtmann.

The implementation, including all code, solutions, and modifications in this repository, was written independently by me as part of my learning journey. This repository is intended solely for educational and portfolio purposes.

If you are interested in the original course materials or would like to support the instructor, please visit [Jonas Schmedtmann's website](https://codingheroes.io/) or his [Udemy profile](https://www.udemy.com/user/jonasschmedtmann/).

---

Enjoy managing your finances with Bankist! 🏦
