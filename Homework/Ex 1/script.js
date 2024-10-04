// Array to store menu items
const menuItems = {
    drinks: [],
    sandwiches: []
};

// Select elements
const addItemBtn = document.getElementById('add-item-btn');
const addItemModal = document.getElementById('add-item-modal');
const addItemForm = document.getElementById('add-item-form');
const cancelBtn = document.getElementById('cancel-btn');
const drinksMenu = document.getElementById('drinks-menu');
const sandwichesMenu = document.getElementById('sandwiches-menu');
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
    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const photoFile = photoInput.files[0];



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

// Function to update the menu display
function updateMenuDisplay() {
    drinksMenu.innerHTML = '';
    sandwichesMenu.innerHTML = '';

    menuItems.drinks.forEach(item => {
        const itemElement = createMenuItemElement(item);
        drinksMenu.appendChild(itemElement);
    });

    menuItems.sandwiches.forEach(item => {
        const itemElement = createMenuItemElement(item);
        sandwichesMenu.appendChild(itemElement);
    });
}

// Function to create a menu item element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `
        <img src="${item.photo}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <strong>$${item.price}</strong>
    `;
    return div;
}

// Function to create a menu item element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `
        <img src="${item.photo}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <strong>$${item.price}</strong>
        <button class="order-btn">Order</button>
    `;

    // Handle the Order button click
    const orderButton = div.querySelector('.order-btn');


    return div;
}
