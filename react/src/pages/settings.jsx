import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/appContext.jsx";
import "./settings.css";

const Settings = () => {
  const { theme, toggleTheme } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false); // State to control savings modal visibility
  const [showEligibilityModal, setShowEligibilityModal] = useState(false); // State to control eligibility modal visibility
  const [showIncomeTypeModal, setShowIncomeTypeModal] = useState(false); // State to control income type modal visibility
  const [savings, setSavings] = useState(null); // State to store calculated savings
  const [income, setIncome] = useState(""); // State to store user input for income
  const [percentage, setPercentage] = useState(""); // State to store user input for percentage
  const [warning, setWarning] = useState(""); // State to store warning message
  const [eligibility, setEligibility] = useState(""); // State to store eligibility selection
  const [incomeType, setIncomeType] = useState(""); // State to store selected income type

  const calculateSavings = () => {
    if (income && !isNaN(income) && percentage && !isNaN(percentage)) {
      if (percentage > 10) {
        setWarning("We recommend saving 10% or less of your income.");
      } else {
        const calculatedSavings = ((income * percentage) / 100).toFixed(2);
        setSavings(calculatedSavings); // Store the calculated savings
        setWarning(""); // Clear any previous warnings
      }
    } else {
      alert("Please enter valid numbers for both income and percentage.");
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the savings modal
    setSavings(null); // Reset savings
    setIncome(""); // Reset income input
    setPercentage(""); // Reset percentage input
    setWarning(""); // Reset warning message
  };

  const closeEligibilityModal = () => {
    setShowEligibilityModal(false); // Close the eligibility modal
    setEligibility(""); // Reset eligibility selection
  };

  const closeIncomeTypeModal = () => {
    setShowIncomeTypeModal(false); // Close the income type modal
    setIncomeType(""); // Reset income type selection
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-section">
        <h2 className="settings-subtitle">Appearance</h2>
        <button className="settings-button" onClick={toggleTheme}>
          Switch to {theme === "light-mode" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <div className="settings-section">
        <h2 className="settings-subtitle">Account</h2>
        <button className="settings-button">Change Password</button>
        <button className="settings-button">Delete Account</button>
      </div>

      <div className="settings-section">
        <h2 className="settings-subtitle">Financial Settings</h2>
        <div className="button-group">
          <button className="settings-button" onClick={() => setShowModal(true)}>
            Enter Monthly Income
          </button>
          <button className="settings-button" onClick={() => setShowEligibilityModal(true)}>
            Become Eligible
          </button>
          <button className="settings-button" onClick={() => setShowIncomeTypeModal(true)}>
            Income Type
          </button>
        </div>
      </div>

      {/* Modal for entering income and displaying savings */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Savings Calculator</h2>
            </div>
            <p className="modal-content">Enter your monthly income:</p>
            <input
              type="number"
              className="modal-input"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter income"
            />
            <p className="modal-content">Enter the percentage you want to save:</p>
            <input
              type="number"
              className="modal-input"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage"
            />
            <div className="modal-button-container">
              <button className="modal-calculate-button" onClick={calculateSavings}>
                Calculate
              </button>
            </div>

            {warning && (
              <div className="warning-box">
                <p>{warning}</p>
              </div>
            )}

            {savings && (
              <div className="savings-box">
                <p>
                  You can save <strong>${savings}</strong> per month.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for eligibility */}
      {showEligibilityModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Eligibility Check</h2>
            </div>
            <p className="modal-content">Select your skill level:</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="eligibility"
                  value="Beginner"
                  onChange={(e) => setEligibility(e.target.value)}
                />
                Beginner
              </label>
              <label>
                <input
                  type="radio"
                  name="eligibility"
                  value="Advanced"
                  onChange={(e) => setEligibility(e.target.value)}
                />
                Advanced
              </label>
            </div>
            <div className="modal-button-container">
              <button className="modal-close-button" onClick={closeEligibilityModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for income type */}
      {showIncomeTypeModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Income Type</h2>
            </div>
            <p className="modal-content">Select your income type:</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="incomeType"
                  value="Salary"
                  onChange={(e) => setIncomeType(e.target.value)}
                />
                Salary
              </label>
              <label>
                <input
                  type="radio"
                  name="incomeType"
                  value="Freelance"
                  onChange={(e) => setIncomeType(e.target.value)}
                />
                Freelance
              </label>
              <label>
                <input
                  type="radio"
                  name="incomeType"
                  value="Business"
                  onChange={(e) => setIncomeType(e.target.value)}
                />
                Business
              </label>
            </div>
            <div className="modal-button-container">
              <button className="modal-close-button" onClick={closeIncomeTypeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;