document.addEventListener('DOMContentLoaded', () => {
    const operatorId = localStorage.getItem('operatorId');
    const token = localStorage.getItem('operatorToken');
    const savedName = localStorage.getItem('operatorFName');

    if (!operatorId) {
        console.warn("No operatorId found. Redirecting to login...");
        window.location.href = 'index.html'; 
        return;
    }

    const welcomeEl = document.getElementById('welcome-name') || document.querySelector('h1');
    if (welcomeEl) {
        welcomeEl.innerText = `Welcome, ${savedName || 'Operator'}`;
    }

    async function loadDashboardData() {
        try {
            const response = await fetch(`http://localhost:3000/api/operator/dashboard-summary/${operatorId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                document.getElementById('total-buses').innerText = data.total_buses || 0;
                document.getElementById('active-buses').innerText = data.active_buses || 0;
                document.getElementById('inactive-buses').innerText = data.inactive_buses || 0;
                
                const formattedEarnings = new Intl.NumberFormat().format(data.today_earnings || 0);
                document.getElementById('earnings-display').innerText = `LKR ${formattedEarnings}`;
                
                if (welcomeEl && data.fname) {
                    welcomeEl.innerText = `Welcome, ${data.fname}`;
                }
            } else {
                console.error('Failed to load dashboard stats');
            }
        } catch (error) {
            console.error('Network Error:', error);
        }
    }

    loadDashboardData();
});