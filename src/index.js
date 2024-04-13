// write your code here
// src/index.js
document.addEventListener('DOMContentLoaded', () => {
    fetchImageData();
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', addComment);
  });
  
  function fetchImageData() {
    fetch('http://localhost:3000/images/1')
      .then(response => response.json())
      .then(imageData => {
        displayImage(imageData);
      })
      .catch(error => console.error('Error fetching image data:', error));
  }
  
  function displayImage(imageData) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = `
      <img src="${imageData.image}" alt="${imageData.title}">
      <h2 id="card-title">${imageData.title}</h2>
      <p>Likes: ${imageData.likes}</p>
      <button id="like-btn">Like</button>
    `;
    const likeButton = document.getElementById('like-btn');
    likeButton.addEventListener('click', () => likeImage(imageData.id));
  
    const commentList = document.getElementById('comments-list');
    commentList.innerHTML = '';
    imageData.comments.forEach(comment => {
      const li = document.createElement('li');
      li.textContent = comment.content;
      li.addEventListener('click', () => removeComment(comment.id));
      commentList.appendChild(li);
    });
  }
  
  function likeImage(imageId) {
    const likesElement = document.querySelector('#image-container p');
    const currentLikes = parseInt(likesElement.textContent.split(':')[1].trim());
    likesElement.textContent = `Likes: ${currentLikes + 1}`;
  }
  
  function addComment(event) {
    event.preventDefault();
    const commentInput = document.getElementById('comment-input');
    const content = commentInput.value;
    const commentList = document.getElementById('comments-list');
    const li = document.createElement('li');
    li.textContent = content;
    li.addEventListener('click', () => removeComment(comment.id));
    commentList.appendChild(li);
    commentInput.value = ''; // Clear input field after adding comment
  }
  
  function removeComment(commentId) {
    const commentToRemove = document.querySelector(`#comments-list li[data-comment-id="${commentId}"]`);
    if (commentToRemove) {
      commentToRemove.remove();
    }
  }
  