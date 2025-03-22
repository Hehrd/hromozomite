import React, { useState } from 'react';
import './subscriptionManager.css';

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newSubscriptionName, setNewSubscriptionName] = useState('');
  const [newSubscriptionCost, setNewSubscriptionCost] = useState('');
  const [showRemoveMenu, setShowRemoveMenu] = useState(false);
  const [subscriptionIndexToRemove, setSubscriptionIndexToRemove] = useState('');

  const handleRemoveSubscription = () => {
    if (subscriptionIndexToRemove && !isNaN(subscriptionIndexToRemove)) {
      const index = parseInt(subscriptionIndexToRemove, 10) - 1;
      if (index >= 0 && index < subscriptions.length) {
        removeSubscription(index);
        setShowRemoveMenu(false);
        setSubscriptionIndexToRemove('');
      } else {
        alert('Invalid subscription number.');
      }
    } else {
      alert('Please enter a valid subscription number.');
    }
  };

  const addSubscription = () => {
    if (newSubscriptionName && newSubscriptionCost && !isNaN(newSubscriptionCost)) {
      setSubscriptions([
        ...subscriptions,
        { name: newSubscriptionName, cost: parseFloat(newSubscriptionCost) },
      ]);
      setNewSubscriptionName('');
      setNewSubscriptionCost('');
      setShowAddMenu(false);
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
              setShowRemoveMenu(true);
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

      {showRemoveMenu && (
        <div className="remove-subscription-menu">
          <h2 className="menu-title">Remove a Subscription</h2>
          <input
            type="number"
            className="menu-input"
            placeholder={`Enter subscription number (1-${subscriptions.length})`}
            value={subscriptionIndexToRemove}
            onChange={(e) => setSubscriptionIndexToRemove(e.target.value)}
          />
          <button className="menu-button" onClick={handleRemoveSubscription}>
            Remove
          </button>
          <button className="menu-button" onClick={() => setShowRemoveMenu(false)}>
            Cancel
          </button>
        </div>
      )}

      <ul className="subscription-list">
        {subscriptions.map((subscription, index) => (
          <li key={index} className="subscription-item">
            <strong>Subscription #{index + 1}:</strong> {subscription.name}{' '}
            <span className="subscription-cost">
              - ${subscription.cost.toFixed(2)} per month
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionManager;
