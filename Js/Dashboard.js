document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const operatorId = localStorage.getItem('operator_id') || 1; 
    console.log("Found Operator ID:", operatorId);

    async function updateDashboard() {
        try {
        
            const response = await fetch(`http://localhost:3000/api/operator/dashboard-summary`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token || ''}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Backend Data received:", data);

                document.getElementById('welcome-name').innerText = `Welcome, ${data.fname || 'User'}`;
                document.getElementById('total-buses').innerText = data.total_buses;
                document.getElementById('active-buses').innerText = data.active_buses;
                document.getElementById('inactive-buses').innerText = data.inactive_buses;
                
                const formattedEarnings = new Intl.NumberFormat().format(data.today_earnings);
                document.getElementById('earnings-display').innerText = `LKR ${formattedEarnings}`;
            } else {
                console.error("Backend returned an error:", response.status);
            }
        } catch (error) {
            console.error("Could not connect to Backend server:", error);
        }
    }

    updateDashboard();
});