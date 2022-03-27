class Book {
    constructor(name, author, pages) {
        this._name = name;
        this._author = author;
        this._pages = pages;
        this._read = false;
    }
    get name() {
        return this._name;
    }
    get author() {
        return this._author;
    }
    get pages() {
        return this._pages;
    }
    get read() {
        return this._read;
    }
    toggleRead(status) {
        if (status) this._read = status;
        else this._read = !this._read;
    }
}

function addBookToLibrary(library, book) {
    if(!book) return;
    library.push(book);
    displayLibrary(library);
}


function displayLibrary(library) {
    const cardGrid = document.querySelector('.library');
    cardGrid.innerHTML = "";
    //loop through each book in library
    for(let book in library) {
        //create card
        let bookCard = document.createElement('div');
        bookCard.classList.add('card')
        
        //create book title inside card
        let title = document.createElement('p');
        title.textContent = `Title: ${library[book].name}`;
        bookCard.appendChild(title);

        //create book author inside card
        let author = document.createElement('p');
        author.textContent = `Author: ${library[book].author}`;
        bookCard.appendChild(author);

        //create book pages inside card
        let pages = document.createElement('p');
        pages.textContent = `Pages: ${library[book].pages}`;
        bookCard.appendChild(pages);

        //create book status inside card
        let status = document.createElement('p');
        library[book].read ? status.textContent = `Status: Read` : status.textContent = `Status: Unread` 
        bookCard.appendChild(status);

        let readButton = document.createElement('button');
        readButton.type = 'button'
        readButton.textContent = "Toggle Read"
        readButton.id = book;
        readButton.addEventListener('click', event => {
            myLibrary[event.target.id].toggleRead();
            displayLibrary(library);
        });

        let removeButton = document.createElement('button');
        removeButton.type = 'button'
        removeButton.textContent = "Remove"
        removeButton.id = book;
        removeButton.addEventListener('click', event => {
            myLibrary.splice(event.target.id,1);
            displayLibrary(library);
        });

        bookCard.appendChild(readButton);
        bookCard.appendChild(removeButton);

        //add card to page
        cardGrid.appendChild(bookCard);
    }
}

function validateForm(form) {
    if(form.elements['book-title'].value) {
        if (form.elements['book-author'].value) {
            if (form.elements['book-pages'].value > 0) {
                let newBook = new Book(form.elements['book-title'].value, form.elements['book-author'].value, form.elements['book-pages'].value);
                form.reset();
                return newBook;
            }
        }
    }
    return false;
}

//create initial state
let myLibrary = [];
const book1 = new Book('book1','author1','10');
const book2 = new Book('book2', 'author2', '20');
const book3 = new Book('book3', 'author3', '30');
displayLibrary(myLibrary);

//add new book button functionality
const newBookForm = document.forms[0];

const newBookButton = document.querySelector('#new-book-button')
newBookButton.addEventListener('click', event => {
    addBookToLibrary(myLibrary,validateForm(newBookForm));
});


