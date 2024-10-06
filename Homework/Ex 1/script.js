// Array to store menu items by category
const menuItems = {
    drinks: [],
    sandwiches: []
};

// Cart array to store ordered items
const cart = [];

// Select elements
const addItemBtn = document.getElementById('add-item-btn');
const addItemModal = document.getElementById('add-item-modal');
const addItemForm = document.getElementById('add-item-form');
const cancelBtn = document.getElementById('cancel-btn');
const drinksMenu = document.getElementById('drinks-menu');
const sandwichesMenu = document.getElementById('sandwiches-menu');
const cartContainer = document.getElementById('cart-container');
const cartTotal = document.getElementById('cart-total');
const categorySelect = document.getElementById('category');
const newCategoryInput = document.getElementById('new-category-name');
const existingCategoryRadio = document.getElementById('existing-category');
const newCategoryRadio = document.getElementById('new-category');
const photoInput = document.getElementById('photo');
const fileNameDisplay = document.getElementById('file-name');

// Show modal when + button is clicked
addItemBtn.addEventListener('click', () => {
    addItemModal.style.display = 'flex';
});

// Hide modal when cancel button is clicked
cancelBtn.addEventListener('click', () => {
    addItemModal.style.display = 'none';
});

// Enable or disable the new category input based on radio button selection
existingCategoryRadio.addEventListener('change', () => {
    newCategoryInput.disabled = true;
    categorySelect.disabled = false;
});

newCategoryRadio.addEventListener('change', () => {
    newCategoryInput.disabled = false;
    categorySelect.disabled = true;
});

// Display the selected file name when the user selects an image
photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    if (file) {
        fileNameDisplay.textContent = `Selected file: ${file.name}`;
    } else {
        fileNameDisplay.textContent = '';
    }
});

// Add item to menu on form submit
addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const isExistingCategory = document.querySelector('input[name="category-type"]:checked').value === 'existing';
    const category = isExistingCategory ? categorySelect.value : newCategoryInput.value.trim();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const description = document.getElementById('description').value;
    const photoFile = photoInput.files[0];

    // Check if the category already exists, if not, create a new section
    if (!menuItems[category]) {
        menuItems[category] = [];
        createNewCategorySection(category);
        addCategoryToSelect(category);
    }

    // Convert the selected file to a URL that can be used in the img tag
    const reader = new FileReader();
    reader.onload = function(event) {
        const photoURL = event.target.result;

        // Create new item object
        const newItem = {
            name,
            price,
            description,
            photo: photoURL
        };

        // Add item to the correct category in the array
        menuItems[category].push(newItem);

        // Update menu display
        updateMenuDisplay();

        // Reset form and hide modal
        addItemForm.reset();
        fileNameDisplay.textContent = ''; // Reset file name display
        addItemModal.style.display = 'none';
    };

    // Read the image file as a data URL
    reader.readAsDataURL(photoFile);
});

// Function to create a new category section in the DOM
function createNewCategorySection(category) {
    const menuContainer = document.getElementById('menu-container');
    const newCategoryTitle = document.createElement('h2');
    newCategoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    const newCategoryMenu = document.createElement('div');
    newCategoryMenu.id = `${category}-menu`;
    newCategoryMenu.classList.add('menu-category');
    menuContainer.appendChild(newCategoryTitle);
    menuContainer.appendChild(newCategoryMenu);
}

// Function to add the new category to the select dropdown for future use
function addCategoryToSelect(category) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
}

// Function to update the menu display
function updateMenuDisplay() {
    Object.keys(menuItems).forEach(category => {
        const categoryMenu = document.getElementById(`${category}-menu`);
        categoryMenu.innerHTML = '';

        menuItems[category].forEach(item => {
            const itemElement = createMenuItemElement(item, category);
            categoryMenu.appendChild(itemElement);
        });
    });
}

// Function to create a menu item element with the "Order" button
function createMenuItemElement(item, category) {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `
        <img src="${item.photo}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <strong>$${item.price.toFixed(2)}</strong>
        <button class="order-btn">Order</button>
    `;

    // Handle the Order button click
    const orderButton = div.querySelector('.order-btn');
    orderButton.addEventListener('click', () => {
        addToCart(item);
    });

    return div;
}

// Function to add item to the cart
function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        // Handle the remove button
        cartItem.querySelector('.remove-btn').addEventListener('click', () => {
            removeFromCart(index);
        });

        cartContainer.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}
