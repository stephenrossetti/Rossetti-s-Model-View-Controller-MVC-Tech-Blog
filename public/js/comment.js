// Function to add comment when user is logged in //
const newComment = async (event) => {
    event.preventDefault();
  
    // Grabbing URL and splitting by "/" then grabbing the ID selected at end //
    const url = window.location.toString().split('/');
    const postID = url[4];

    const comments = document.querySelector('#comment').value.trim();
  
    // Comment needs to exist  //
    if (comments) {
      const response = await fetch(`/api/comment/${postID}`, {
        method: 'POST',
        body: JSON.stringify({comments}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${postID}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document.querySelector('.add-comment').addEventListener('click', newComment);