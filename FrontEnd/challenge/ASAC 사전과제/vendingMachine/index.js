const drinkData = [
    {
        amount: 300,
        name: "비타민 음료"
    },
    {
        amount: 500,
        name: "사이다"
    },
    {
        amount: 1000,
        name: "콜라"
    }
];
let totalAmount = 0;
let selectedMoneyValue = 0;
let selectedDrinks = [];

const selectedMoney = document.getElementById("selectedMoney");
const money = document.getElementById("money");
const output = document.getElementById("output");

function increaseAmount(amount) {
    const selectedDrink = drinkData.find(drink => drink.amount === amount);

    if (selectedDrink) {
        if (totalAmount >= selectedDrink.amount) {
            selectedDrinks.push(selectedDrink.name);
            totalAmount -= selectedDrink.amount;
            selectedMoneyValue += selectedDrink.amount;

            selectedMoney.innerText = `선택한 음료 총 금액: ${selectedMoneyValue}`;
        } else {
            window.alert("잔액이 부족합니다.");
        }
    }
}

function insertAmount(amount) {
    totalAmount += amount;
    money.innerText = `잔액 총 금액: ${totalAmount}`;
}

function showResult() {
    selectedMoneyValue = 0;
    output.innerText = `남은 총 금액: ${totalAmount}원\n선택된 음료: ${selectedDrinks.join(", ")}`;
}

function reset() {
    totalAmount = 0;
    selectedMoneyValue = 0;
    selectedDrinks = [];

    money.innerText = '';
    output.innerText = '';
}