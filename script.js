function openPhoto(photoUrl, photographer) {
  // Simulate opening the photo in a modal or dedicated page
  const modalContent = `
    <img src="${photoUrl}" alt="Photo">
    <div class="overlay">
      <button class="like-button">Like</button>
      <button class="dislike-button">Dislike</button>
    </div>
    <p>Photographer: ${photographer}</p>
  `;

  // Replace this line with actual code to display the modal or dedicated page
  alert(modalContent);
}

// Add event listeners to the dynamically created buttons
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('like-button')) {
    alert('Liked!');
  } else if (event.target.classList.contains('dislike-button')) {
    alert('Disliked!');
  }
});
