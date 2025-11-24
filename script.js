const bill = document.querySelector('#bill');
const noOfPeople = document.querySelector('#number-of-people');
const tipPercentage = document.querySelectorAll('[data-tip]');
const calculate = document.querySelector('.js-calculate-tip');
const tipDisplayPerPerson = document.querySelector('.js-tip-per-person');
const totalBillPerPersonDisplay = document.querySelector('.js-total-per-person');

let selectedTip = null;

tipPercentage.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedTip = parseFloat(btn.dataset.tip);
    })
})

function calculateTip () {
    const totalBill = parseFloat(bill.value);
    const peopleToPay = parseFloat(noOfPeople.value);
    const tipAmountPerPerson = ((totalBill * selectedTip) / peopleToPay);
    const totalBillPerPerson = ((totalBill / peopleToPay) + tipAmountPerPerson);

    tipDisplayPerPerson.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    totalBillPerPersonDisplay.textContent = `$${totalBillPerPerson.toFixed(2)}`;
}

calculate.addEventListener('click', (e) => {
    e.preventDefault();
    calculateTip();
});


resetTipCalculator.addEventListener('click', () => {
    tipDisplayPerPerson.textContent = `$${0.00}`;
    totalBillPerPersonDisplay.textContent = `$${0.00}`;
});