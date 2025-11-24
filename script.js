const bill = document.querySelector('#bill');
const billAlert = document.querySelector('.js-bill-alert');
const noOfPeople = document.querySelector('#number-of-people');
const peopleInputAlert = document.querySelector('.js-people-input-alert');
const tipPercentage = document.querySelectorAll('[data-tip]');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipBtn = document.querySelector('.js-custom-tip-percentage-btn');
const customTipInput = document.querySelector('.js-custom-tip-percentage-input');
const tipPercentageAlert = document.querySelector('.js-tip-percentage-alert')
const calculate = document.querySelector('.js-calculate-tip');
const tipDisplayPerPerson = document.querySelector('.js-tip-per-person');
const totalBillPerPersonDisplay = document.querySelector('.js-total-per-person');
const resetTipCalculator = document.querySelector('.js-reset-button');

let selectedTip = null;

// When a standard tip button is clicked
tipPercentage.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedTip = parseFloat(btn.dataset.tip);

        customTipBtn.style.display = 'block';
        customTipInput.style.display = 'none';
        customTipInput.value = '';
    });
});

tipButtons.forEach(el => {
    el.addEventListener('click', () => {

        // Remove active from all
        tipButtons.forEach(b => b.classList.remove('active'));

        // Add active to the clicked one
        el.classList.add('active');
    });
});

// Custom tip button → show input
customTipBtn.addEventListener('click', () => {
    customTipBtn.style.display = 'none';
    customTipInput.style.display = 'block';
    customTipInput.focus();
    tipButtons.forEach(b => b.classList.remove('active'));
});

// Custom input loses focus → hide if empty
customTipInput.addEventListener('blur', () => {
    if (customTipInput.value === '') {
        customTipInput.style.display = 'none';
        customTipBtn.style.display = 'block';
    }
});

// Main function
function calculateTip () {
    const totalBill = parseFloat(bill.value);
    const peopleToPay = parseFloat(noOfPeople.value);
    const customTip = parseFloat(customTipInput.value);

    let tipPercentageValue = null;

    if (!isNaN(customTip) && customTip > 0) {
        tipPercentageValue = customTip / 100;
    }
    else if (selectedTip !== null) {
        tipPercentageValue = selectedTip;
    }

    // calculations
    const tipAmountPerPerson = ((totalBill * tipPercentageValue) / peopleToPay);
    const totalBillPerPerson = ((totalBill / peopleToPay) + tipAmountPerPerson);
    
    // results
    tipDisplayPerPerson.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    totalBillPerPersonDisplay.textContent = `$${totalBillPerPerson.toFixed(2)}`;


    if (!totalBill) {
        billAlert.style.display = 'inline';
        bill.style.border = '2px red solid';
    }
    else {
        billAlert.style.display = 'none';
        bill.style.border = '';
    }

    if (!tipPercentageValue || customTip === '') {
        tipPercentageAlert.style.display = 'inline';
    }
    else {
         tipPercentageAlert.style.display = 'none';
    }


    if (!peopleToPay) {
        peopleInputAlert.style.display = 'inline';
        noOfPeople.style.border = '2px red solid';
    }
    else {
        peopleInputAlert.style.display = 'none';
        noOfPeople.style.border = '';
    }

    if (!totalBill || !tipPercentageValue || !peopleToPay) {
        tipDisplayPerPerson.textContent = `$${(0.00).toFixed(2)}`;
        totalBillPerPersonDisplay.textContent = `$${(0.00).toFixed(2)}`;
    }
}

calculate.addEventListener('click', () => {
    calculateTip();
    if (bill.value === '') {
        tipDisplayPerPerson.textContent = `$${(0.00).toFixed(2)}`;
        totalBillPerPersonDisplay.textContent = `$${(0.00).toFixed(2)}`;
    }
});
    


resetTipCalculator.addEventListener('click', () => {
    selectedTip = null;
    bill.value = '';
    noOfPeople.value = '';
    customTipInput.value = '';
    customTipInput.style.display = 'none';
    customTipBtn.style.display = 'block';
    tipDisplayPerPerson.textContent = `$${(0.00).toFixed(2)}`;
    totalBillPerPersonDisplay.textContent = `$${(0.00).toFixed(2)}`;
     tipButtons.forEach(b => b.classList.remove('active'));
});