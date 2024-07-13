document.addEventListener('DOMContentLoaded', () => {
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const totalBudgetInput = document.getElementById('total-budget');
    const expenseCategorySelect = document.getElementById('expense-category');
    const expenseAmountInput = document.getElementById('expense-amount');
    const idealPlanSection = document.getElementById('ideal-plan-section');
    const addExpenseSection = document.getElementById('add-expense-section');
    const budgetComparisonSection = document.getElementById('budget-comparison-section');
    const idealPlanTable = document.getElementById('ideal-plan');
    const comparisonList = document.getElementById('comparison-list');
    const messagePopup = document.getElementById('message-popup');
    const messageText = document.querySelector('#message-popup .message');
    const messageEmoji = document.querySelector('#message-popup .emoji');

    let idealPlan = {};
    let actualExpenses = {};
    let totalBudget = 0;

    // Mock categories (replace with actual categories if known)
    const categories = ['Food', 'Transportation', 'Utilities', 'Entertainment'];

    // Populate category select
    populateCategorySelect(categories);

    function populateCategorySelect(categories) {
        expenseCategorySelect.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
    }

    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        totalBudget = parseFloat(totalBudgetInput.value);

        // Generate ideal plan
        idealPlan = {};
        categories.forEach(category => {
            idealPlan[category] = totalBudget / categories.length;
        });

        displayIdealPlan();
        idealPlanSection.style.display = 'block';
        addExpenseSection.style.display = 'block';
        budgetComparisonSection.style.display = 'block';
    });

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const expenseCategory = expenseCategorySelect.value;
        const expenseAmount = parseFloat(expenseAmountInput.value);

        if (!actualExpenses[expenseCategory]) {
            actualExpenses[expenseCategory] = 0;
        }
        actualExpenses[expenseCategory] += expenseAmount;

        displayComparison();
        expenseForm.reset();
    });

    function displayIdealPlan() {
        idealPlanTable.innerHTML = '';
        categories.forEach(category => {
            const row = document.createElement('tr');
            const categoryCell = document.createElement('td');
            categoryCell.textContent = category;
            const amountCell = document.createElement('td');
            amountCell.textContent = idealPlan[category].toFixed(2);
            row.appendChild(categoryCell);
            row.appendChild(amountCell);
            idealPlanTable.appendChild(row);
        });
    }

    function displayComparison() {
        comparisonList.innerHTML = '';
        categories.forEach(category => {
            const idealAmount = idealPlan[category];
            const actualAmount = actualExpenses[category] || 0;
            const difference = actualAmount - idealAmount;

            const row = document.createElement('tr');
            const categoryCell = document.createElement('td');
            categoryCell.textContent = category;
            const idealAmountCell = document.createElement('td');
            idealAmountCell.textContent = idealAmount.toFixed(2);
            const actualAmountCell = document.createElement('td');
            actualAmountCell.textContent = actualAmount.toFixed(2);
            const differenceCell = document.createElement('td');
            differenceCell.textContent = difference.toFixed(2);
            row.appendChild(categoryCell);
            row.appendChild(idealAmountCell);
            row.appendChild(actualAmountCell);
            row.appendChild(differenceCell);
            comparisonList.appendChild(row);
        });
        showPopupMessage();
    }

    function showPopupMessage() {
        const totalExpenses = Object.values(actualExpenses).reduce((acc, expense) => acc + expense, 0);
        if (totalExpenses <= totalBudget) {
            messageText.textContent = 'Great! You are still under your budget, good work! 🎉';
            messageEmoji.textContent = '😊';
        } else {
            messageText.textContent = 'Oh no! You have exceeded your budget, try to save more! 💸';
            messageEmoji.textContent = '😟';
        }
        messagePopup.classList.add('show');
        setTimeout(() => {
            messagePopup.classList.remove('show');
        }, 2000);
    }
});
