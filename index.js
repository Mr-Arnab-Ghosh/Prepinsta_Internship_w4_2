console.log("This is js of our LMS");

// Book Constructor
function Book(name, publisher, author, printyr, type) {
    this.name = name;
    this.publisher = publisher;
    this.author = author;
    this.printyr = printyr;
    this.type = type;
}

// Display Constructor
function DisplayBooks() {}

// Add methods to display prototype
DisplayBooks.prototype.add = function(book) {
    console.log("Adding to UI");
    tablebody = document.getElementById('TableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.publisher}</td>
                        <td>${book.author}</td>
                        <td>${book.printyr}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tablebody.innerHTML += uiString;   // Append the new row to the end of the Table Body
}


// Implement the clear function
DisplayBooks.prototype.clear = function() {
    let libraryform = document.getElementById('BookForm');
    libraryform.reset();
}

// Implement the validate function
DisplayBooks.prototype.validate = function(book) {
    if  (book.name.length < 2 || book.publisher.length < 2 || book.author.length < 2 || book.printyr.length < 4) return false;  // Check for empty fields
    // else if (!this.isAlphabets(book.name) || !this.isAlphabets(book.publisher) || !this.isAlphabets(book.author)) return false;  // Check if Name contains only alphabets
    // else if (this.isAlphabets(book.printyr)) return false;  // Check if year is a number
    else return true;
}
// function isAlphabets(argument) {
//     var alphabets = /^[A-Za-z]+$/;
// }

// Implement the message popup function
DisplayBooks.prototype.show = function(type, displaymessage) {
    let message = document.getElementById('MessagePopUp');
    let boldText;
    if(type==='success') {
        boldText = 'Success';
    }
    else {
        boldText = 'Error!';
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText}:</strong> ${displaymessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = '';
    },  3000);
}

// Add submit event listener to BookForm
let bookForm = document.getElementById('BookForm');
bookForm.addEventListener('submit', bookFormSubmit);

// Function for handling the form submission
function bookFormSubmit(e) {
    
    // console.log('You have submitted a book form');
    
    let name = document.getElementById('bookName').value;
    let publisher = document.getElementById('publisherName').value;
    let author = document.getElementById('authorName').value;
    let printyr = document.getElementById('edition').value;
    let type = document.querySelector('input[name="type"]:checked').value;

    let book = new Book(name, publisher, author, printyr, type);
    console.log(book);

    let display = new DisplayBooks();
    if(display.validate(book)) {
        display.add(book);
        display.clear();     // clear fields after submitting
        display.show('success', 'Your book has been successfully added to library');
    }
    else {
        display.show('error', 'Sorry you cannot add this book');
    }

    e.preventDefault();   // prevent page from refreshing on submit
}