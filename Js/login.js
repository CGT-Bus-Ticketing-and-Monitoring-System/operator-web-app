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

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }
});

/*document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
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

                const result = await response.json();

                if (response.ok) {
                    localStorage.clear();//dilshan's change

                    // Keep both keys for compatibility across pages.
                    localStorage.setItem('operatorToken', result.token);//dulina's change
                    localStorage.setItem('adminToken', result.token);
                    localStorage.setItem('adminFName', result.fname);

                    localStorage.setItem('operatorId', result.operator_id);//dilshan's change
                    
                    window.location.href = 'home.html';
                } else {
                    alert(result.message || 'Login failed. Please check your credentials.');
                }

            } catch (error) {
                console.error('Network Error:', error);
                alert('Could not connect to the server.');
            }
        });
    }

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }
});*/