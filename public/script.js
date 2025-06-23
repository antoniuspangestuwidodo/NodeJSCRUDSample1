// Redirect if not logged in
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/login.html';
}

// Show message helper
function showMessage(text, type = 'success') {
  const el = document.getElementById('message');
  el.textContent = text;
  el.className = type === 'success' ? 'text-green-600' : 'text-red-600';
}

// Logout
function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
}

// Fetch and display items
async function loadItems() {
  try {
    const res = await fetch('/api/items', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const items = await res.json();

    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'bg-white p-3 rounded shadow flex justify-between items-center';
      li.innerHTML = `
        <span>${item.name}</span>
        <button onclick="deleteItem('${item._id}')" class="text-red-500">Delete</button>
      `;
      itemList.appendChild(li);
    });

  } catch (err) {
    showMessage('Failed to load items', 'error');
  }
}

// Add item
const itemForm = document.getElementById('itemForm');
itemForm.onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  if (!name) return showMessage('Name required', 'error');

  try {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (res.ok) {
      document.getElementById('name').value = '';
      showMessage('Item added!');
      loadItems();
    } else {
      showMessage('Failed to add item', 'error');
    }

  } catch (err) {
    showMessage('Error adding item', 'error');
  }
};

// Delete item
async function deleteItem(id) {
  try {
    const res = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      showMessage('Item deleted');
      loadItems();
    } else {
      showMessage('Failed to delete item', 'error');
    }

  } catch (err) {
    showMessage('Error deleting item', 'error');
  }
}

// Initial load
loadItems();
