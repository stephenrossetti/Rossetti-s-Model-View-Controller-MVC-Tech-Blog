// Function to add comment when user is logged in //
const newComment = async (event) => {
    event.preventDefault();
  
    // Grabbing URL and splitting by "/" then grabbing the ID selected at end //
    const url = window.location.toString().split('/');
    const postID = url[4];

    const contents = document.querySelector('#comment').value.trim();
  
    // Comment needs to exist  //
    if (contents) {
      const response = await fetch(`/api/comments/${postID}`, {
        method: 'POST',
        body: JSON.stringify({ contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/posts/${postID}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document.querySelector('.add-comment').addEventListener('click', newComment);