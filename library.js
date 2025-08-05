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

console.log(bookOne.info());