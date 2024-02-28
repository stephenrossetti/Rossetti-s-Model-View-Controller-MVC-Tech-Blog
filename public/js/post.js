// Function to create a new post when user is logged in //
const newPost = async (event) => {
  event.preventDefault();

  const question = document.querySelector('#post-question').value.trim();
  const answer = document.querySelector('#post-answer').value.trim();

  // Post needs to have a question and answer to be posted //
  if (question && answer) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ question, answer }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

// Function to delete a post if you created the post //
// Fetches from specific ID that you selected to delete //
const deletePost = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Add event listeners to initiate the actual functions //
document.querySelector('.new-post-form').addEventListener('submit', newPost);
document.querySelector('.post-list').addEventListener('click', deletePost);