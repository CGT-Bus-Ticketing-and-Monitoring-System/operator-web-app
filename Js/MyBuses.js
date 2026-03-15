document.addEventListener('DOMContentLoaded', () => {
    
    const operatorId = localStorage.getItem('operatorId') || localStorage.getItem('operator_id');

    if (!operatorId) {
        console.warn("No operator_id found in localStorage");
    }

    fetchBuses(operatorId);
});

async function fetchBuses(id) {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/my-buses/${id}`);
        const data = await response.json();
        
        const busContainer = document.getElementById('busContainer');
        busContainer.innerHTML = ''; 

        if (data.length === 0) {
            busContainer.innerHTML = '<p class="no-data">No buses found for your account.</p>';
            return;
        }

        data.forEach(bus => {
            const statusClass = bus.status === 'ACTIVE' ? 'status-active' : 'status-inactive';

            busContainer.innerHTML += `
                <div class="bus-card">
                    <div class="card-left">
                        <i class="fa-solid fa-bus bus-icon"></i>
                        <div class="bus-details">
                            <h3>${bus.bus_name}</h3>
                            <p><strong>Reg No:</strong> ${bus.registration_number}</p>
                            <p><strong>Model:</strong> ${bus.model}</p>
                            <p><strong>Capacity:</strong> ${bus.capacity} Seats</p>
                        </div>
                    </div>
                    <div class="card-right">
                        <div class="status-badge ${statusClass}">${bus.status}</div>
                        <div class="action-icons">
                            <i class="fa-solid fa-file-pen edit-icon" title="Edit"></i>
                            <i class="fa-solid fa-trash delete-icon" title="Delete" onclick="deleteBus(${bus.bus_id})"></i>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}


async function deleteBus(busId) {
    if (confirm("Are you sure you want to delete this bus?")) {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/delete-bus/${busId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Bus deleted successfully!");
                location.reload(); 
            } else {
                alert("Error: Could not delete the bus.");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    }
}


const modal = document.getElementById('createBusModal');
const createBtn = document.getElementById('createBusBtn');
const closeBtn = document.getElementById('closeModalBtn');
const createForm = document.getElementById('createBusForm');

createBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentId = localStorage.getItem('operatorId') || localStorage.getItem('operator_id');

    const busData = {
        bus_name: document.getElementById('busName').value,
        model: document.getElementById('busModel').value,
        registration_number: document.getElementById('regNo').value,
        capacity: document.getElementById('capacity').value,
        operator_id: currentId,
        status: 'ACTIVE'
    };

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/create-bus`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(busData)
        });

        if (response.ok) {
            alert("Bus added successfully!");
            modal.style.display = 'none';
            createForm.reset();
            location.reload();
        } else {
            alert("Error: Could not save the bus.");
        }
    } catch (error) {
        console.error("Submission error:", error);
    }
});