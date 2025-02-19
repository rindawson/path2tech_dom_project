document.getElementById('add-book-btn').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publisher = document.getElementById('publisher').value;


    if (!title || !author || !publisher) {
        alert('Please fill in all fields!');
        return;
    }


    const bookData = {
        title: title,
        author: author,
        publisher: publisher
    };


    // Post the new book data to the API
    fetch('https://bookstore-api-six.vercel.app/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Book added successfully:', data);
       
        const bookId = data.id; //


        // Create a new book entry with a Delete button
        const booksList = document.getElementById('books-list');
        const newBook = document.createElement('div');
        newBook.classList.add('book-item');
        newBook.innerHTML = `
            <p>${title}</p>
            <p>${author}</p>
            <p>${publisher}</p>
            <button class="red-button delete-btn">Delete</button>
        `;
       
        // Append the new book entry to the list
        booksList.appendChild(newBook);


        // Clear input fields after adding the book
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('publisher').value = '';




        newBook.querySelector('.delete-btn').addEventListener('click', function() {
            // Delete from the API using the book ID
            fetch(`https://bookstore-api-six.vercel.app/api/books/${bookId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                console.log('Deleted book:', data);
                booksList.removeChild(newBook);
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                alert('Error deleting book.');
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error adding the book.');
    });
});