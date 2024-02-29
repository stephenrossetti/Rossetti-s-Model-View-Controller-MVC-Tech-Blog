// Function to create a new post when user is logged in //
const newPost = async (event) => {
  event.preventDefault();

  const topic = document.querySelector('#post-topic').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  // Post needs to have a topic and description to be posted //
  if (topic && description) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ topic, description }),
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

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Edit a pre-existing post //
const updatePost = async (event) => {
  event.preventDefault();

  // Similar to adding comment, this will obtain the specific :ID from URL //
  const url = window.location.toString().split('/');
  const postID = url[4];

  const topic = document.querySelector('#post-topic').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  const response = await fetch(`/api/post/${postID}`, {
      method: 'PUT',
      body: JSON.stringify({ topic, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  };

// Add event listeners to initiate the actual functions //
document.querySelector('.new-post-form').addEventListener('submit', newPost);
document.querySelector('.delete-post-btn').addEventListener('click', deletePost);
document.querySelector('.update-post-btn').addEventListener('click', updatePost);