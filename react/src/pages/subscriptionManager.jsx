import React, { useState } from 'react';
import './subscriptionManager.css';

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]); // State to store subscriptions
  const [showAddMenu, setShowAddMenu] = useState(false); // State to control add subscription menu visibility
  const [newSubscriptionName, setNewSubscriptionName] = useState(''); // State for subscription name input
  const [newSubscriptionCost, setNewSubscriptionCost] = useState(''); // State for subscription cost input

  const addSubscription = () => {
    if (newSubscriptionName && newSubscriptionCost && !isNaN(newSubscriptionCost)) {
      setSubscriptions([
        ...subscriptions,
        { name: newSubscriptionName, cost: parseFloat(newSubscriptionCost) },
      ]);
      setNewSubscriptionName(''); // Reset input fields
      setNewSubscriptionCost('');
      setShowAddMenu(false); // Close the add menu
    } else {
      alert('Please enter a valid subscription name and cost.');
    }
  };

  const removeSubscription = (index) => {
    const updatedSubscriptions = subscriptions.filter((_, i) => i !== index);
    setSubscriptions(updatedSubscriptions);
  };

  return (
    <div className="subscription-manager-container">
      <h1 className="subscription-title">Subscription Manager</h1>
      <p className="subscription-count">Total Subscriptions: {subscriptions.length}</p>

      <div className="subscription-actions">
        <button className="subscription-button" onClick={() => setShowAddMenu(true)}>
          Add Subscription
        </button>
        <button
          className="subscription-button"
          onClick={() => {
            if (subscriptions.length > 0) {
              const indexToRemove = prompt(
                `Enter the number (1-${subscriptions.length}) of the subscription to remove:`
              );
              if (indexToRemove && !isNaN(indexToRemove)) {
                const index = parseInt(indexToRemove, 10) - 1;
                if (index >= 0 && index < subscriptions.length) {
                  removeSubscription(index);
                } else {
                  alert('Invalid subscription number.');
                }
              }
            } else {
              alert('No subscriptions to remove.');
            }
          }}
        >
          Remove Subscription
        </button>
      </div>

      {showAddMenu && (
        <div className="add-subscription-menu">
          <h2 className="menu-title">Add a Subscription</h2>
          <input
            type="text"
            className="menu-input"
            placeholder="Subscription Name"
            value={newSubscriptionName}
            onChange={(e) => setNewSubscriptionName(e.target.value)}
          />
          <input
            type="number"
            className="menu-input"
            placeholder="Subscription Cost"
            value={newSubscriptionCost}
            onChange={(e) => setNewSubscriptionCost(e.target.value)}
          />
          <button className="menu-button" onClick={addSubscription}>
            Add
          </button>
          <button className="menu-button" onClick={() => setShowAddMenu(false)}>
            Cancel
          </button>
        </div>
      )}

      <ul className="subscription-list">
        {subscriptions.map((subscription, index) => (
          <li key={index} className="subscription-item">
            <strong>Subscription #{index + 1}:</strong> {subscription.name}  
            <span className="subscription-cost"> - ${subscription.cost.toFixed(2)} per month</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionManager;