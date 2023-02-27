class Bookshelf {
    constructor(bookData) {
        this.books = [];
        this.nextId = 0;
        this.importBooks(bookData);
    }

    importBooks(bookData){
        bookData.forEach((book) => this.addbook(book) )
    }

    addbook(book) {
        book["id"] = this.nextId;
        this.nextId += 1;
        this.books.push(book);

        return book
    }
}
