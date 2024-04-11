const listElement = document.getElementById('list');
const showPanel = document.getElementById('show-panel');

// Load books on page load
fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then(books => {
    books.forEach(book => {
      const listItem = document.createElement('li');
      listItem.textContent = book.title;
      listItem.addEventListener('click', () => showBookDetails(book.id));
      listElement.appendChild(listItem);
    });
  });

// Function to show book details
function showBookDetails(bookId) {
  fetch(`http://localhost:3000/books/${bookId}`)
    .then(response => response.json())
    .then(book => {
      showPanel.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.thumbnail}" alt="${book.title} Thumbnail">
        <p>${book.description}</p>
        <h3>Liked by:</h3>
        <ul id="liked-by-list">
          ${book.users.map(user => `<li>${user.username}</li>`).join('')}
        </ul>
        <button id="like-button" data-book-id="${book.id}">LIKE</button>
      `;

      // Add event listener to like button
      document.getElementById('like-button').addEventListener('click', () => likeBook(bookId));
    });
}

// Function to like/unlike a book
function likeBook(bookId) {
  const likeButton = document.getElementById('like-button');
  const likedByList = document.getElementById('liked-by-list');
  const myUserId = 1; // Replace with logic to get your actual user ID
  const myUsername = "pouros";

  fetch(`http://localhost:3000/books/${bookId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      users: updatedUsers // You'll need to modify updatedUsers below 
    })
  })
    .then(() => {
      if (likeButton.textContent === 'LIKE') {
        // Add user to the list
        const newLikeItem = document.createElement('li');
        newLikeItem.textContent = myUsername;
        likedByList.appendChild(newLikeItem);
        likeButton.textContent = 'UNLIKE';
      } else {
        // Remove user from the list (DOM)
        const myLikeItem = [...likedByList.children].find(li => li.textContent === myUsername);
        likedByList.removeChild(myLikeItem);
        likeButton.textContent = 'LIKE';
      }
    });
}

// Modify this section for correct like/unlike logic
let updatedUsers = []; // ...  
