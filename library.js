const bookList = document.querySelector(".books");
const addBookButton = document.querySelector("#addBook");
const bookDialog = document.querySelector("#bookDialog");
const bookForm = document.querySelector("#add-book-form");
const closeFormButton = document.querySelector("#closeDialog");

let booksArray = [];

function Book(name, author){
    this.name = name;
    this.author = author;
    this.libIndex = booksArray.length;

    // function readBook(){
    //     const bookElement = document.querySelector(`.book[data-lib-index='${this.libIndex}']`);
    //     if(bookElement){
    //         booksArray.filter(book => book.libIndex !== this.libIndex);
    //         bookElement.remove();
    //     }
    // }
}

function addBook(name, author){
    if(name && author) {
        let bookToAdd = new Book(name, author);
        booksArray.push(bookToAdd);

        //Create the item
        let bookElement = document.createElement("li");
        bookElement.classList.add("book");
        bookElement.dataset.libIndex = bookToAdd.libIndex;

        let contentChildElement = document.createElement("div");
        contentChildElement.classList.add("content");

        let bookName = document.createElement("p");
        bookName.classList.add("bookname");
        bookName.textContent = `${name} by ${author}`;

        let readButton = document.createElement("button");
        readButton.id = "read";
        readButton.textContent = "Read";
        readButton.addEventListener("click", (event) => {
            let grandParentBookElement = event.target.parentNode.parentNode;
            booksArray.filter(book => book.libIndex !== grandParentBookElement.dataset.libIndex);
            grandParentBookElement.remove();
        });

        contentChildElement.appendChild(bookName);
        contentChildElement.appendChild(readButton);
        bookElement.appendChild(contentChildElement);
        bookList.appendChild(bookElement);
    }
}


addBookButton.addEventListener('click', () => {
    bookDialog.showModal();
});
closeFormButton.addEventListener('click', () => {
    bookDialog.close();
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const bookName = document.querySelector("#book-name").value;
    const authorName = document.querySelector("#author-name").value;

    if(bookName && authorName){
        addBook(bookName, authorName);
    }

    bookForm.reset();
    bookDialog.close();
})