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
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "ascending" });
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredTransactions = selectedCategory
    ? transactions.filter(transaction => transaction.category === selectedCategory)
    : transactions;

  return (
    <section className="main-content">
      <div className="container">
        <h1>Transaction History</h1>
        <div className="transaction-table">
          {/* Header Row */}
          <div className="table-header">
            <div className="table-row">
              <div className="table-cell" onClick={() => sortTransactions("description")}>
                <span>Name</span>
                {sortConfig.key === "description" && (
                  <span className={`arrow ${sortConfig.direction === "ascending" ? "up" : "down"}`}></span>
                )}
              </div>
              <div className="table-cell" onClick={() => sortTransactions("date")}>
                <span>Date</span>
                {sortConfig.key === "date" && (
                  <span className={`arrow ${sortConfig.direction === "ascending" ? "up" : "down"}`}></span>
                )}
              </div>
              <div className="table-cell" onClick={() => sortTransactions("amount")}>
                <span>Amount</span>
                {sortConfig.key === "amount" && (
                  <span className={`arrow ${sortConfig.direction === "ascending" ? "up" : "down"}`}></span>
                )}
              </div>
              <div className="table-cell" onClick={() => sortTransactions("category")}>
                {sortConfig.key === "category" && (
                  <span className={`arrow ${sortConfig.direction === "ascending" ? "up" : "down"}`}></span>
                )}
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onClick={(e) => e.stopPropagation()} // Prevents sort when clicking on the select
                  onChange={handleCategoryChange}
                  className="category-filter"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Body Rows */}
          <div className="table-body">
            {filteredTransactions.map(transaction => (
              <div className="table-row" key={transaction.id}>
                <div className="table-cell">{transaction.description}</div>
                <div className="table-cell">{transaction.date}</div>
                <div className="table-cell">{transaction.amount}</div>
                <div className="table-cell">{transaction.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionTable;
