let totalBudget = document.getElementById("total-budget");
let userAmount = document.getElementById("user-amount");
const totalBudgetButton = document.getElementById("total-budget-button");
const checkExpenseButton = document.getElementById("check-expense-button")
const expenseTitle = document.getElementById("expense-title");
const budgetError = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productConstError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureAmount = document.getElementById("expenditure-amount");
const balanceAmount = document.getElementById("balance-amount");
const list = document.getElementById("list");
let allAmount = 0;

// Set budget session
totalBudgetButton.addEventListener("click", () => {
    allAmount = totalBudget.value;
    if (allAmount === "" || allAmount < 0) {
        budgetError.classList.remove("hide");
    } else {
        budgetError.classList.add("hide");
        //Set budget
        amount.innerHTML = allAmount;
        //Set balance
        balanceAmount.innerText = allAmount - expenditureAmount.innerText;
        //Clear input box
        totalBudget.value = "";
    }
});

//Function to disable edit or delete button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    })
}

//Function to modify list elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceAmount.innerText;
    let currentExpense = expenditureAmount.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        expenseTitle.value = parentText
        userAmount.value = parentAmount
        disableButtons(true);
    }
    balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);    
    expenditureAmount.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
}

//function to create list
const listCreator = (expenseName, expenseValue) =>{
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "outputContainer")
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class"amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-regular fa-pen-to-square","edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () =>{
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid fa-trash","delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () =>{
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton)
    sublistContent.appendChild(deleteButton)
    document.getElementById("list").appendChild(sublistContent);
}
//Function to add expense
checkExpenseButton.addEventListener("click", () => {
    
    if (!userAmount.value || !expenseTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    disableButtons(false);
    let expenditure = parseInt(userAmount.value);
    let sum = parseInt(expenditureAmount.innerText) + expenditure;
    expenditureAmount.innerText = sum;
    const totalBalance = allAmount -sum;
    balanceAmount.innerText = totalBalance;
    listCreator(expenseTitle.value, userAmount.value);
    expenseTitle.value = "";
    userAmount.value = "";
});