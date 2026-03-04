document.addEventListener('DOMContentLoaded', () => {
    

    const createBusBtn = document.getElementById('createBusBtn');
    const modalOverlay = document.getElementById('createBusModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const createBusForm = document.getElementById('createBusForm');
    const busList = document.querySelector('.bus-list'); 

    
    if (createBusBtn && modalOverlay) {
        createBusBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'flex';
        });
    }

    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            createBusForm.reset(); 
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });
    }
    
    if (createBusForm) {
        createBusForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const model = document.getElementById('busModel').value;
            const regNo = document.getElementById('regNo').value;
             
            if(regNo.trim() === '' || model.trim() === '') {
                alert("Please fill in the Registration No and Model.");
                return;
            }
       
            const newBusCardHTML = `
                <div class="bus-card">
                    <div class="card-left">
                        <i class="fa-solid fa-bus bus-icon"></i>
                        <div class="bus-details">
                            <h3>Reg No: ${regNo.toUpperCase()}</h3>
                            <p>Route: Unassigned</p>
                            <p>Model: ${model}</p>
                            <p class="earnings"><strong>Earnings Today:</strong></p>
                        </div>
                    </div>
                    <div class="card-right">
                        <div class="status-badge status-inactive">Inactive</div>
                        <div class="action-icons">
                            <i class="fa-solid fa-file-pen edit-icon" title="Edit"></i>
                            <i class="fa-solid fa-trash delete-icon" title="Delete"></i>
                        </div>
                    </div>
                </div>
            `;
           
            busList.insertAdjacentHTML('afterbegin', newBusCardHTML);
 
            createBusForm.reset();
            modalOverlay.style.display = 'none';
        });
    }
  
    if (busList) {
        busList.addEventListener('click', (e) => {
            
           
            if (e.target.classList.contains('delete-icon')) {
                const card = e.target.closest('.bus-card');
                const regNo = card.querySelector('h3').innerText;
                
                 card.remove(); 
                
            }           
        });
    }

   
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
               window.location.href = 'operator-login.html';
            
        });
    }
});