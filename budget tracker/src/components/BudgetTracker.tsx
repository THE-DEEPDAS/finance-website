import React, { useState, useEffect } from 'react';
import '../styles.css';
import AddCategory from './AddCategory';

const BudgetTracker: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(['Food', 'Transportation', 'Utilities', 'Entertainment']);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [idealPlan, setIdealPlan] = useState<{ [key: string]: number }>({});
  const [actualExpenses, setActualExpenses] = useState<{ [key: string]: number }>({});
  const [expenseCategory, setExpenseCategory] = useState<string>(categories[0]);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseMessage, setExpenseMessage] = useState<string>('');

  const handleAddCategory = (newCategory: string) => {
    setCategories([...categories, newCategory]);
    // Automatically set the new category as the current expense category
    setExpenseCategory(newCategory);
  };

  const handleBudgetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newIdealPlan = categories.reduce((acc, category) => {
      acc[category] = totalBudget / categories.length;
      return acc;
    }, {} as { [key: string]: number });
    setIdealPlan(newIdealPlan);
  };

  const handleExpenseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActualExpenses((prevExpenses) => {
      const newExpenses = { ...prevExpenses };
      if (!newExpenses[expenseCategory]) {
        newExpenses[expenseCategory] = 0;
      }
      newExpenses[expenseCategory] += expenseAmount;
      return newExpenses;
    });
    setExpenseAmount(0);

    // Display budget status message
    displayBudgetStatusMessage();
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExpenseCategory(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseAmount(parseFloat(event.target.value));
  };

  const displayBudgetStatusMessage = () => {
    const totalExpenses = Object.values(actualExpenses).reduce((acc, expense) => acc + expense, 0);
    const message = totalExpenses <= totalBudget
      ? 'Great! You are still under your budget, good work! 🎉'
      : 'Oh no! You have exceeded your budget, try to save more! 💸';
    setExpenseMessage(message);
  };

  useEffect(() => {
    console.log('Categories updated:', categories);
  }, [categories]);

  useEffect(() => {
    console.log('Ideal plan updated:', idealPlan);
  }, [idealPlan]);

  useEffect(() => {
    console.log('Actual expenses updated:', actualExpenses);
  }, [actualExpenses]);

  return (
    <div>
      <header>
        <h1>Budget Tracker</h1>
      </header>
      <main>
        <section className="budget-input">
          <h2>Set Your Budget</h2>
          <form onSubmit={handleBudgetSubmit}>
            <label htmlFor="total-budget">Total Budget:</label>
            <input
              type="number"
              id="total-budget"
              value={totalBudget}
              onChange={(e) => setTotalBudget(parseFloat(e.target.value))}
              required
            />
            <button type="submit">Set Budget</button>
          </form>
        </section>

        {Object.keys(idealPlan).length > 0 && (
          <>
            <section className="ideal-plan">
              <h2>Ideal Plan</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>{idealPlan[category]?.toFixed(2) || '0.00'}</td>
                      {/* Use optional chaining to safely access toFixed() */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="add-expense">
              <h2>Add Expense</h2>
              <form onSubmit={handleExpenseSubmit}>
                <label htmlFor="expense-category">Category:</label>
                <select
                  id="expense-category"
                  value={expenseCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <label htmlFor="expense-amount">Amount:</label>
                <input
                  type="number"
                  id="expense-amount"
                  value={expenseAmount}
                  onChange={handleAmountChange}
                  required
                />
                <button type="submit">Add Expense</button>
              </form>
              {expenseMessage && <p>{expenseMessage}</p>}
            </section>

            <AddCategory onCategoryAdd={handleAddCategory} />

            <section className="budget-comparison">
              <h2>Budget Comparison</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Ideal Amount</th>
                    <th>Actual Amount</th>
                    <th>Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => {
                    const idealAmount = idealPlan[category] || 0;
                    const actualAmount = actualExpenses[category] || 0;
                    const difference = actualAmount - idealAmount;
                    return (
                      <tr key={category}>
                        <td>{category}</td>
                        <td>{idealAmount.toFixed(2)}</td>
                        <td>{actualAmount.toFixed(2)}</td>
                        <td>{difference.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default BudgetTracker;
