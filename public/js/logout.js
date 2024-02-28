// Logout js will send POST request to api/user/logout route //
// This route effectively deletes the session as logs user out and sends to homepage //
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// Add event listener so this happens when clicked //
// When creating handlebars, I will need to use the logout id for button //
document.querySelector('#logout').addEventListener('click', logout);
