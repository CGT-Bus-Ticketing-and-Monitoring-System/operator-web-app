var earningsData = [
    {
        date: '2026-02-27',
        bus: 'Bus 101',
        route: 'Downtown - Airport',
        trips: 12,
        fares: 450.00
    },
    {
        date: '2026-02-26',
        bus: 'Bus 102',
        route: 'City Center - Mall',
        trips: 15,
        fares: 520.50
    },
    {
        date: '2026-02-25',
        bus: 'Bus 101',
        route: 'Downtown - Airport',
        trips: 10,
        fares: 380.00
    }
];

function handleDateFilter() {
    var filter = document.getElementById('dateFilter').value;
    loadData();
}

function handleLogout() {
    var confirmLogout = confirm('Are you sure you want to log out?');
    if (confirmLogout) {
        window.location.href = 'login.html';
    }
}

function loadData() {
    var tableBody = document.getElementById('earningsTableBody');
    var html = '';
    
    if (earningsData.length === 0) {
        html = '<tr><td colspan="5" class="empty-state">No data available</td></tr>';
    } else {
        for (var i = 0; i < earningsData.length; i++) {
            var item = earningsData[i];
            html += '<tr>';
            html += '<td>' + item.date + '</td>';
            html += '<td>' + item.bus + '</td>';
            html += '<td>' + item.route + '</td>';
            html += '<td>' + item.trips + '</td>';
            var price = item.fares;
            html += '<td>$' + price + '</td>';
            html += '</tr>';
        }
    }
    
    tableBody.innerHTML = html;
}

window.onload = function() {
    loadData();
};
