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
    let categories = [];

    // Fetch categories from the Alpha Vantage API (Mocked for demonstration)
    async function fetchCategories() {
        try {
            // Mocking data for categories
            const data = {
                'Rank A: Real-Time Performance': {
                    'Food': 'Food Data',
                    'Transportation': 'Transportation Data',
                    'Utilities': 'Utilities Data',
                    'Entertainment': 'Entertainment Data'
                }
            };
            categories = Object.keys(data['Rank A: Real-Time Performance']);
            populateCategorySelect(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    function populateCategorySelect(categories) {
        expenseCategorySelect.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
    }

    fetchCategories();

    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const totalBudget = parseFloat(totalBudgetInput.value);

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

        // Check if all categories have been filled
        const filledCategories = Object.keys(actualExpenses);
        if (filledCategories.length === categories.length) {
            displayComparison();
            expenseForm.reset();
        }
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
        let totalDifference = 0;
        categories.forEach(category => {
            const idealAmount = idealPlan[category];
            const actualAmount = actualExpenses[category] || 0;
            const difference = actualAmount - idealAmount;
            totalDifference += difference;

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

        // Show main popup based on total difference after all categories filled
        setTimeout(() => {
            if (totalDifference <= 0) {
                showPopupMessage('Expenses are within budget!', '👍');
            } else {
                showPopupMessage('Expenses exceed budget!', '😟');
            }
        }, 500); // Adjust timing as needed
    }

    function showPopupMessage(text, emoji) {
        messageText.textContent = text;
        messageEmoji.textContent = emoji;
        messagePopup.classList.add('show');
        setTimeout(() => {
            messagePopup.classList.remove('show');
        }, 2000);
    }
});
