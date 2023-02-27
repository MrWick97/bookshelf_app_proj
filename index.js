window.addEventListener('load', () => {

    // Create a new instance of the Bookshelf
    const bookshelf = new Bookshelf(bookData);
    let bookInfo = document.getElementById("book-info");

    function bookContent(book) {
        var div = document.createElement("div")
        div.classList.add("Book")
        div.setAttribute("id", book.id) // we add an id because that's how we'll match the comments to the books (there's nothing about sorting in the requirements ... but you initially had a sort function ... so you can't rely on indices once you do that)
        var comments = "<ul>"
        if(book.comments){
            comments += book.comments.map((c) => `<li>${c}</li>`).join("")
        }
        comments += "</ul>"
        div.innerHTML = `
            <div>Name: ${book.author}</div>
            <div>Language: ${book.language}</div>
            <div>Subject: ${book.subject}</div>
            <div>Title: ${book.title}</div>
            <div class="Comments">
                <h3>Comments<h3>
                ${comments}
                <button id="comment_button_${book.id}" class="commentButton">Add Comment</button>
                <form id="comment_${book.id}" style="display: none;">
                    <label form="comment_message"></label>
                    <input name="comment_message" maxlength="280">
                    <input type="submit" class="comment_submit" value="Send"></input>
                </form>
            </div>
            `
        return div
    }

    function appendBook(book, prepend) {
        var div = bookContent(book)
        // this was turned into an element with divs because you want to be able to style this stuff via CSS (which you can't do if it's just strings and you're relying on <br/>'s to create vertical spacing)
        // we extract this to another function so we can use it in updateBookWithComment below
        if(prepend){
            bookInfo.prepend(div)
        } else {
            bookInfo.append(div);
        }
    }

    function updateBookWithComment(id, comment) {
        var book = bookshelf.books.filter((b) => b.id == id)[0]
        if(book.comments){
            book.comments.push(comment)
        } else {
            book.comments = [comment]
        }
        document.getElementById(id).replaceWith(bookContent(book))
    }

    bookshelf.books.forEach((book) => {
        appendBook(book, false);
    });

    document.getElementById("book-form").addEventListener("submit", (e)=> {
        e.preventDefault(); // this is what prevents the form from 'submitting' as it normally would (which would trigger a page reload)
        var author = document.getElementById("book_author").value;
        var language = document.getElementById("book_language").value;
        var subject = document.getElementById("book_subjects").value.split(";"); // your data has multiple subjects; you should probably rename the field to 'subjects'
        var title = document.getElementById("book_title").value;
        var book = {author: author, language: language, subject: subject, title: title, comments: []}
        book = bookshelf.addbook(book); // this returns the book with an ID, which we need to append the book

        appendBook(book, true); // here we prepend it to the div so you can see it added

        document.querySelector("form").reset();
    });

    document.addEventListener("click", (e) => {
        if(e.target.classList.contains("commentButton")){
            e.target.closest("div").querySelector("form").style.display = "block";
        }
        if(e.target.classList.contains("comment_submit")){
            e.preventDefault()
            var form = e.target.closest("form")
            var bookId = form.id.split("comment_")[1]
            var comment = form.querySelector("input").value
            updateBookWithComment(bookId, comment)
        }
    })
})
