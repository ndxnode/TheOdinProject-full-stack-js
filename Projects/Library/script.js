const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}


function displayBooks() {
    const bookList = document.getElementById('bookList'); // Get the list element
    bookList.innerHTML = ''; // Clear the list before displaying

    // Create a container for the grid
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    gridContainer.style.gap = '20px';
    gridContainer.style.maxWidth = '800px'; // Adjust this value to control the maximum width of the grid
    gridContainer.style.margin = '0 auto'; // Center the grid

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        
        // Create a card for each book
        const card = document.createElement('div');
        card.style.border = '1px solid #ccc';
        card.style.borderRadius = '5px';
        card.style.padding = '10px';
        card.style.backgroundColor = '#f9f9f9';

        // Add book details to the card
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        `;

        // Add the card to the grid container
        gridContainer.appendChild(card);
    }

    // Add the grid container to the book list
    bookList.appendChild(gridContainer);
}


// Wrap your code in a DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
    // dialog modal
    const dialog = document.querySelector('dialog');
    const showButton = document.querySelector("#addBtn");
    const closeButton = document.querySelector("dialog button");
    const submitButton = document.querySelector("#submitBtn");
    
    console.log('Submit Button:', submitButton); // Check if the button is found

    // Show the dialog
    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    // Close the dialog
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    // Submit Button
    if (submitButton) { // Check if submitButton is not null
        submitButton.addEventListener("click", (event) => { // Added event parameter
            // Prevent the default form submission
            event.preventDefault();

            // Get form values
            const title = document.getElementById('title').value;
            console.log('Title:', title);

            const author = document.getElementById('author').value;
            console.log('Author:', author);

            const pages = parseInt(document.getElementById('pages').value);
            console.log('Pages:', pages);

            const hasRead = document.getElementById('hasRead').checked;
            console.log('Has Read:', hasRead);

            // Create a new Book object
            const newBook = new Book(title, author, pages, hasRead);

            // Add the new book to the library
            addBookToLibrary(newBook);

            // Display the updated library
            displayBooks();

            // Clear the form
            document.getElementById('form').reset();

            // Close the dialog
            dialog.close();

            console.log('New book added:', newBook.title);
        });
    } else {
        console.error("Submit button not found!");
    }
});