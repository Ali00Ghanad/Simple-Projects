const addButton = document.getElementById('add');
const clearList = document.getElementById('clear');
const dataContainer = document.querySelectorAll('.input-container');
const budgetValue = document.getElementById('budget');
const result = document.getElementById('result');
const calorieCounter = document.querySelector('form')
let isError = false;

function addEntry(){
    const value = document.getElementById('option');
    const inputContainer = document.querySelector(`#${value.value} .input-container`);
    const counter = inputContainer.querySelectorAll('input[type="text"]').length +1;
    const Html = `         
        <div class="userInput">
            <div>
                <label for="${value.value}-plan-${counter}">Add Entry ${counter} : </label>
                <input id="${value.value}-plan-${counter}" type="text" placeholder="Your plan...">
            </div>
     
            <div>
                <label for="${value.value}-calorie-${counter}">Calorie ${counter} : </label>
                <input id="${value.value}-calorie-${counter}" type="number" min="0" placeholder="Enter the calorie...">
            </div>
        </div><br>
    `;
    inputContainer.insertAdjacentHTML('beforeend',Html);
}
function cleanInputString(str){
    const regex = /[+-\s]/;
    return str.replace(regex ,'');
}
function isInvalidInput(str){
    const regex = /\d+e\d+/i;
    return str.match(regex);
}
function calculate(event){
    event.preventDefault();
    isError = false;
    const breakfastInput = document.querySelectorAll('#breakfast input[type="number"]');
    const lunchInput = document.querySelectorAll('#lunch input[type="number"]');
    const dinnerInput = document.querySelectorAll('#dinner input[type="number"]');
    const snacksInput = document.querySelectorAll('#snacks input[type="number"]');
    const exerciseInput = document.querySelectorAll('#exercise input[type="number"]');

    const breakfastCalories = getCaloriesFromInputs(breakfastInput);
    const lunchCalories = getCaloriesFromInputs(lunchInput);
    const dinnerCalories = getCaloriesFromInputs(dinnerInput);
    const snacksCalories = getCaloriesFromInputs(snacksInput);
    const exerciseCalories = getCaloriesFromInputs(exerciseInput);
    const budgetCalories = getCaloriesFromInputs([budgetValue]);

    if(isError){
        return;
    }
    result.classList.remove('hide');
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplurORdeficit = remainingCalories < 0 ? "Surplus":"Deficit";

    result.innerHTML = `
        <p>${Math.abs(remainingCalories)} Calorie ${surplurORdeficit}</p>
        <hr>
        <p>${budgetCalories} Calories Budgeted</p>
        <p>${consumedCalories} Calories Consumed</p>
        <p>${exerciseCalories} Calories Burned</p>
    `;
}
function getCaloriesFromInputs(list){
    let calories = 0;

    for(const item of list){
        const currVal = cleanInputString(item.value);
        const invalidInputMatch = isInvalidInput(currVal);
        if(invalidInputMatch){
            alert(`Invalid Input : ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }
        calories += Number(currVal);
    }
    return calories;
}
function clearData(){
    dataContainer.forEach((e)=>{
        e.innerHTML = "";
    })
    budgetValue.value = "";
    result.innerText = "";
    result.classList.add('hide');
}
addButton.addEventListener('click',addEntry);
clearList.addEventListener('click',clearData);
calorieCounter.addEventListener('submit',calculate);