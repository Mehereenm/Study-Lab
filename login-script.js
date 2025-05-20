document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Default credentials
    const defaultUsername = 'admin';
    const defaultPassword = 'password123';

    if (username === defaultUsername && password === defaultPassword) {
        window.location.href = 'StudyGroups.html';
    } else {
        alert('Incorrect username or password.');
    }
});
