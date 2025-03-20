import React, { useState, useEffect } from "react";
import './transactions.css';

const categories = [
  "Food",
  "Entertainment",
  "Transport",
  "Health",
  "Shopping",
  "Utilities",
  "Education",
  "Rent",
  "Travel",
  "Others",
];

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "ascending" }); // Default to Date, Ascending
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const sortTransactions = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedTransactions = [...transactions].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setTransactions(sortedTransactions);
  };

  const filteredTransactions = selectedCategory
    ? transactions.filter(transaction => transaction.category === selectedCategory)
    : transactions;

  return (
    <section className="main-content">
      <div className="container">
        <h1>Transaction History</h1>
        <table id="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th onClick={() => sortTransactions("date")}>
                Date
                {sortConfig.key === "date" && (
                  <span className={`arrow ${sortConfig.direction === "ascending" ? "up" : "down"}`}></span>
                )}
              </th>
              <th onClick={() => sortTransactions("amount")}>
                Amount
                {sortConfig.key === "amount" && (
                  <span className={`arrow ${sortConfig.direction === "ascending" ? "up" : "down"}`}></span>
                )}
              </th>
              <th>
                Category
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-filter"
                >
                  <option value="">All</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionTable;
