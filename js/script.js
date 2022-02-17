let income, balance, percentage;

// Calculate expenses and balance, savings and remainingBalance
const calculateExpenses = (e) => {
  const errorStore = "expenses";

  const formdata = getFormdata(e, errorStore);

  const { Food, Rent, Clothes } = formdata;

  income = formdata.Income;

  const expenses = Food + Rent + Clothes;

  balance = income - expenses;

  if (balance < 0) {
    outputError(errorStore, "Expenses cannot be greater than income");
  } else {
    clearError();
  }

  const savings = income * ((percentage || 0) / 100);

  const remainingBalance = balance - savings;

  document.querySelector(".balance").textContent = balance;
  document.querySelector(".expenses").textContent = expenses;
  document.querySelector(".savings").textContent = savings;
  document.querySelector(".remaining-balance").textContent = remainingBalance;
};

// Calculate savings and remainingBalance
const calculateSavings = (e) => {
  const errorStore = "savings";

  const formdata = getFormdata(e, errorStore);

  percentage = formdata.percentage;

  if (!income) {
    outputError(errorStore, "Income is not set");
  } else {
    clearError();
  }

  const savings = income * (percentage / 100);

  const remainingBalance = balance - savings;

  if (remainingBalance < 0) {
    outputError(errorStore, "Savings cannot be greater than balance");
  } else {
    clearError();
  }

  document.querySelector(".savings").textContent = savings;
  document.querySelector(".remaining-balance").textContent = remainingBalance;
};

// Get numbered form data object properties
const getFormdata = (e, errorStore) => {
  e.preventDefault();

  const formdata = Object.fromEntries(new FormData(e.target));

  for (const key in formdata) {
    formdata[key] = parseFloat(formdata[key]);

    if (Number.isNaN(formdata[key])) {
      const errorMessage = `${
        key === "percentage" ? "Savings Percentage" : key
      } is not a number`;

      outputError(errorStore, errorMessage);
    }

    if (formdata[key] < 0) {
      const errorMessage = `${key} cannot be negative`;

      outputError(errorStore, errorMessage);
    }
  }

  clearError();

  return formdata;
};

// Output error message in asked error store
const outputError = (errorStore, errorMessage) => {
  const store = document.querySelector(`.${errorStore}-error-store`);

  store.textContent = errorMessage;

  throw new Error(errorMessage);
};

// Clear error message in asked error store
const clearError = () => {
  const expensesErrorStore = document.querySelector(`.expenses-error-store`);
  const savingsErrorStore = document.querySelector(`.savings-error-store`);

  expensesErrorStore.textContent = "";
  savingsErrorStore.textContent = "";
};
