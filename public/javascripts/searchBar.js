document.querySelector('.search-bar form').addEventListener('submit', function(event) {
    event.preventDefault();

    let searchTerm = document.querySelector('.search-bar input').value;

    if (!searchTerm.trim()) {
        searchTerm = 'all';
    }

    fetch(`/catalog/books?search=${searchTerm}`)
        .then(response => response.json())
        .then(filteredBooks => {
            let bookList = document.querySelector('.book-list');
            bookList.innerHTML = '';

            filteredBooks.forEach(book => {
                let listItem = document.createElement('li');
                let link = document.createElement('a');
                link.href = `/catalog/book/${book._id}`;
                link.textContent = book.title;
                listItem.appendChild(link);
                listItem.appendChild(document.createTextNode(` (${book.author.name})`));
                bookList.appendChild(listItem);
            });
        });
});
