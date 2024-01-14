document.addEventListener('DOMContentLoaded', async () => {
    const transactionForm = document.getElementById('transactionForm');
    const transactionsContainer = document.getElementById('transactions');
  
    // Fetch and display transactions
    const fetchTransactions = async () => {
      const response = await fetch('/transactions');
      const transactions = await response.json();
      transactionsContainer.innerHTML = '<h2>Transactions</h2>';
      transactions.forEach(transaction => {
        const transactionElement = document.createElement('div');
        transactionElement.innerHTML = `<strong>${transaction.description}</strong>: ${transaction.amount} (${transaction.type})`;
        transactionsContainer.appendChild(transactionElement);
      });
    };
  
    // Handle form submission
    transactionForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const type = document.getElementById('type').value;
  
      // Validate input
      if (!description || isNaN(amount) || amount <= 0) {
        alert('Invalid input');
        return;
      }
  
      // Send data to the server
      const response = await fetch('/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, amount, type }),
      });
  
      if (response.ok) {
        // Refresh transactions
        fetchTransactions();
        // Clear the form
        transactionForm.reset();
      } else {
        alert('Failed to add transaction');
      }
    });
  
    // Initial fetch
    fetchTransactions();
  });
  