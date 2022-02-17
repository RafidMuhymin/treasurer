let income, balance, percentage;

const calculateExpenses = (e) => {
  const formdata = getFormdata(e);

  const { foodCost, rentCost, clothCost } = formdata;

  income = formdata.income;

  const expenses = foodCost + rentCost + clothCost;

  balance = income - expenses;

  const savings = income * ((percentage || 0) / 100);

  const remainingBalance = balance - savings;

  document.querySelector(".balance").textContent = balance;
  document.querySelector(".expenses").textContent = expenses;
  document.querySelector(".savings").textContent = savings;
  document.querySelector(".remaining-balance").textContent = remainingBalance;
};

const calculateSavings = (e) => {
  const formdata = getFormdata(e);

  percentage = formdata.percentage;

  const savings = income * (percentage / 100);

  const remainingBalance = balance - savings;

  document.querySelector(".savings").textContent = savings;
  document.querySelector(".remaining-balance").textContent = remainingBalance;
};

const getFormdata = (e) => {
  e.preventDefault();

  const formdata = Object.fromEntries(new FormData(e.target));

  for (const key in formdata) {
    formdata[key] = parseFloat(formdata[key]);
  }

  return formdata;
};
