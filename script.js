let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

const input = document.getElementById("itemInput");
const priceInput = document.getElementById("itemPrice");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("list");

const totalItemsDisplay = document.getElementById("totalItems");
const totalPriceDisplay = document.getElementById("totalPrice");

// Render items
function renderList() {
  list.innerHTML = "";

  let totalPrice = 0;

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = `Ksh ${item.price}`;
    price.classList.add("price");

    // CHECKBOX
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.purchased;

    checkbox.addEventListener("change", () => {
      items[index].purchased = checkbox.checked;
      saveAndRender();
    });

    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.append(" Mark as purchased");

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      items.splice(index, 1);
      saveAndRender();
    });

    // STYLE IF PURCHASED
    if (item.purchased) {
      title.classList.add("purchased");
      totalPrice += item.price;
    }

    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(label);
    card.appendChild(deleteBtn);

    list.appendChild(card);
  });

  // UPDATE TOTALS
  totalItemsDisplay.textContent = items.length;
  totalPriceDisplay.textContent = totalPrice;
}

// Add item
addBtn.addEventListener("click", () => {
  const name = input.value.trim();
  const price = Number(priceInput.value);

  if (!name || !price) {
    alert("Please enter item and price");
    return;
  }

  items.push({
    name,
    price,
    purchased: false
  });

  input.value = "";
  priceInput.value = "";

  saveAndRender();
});

// Clear list
clearBtn.addEventListener("click", () => {
  items = [];
  saveAndRender();
});

// Save + render
function saveAndRender() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
  renderList();
}

// Load
renderList();