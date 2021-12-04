"use strict";

const bill = document.getElementById("bill-input");
const tips = document.querySelectorAll(".tip");
const tipCustom = document.getElementById("tip-custom");
const people = document.getElementById("people-input");
const errorMsg = document.querySelector(".error");
const results = document.querySelectorAll(".amount");
const resetCalculator = document.querySelector(".reset");

// Default value
let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

bill.addEventListener("input", setBillValue);

tips.forEach((tip) => {
  tip.addEventListener("click", handleClick);
});

tipCustom.addEventListener("input", setTipCustomValue);

people.addEventListener("input", setPeopleValue);

resetCalculator.addEventListener("click", reset);

function setBillValue() {
  billValue = parseFloat(bill.value);
  calculateTip();
}

function handleClick(event) {
  tips.forEach((tip) => {
    // Clear active state
    tip.classList.remove("active-tip");

    // Set active state
    if (event.target.innerHTML == tip.innerHTML) {
      tip.classList.add("active-tip");
      tipValue = parseFloat(tip.innerHTML) / 100;
    }
  });

  // Clear custom tip
  tipCustom.value = "";

  calculateTip();
}

function setTipCustomValue() {
  tipValue = parseFloat(tipCustom.value / 100);

  // Remove active state from button
  tips.forEach((tip) => {
    tip.classList.remove("active-tip");
  });

  // console.log(tipValue);
  calculateTip();
}

function setPeopleValue() {
  peopleValue = parseFloat(people.value);
  console.log(peopleValue);
  if (isNaN(peopleValue)) {
    peopleValue = 1;
  }

  if (peopleValue <= 0) {
    errorMsg.classList.add("show-error-msg");
    setTimeout(function () {
      errorMsg.classList.remove("show-error-msg");
    }, 3000);
  }

  // console.log(peopleValue);
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + tipAmount) / peopleValue;

    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  bill.value = 0;
  setBillValue();

  tips[1].click();

  people.value = "1";
  setPeopleValue();
}
