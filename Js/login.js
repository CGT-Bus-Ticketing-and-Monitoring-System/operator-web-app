document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('operatorToken', data.token);
                localStorage.setItem('operatorFName', data.fname);
                localStorage.setItem('operatorId', data.operator_id);

                window.location.href = 'home.html'; 
            } else {
                alert(data.message || 'Login failed. Please check your credentials.');
            }

        } catch (error) {
            console.error('Network Error:', error);
            alert('Unable to connect to the server. Please check your internet connection.');
        }
    });
});