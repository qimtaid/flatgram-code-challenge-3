// src/index.js
document.addEventListener('DOMContentLoaded', () => {
    fetchImageData();
    const likeButton = document.getElementById('like-button');
    likeButton.addEventListener('click', likeImage);
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
    const titleElement = document.getElementById('card-title');
    const imageElement = document.getElementById('card-image');
    const likeCountElement = document.getElementById('like-count');
    const commentList = document.getElementById('comments-list');
  
    titleElement.textContent = imageData.title;
    imageElement.src = imageData.image;
    imageElement.alt = imageData.title;
    likeCountElement.textContent = `${imageData.likes} likes`;
  
    commentList.innerHTML = '';
    imageData.comments.forEach(comment => {
      const li = document.createElement('li');
      li.textContent = comment.content;
      li.dataset.commentId = comment.id; // Add data attribute to track comment id
      li.addEventListener('click', () => removeComment(comment.id));
      commentList.appendChild(li);
    });
  }
  
  function likeImage() {
    const likeCountElement = document.getElementById('like-count');
    const currentLikes = parseInt(likeCountElement.textContent.split(' ')[0]);
    likeCountElement.textContent = `${currentLikes + 1} likes`;
  }
  
  function addComment(event) {
    event.preventDefault();
    const commentInput = document.getElementById('comment');
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
  