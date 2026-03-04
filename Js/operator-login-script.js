document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        
        console.log('Login Attempted:');
        console.log('Username:', username);
        console.log('Password:', password);

        
        alert(`Login clicked for user: ${username}`);
    });
});