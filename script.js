document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  if (query === '') return;

  fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      const results = document.getElementById('results');
      results.innerHTML = '';
      const books = data.docs.slice(0, 10);

      books.forEach(book => {
        const title = book.title || 'No title';
        const author = book.author_name ? book.author_name.join(', ') : 'Unknown author';
        const coverId = book.cover_i;
        const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/150x200?text=No+Cover';

        const card = `
          <div class="col-md-4">
            <div class="card book-card h-100 shadow-sm">
              <img src="${coverUrl}" class="card-img-top" alt="${title}" />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${title}</h5>
                <p class="card-text"><strong>Author:</strong> ${author}</p>
                <form method="POST" action="backend/save.php" class="mt-auto">
                  <input type="hidden" name="title" value="${title}">
                  <input type="hidden" name="author" value="${author}">
                  <button type="submit" class="btn btn-success w-100">Save Book</button>
                </form>
              </div>
            </div>
          </div>`;

        results.insertAdjacentHTML('beforeend', card);
      });
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
});
