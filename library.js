const myLibrary = [];

function Book(title, author, pages, read)
{
    if (!new.target)
    {
        throw Error("You must use the 'new' operator to call the constructor");  
    }
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    
    if (typeof(read) == "boolean")
    {
        this.read = read;
    }
    else {
        throw Error(`${read} is not a boolean`);
    }
    
    this.info = function()  {
        let message = `${title} by ${author}, ${pages}, `;
        message += (read) ? "read" : "not read yet";
        message += ` [ID: ${this.id}]`;
        return message;
    };
}

const bookOne = new Book("Fifa", "Jay Brown", 236, true);
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
const theFifa = new Book("Fifa", "Messi", 300, true);

function addBookToLibrary(book)
{
    myLibrary.push(book);
}

addBookToLibrary(bookOne);
addBookToLibrary(theHobbit);
addBookToLibrary(theFifa);

function getRandomColorRGB()
{
    return Math.floor(Math.random()* 255);
}

function getRandomNumRange(min, max)
{ 
    while ( true )
    {
        let num = Math.floor(Math.random() * max);
        if (num >= min)
        {
            return num;
        }
    }
}

const bookshelf = document.querySelector(".bookshelf");

for (let i = 1; i < 5; i++)
{
    const div = document.createElement("div");
    div.classList.add("bookshelf-row");
    div.setAttribute("id", `${i}`);

    bookshelf.appendChild(div);
}

const rows = document.querySelectorAll(".bookshelf-row");

let currentBookNum = 1;

displayBooks();

function displayBooks()
{
    let bookNum = 1;
    for (const book of myLibrary) 
    {
        createBook(book, rows[0], bookNum);
        ++bookNum;
    }
    currentBookNum = bookNum;
}

function displayNewBook(bookObject)
{
    createBook(bookObject, rows[0], currentBookNum);
    ++currentBookNum;
}


function createBook(bookObject, parent, bookNum)
{
    const div = document.createElement("div");
    div.classList.add("book");
    div.setAttribute("id", `${bookObject.id}`);
        
    let r = getRandomColorRGB();
    let g = getRandomColorRGB();
    let b = getRandomColorRGB();
    div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    let height = getRandomNumRange(75, 100);
    div.style.height = `${height}%`;

    parent.appendChild(div);

    createBookTitle(div, bookNum);
    createBookAuthor(bookObject, div);

    adjustTitleFont(bookObject, document.querySelector(`.title-${bookNum}`), bookNum);

}

function createBookTitle(parent, bookNum)
{
    const title = document.createElement("div");
    title.classList.add("book-title");
    title.classList.add(`title-${bookNum}`);

    parent.appendChild(title);
}

function createBookAuthor(bookObject, parent)
{
    const author = document.createElement("div");
    author.classList.add("book-author");
    author.textContent = `${bookObject.author}`;

    parent.appendChild(author);
}

function adjustTitleFont(bookObject, title, bookNum)
{
    let titleLetters = bookObject.title.split('');
    let size = titleLetters.length;
    let fontSize = (title.offsetHeight) / size;

    titleLetters.forEach(element=> {
        const letter = document.createElement("div");
        letter.classList.add(`letter-${bookNum}`);
        letter.textContent = `${element}`;
        letter.style.fontSize = `${fontSize}px`;
            
        title.appendChild(letter);
    });
}

const mascot = document.querySelector(".bookshelf > img");
const header = document.querySelector(".library-header");

const addBookWindow = document.querySelector("[closedby='any']");

const closeBtns = document.querySelectorAll(".close");
const confirmBtn = document.querySelector(".confirm");


mascot.addEventListener("click", () => {
    addBookWindow.showModal();
});

closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
    btn.parentElement.close();
    })
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    let inputTitle = document.querySelector("#book_title");
    let inputAuthor = document.querySelector("#book_author");
    let inputPageNum = document.querySelector("#book_pages");
    let inputRead = document.querySelector("#read");

    inputTitle.classList.remove("user-valid");
    inputTitle.classList.remove("user-invalid");

    inputAuthor.classList.remove("user-valid");
    inputAuthor.classList.remove("user-invalid");

    inputPageNum.classList.remove("user-valid");
    inputPageNum.classList.remove("user-invalid");

    if(validInputText(inputTitle.value))
    {
        inputTitle.classList.add("user-valid");
        
    }
    else
    {
        inputTitle.classList.add("user-invalid");
    }
    
    if(validInputText(inputAuthor.value))
    {
        inputAuthor.classList.add("user-valid");
    }
    else
    {
        inputAuthor.classList.add("user-invalid");
    }

    if(inputPageNum.value <= 0)
    {
        inputPageNum.classList.add("user-invalid");
    }
    else
    {
        inputPageNum.classList.add("user-valid");
    }

    let read = (inputRead.checked) ? true : false;

    if(validInputText(inputTitle.value) && validInputText(inputAuthor.value) && inputPageNum.value > 0)
    {
        const book = new Book(inputTitle.value, inputAuthor.value, inputPageNum.value, read);
        addBookToLibrary(book);
        displayNewBook(book);

        inputTitle.value = "";
        inputAuthor.value = "";
        inputPageNum.value = 1;

        inputTitle.classList.remove("user-valid");
        inputAuthor.classList.remove("user-valid");
        inputPageNum.classList.remove("user-valid");
    
        addBookWindow.close();
    }
    
});

function validInputText(text)
{
    return (text !== "") ? true : false;
}
