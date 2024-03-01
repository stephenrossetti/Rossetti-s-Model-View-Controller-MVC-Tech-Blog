// Function to add comment when user is logged in //
const newComment = async (event) => {
  event.preventDefault();

  // Grabbing URL and splitting by "/" then grabbing the ID selected at end //
  const url = window.location.toString().split('/');
  const postID = url[4];

  const commentText = document.querySelector('#comment').value.trim();

  // Comment needs to exist  //
  if (commentText) {
    const response = await fetch(`/api/comment/${postID}`, {
      method: 'POST',
      body: JSON.stringify({ comment: commentText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Had trouble with the code, so I included a console log here to confirm //
      const responseBody = await response.text();
      console.log('Response Body:', responseBody);

      alert('Failed to create comment');
    } else {
      document.location.replace(`/post/${postID}`);
    }
  }
};

document.querySelector('#add-comment').addEventListener('click', newComment);