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
const theFifa = new Book("FIFA", "Messi", 300, true);


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
        if (num > min)
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


for (const book of myLibrary) {
    const div = document.createElement("div");
    div.classList.add("book");
    div.setAttribute("id", `${book.id}`);
    
    let r = getRandomColorRGB();
    let g = getRandomColorRGB();
    let b = getRandomColorRGB();
    div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    
    
    rows[0].appendChild(div);
}

console.log(getRandomNumRange(9,56));