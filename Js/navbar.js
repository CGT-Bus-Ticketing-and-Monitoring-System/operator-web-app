document.addEventListener('DOMContentLoaded', () => {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    if (navbarPlaceholder) {

        navbarPlaceholder.outerHTML = `
            <header class="operator-navbar">
                <div class="logo">Obsidian Bus<br>Tracking</div>
        
                <nav class="nav-links">
                    <a href="home.html" data-page="home">Home</a>
                    <a href="my-buses.html" data-page="my-buses">My Buses</a>
                    <a href="earnings.html" data-page="earnings">Earnings</a>
                </nav>
        
                <div class="nav-actions">
                    <button class="profile-btn">My Profile <i class="fa-solid fa-circle-user"></i></button>
                    <button class="logout-btn">Log Out</button>
                </div>
            </header>
        `;

        const currentPage = document.body.getAttribute('data-active-page');

        const links = document.querySelectorAll('.operator-navbar .nav-links a');

        links.forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });

        const logoutBtn = document.querySelector('.logout-btn');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (confirm("Are you sure you want to log out?")) {

                    localStorage.removeItem('operatorToken');
                    localStorage.removeItem('operatorFName');
                    localStorage.removeItem('operatorId');

                    window.location.replace('index.html'); 
                }
            });
        }
    }
});