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

// Ran a for each function since new buttons will be created with a new post. Otherwise the event listener would only work on the first post //
document.querySelectorAll('.update-post-btn').forEach(button => {
    button.addEventListener('click', updatePost);
});