document.addEventListener('DOMContentLoaded', () => {
    console.log("Operator Dashboard Loaded Successfully");

    const earningsElement = document.getElementById('earnings-display');

    function updateDashboardMetrics() {
        console.log("Fetching latest fleet data...");
    }

    const profileBtn = document.querySelector('.profile-btn');
    profileBtn.addEventListener('click', () => {
        alert("Redirecting to your Profile settings...");
    });
});