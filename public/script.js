// Function to update CI status
function updateCIStatus(ciType, ciName, currentStatus) {
    const newStatus = prompt(`${ciName} için yeni durum girin (şu anki: ${currentStatus}):`, currentStatus);
    if (newStatus === null || newStatus === currentStatus) return; // User cancelled or didn't change status

    fetch('/update-ci', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ciType, ciName, newStatus }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || `${ciType} durumu güncellendi!`);
        // Refresh the CI list after successful update
        if (ciType === 'server') {
            getServerCIs();
        } else if (ciType === 'database') {
            getDatabaseCIs();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`${ciType} durumu güncellenemedi.`);
    });
}

// Function to update servers (now just refreshes the list)
function updateServers() {
    getServerCIs();
    alert('Sunucu listesi yenilendi!');
}

// Function to get server CIs
function getServerCIs() {
    fetch('/get-server-cis')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                const serverList = document.getElementById('serverList');
                serverList.innerHTML = '';
                data.forEach(server => {
                    const [name, status] = server.split(',');
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${name}</td>
                        
                    `;
                    serverList.appendChild(row);
                });
            } else {
                document.getElementById('serverList').innerHTML = '<tr><td colspan="3">Sunucu listesi alınamadı.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('serverList').innerHTML = '<tr><td colspan="3">Sunucu listesi alınamadı.</td></tr>';
        });
}

// Function to update databases (now just refreshes the list)
function updateDatabases() {
    getDatabaseCIs();
    alert('Veritabanı listesi yenilendi!');
}

// Function to get database CIs
function getDatabaseCIs() {
    fetch('/get-database-cis')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                const databaseList = document.getElementById('databaseList');
                databaseList.innerHTML = '';
                data.forEach(database => {
                    const [name] = database.split(',');
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${name}</td>

                    `;
                    databaseList.appendChild(row);
                });
            } else {
                document.getElementById('databaseList').innerHTML = '<tr><td colspan="3">Veritabanı listesi alınamadı.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('databaseList').innerHTML = '<tr><td colspan="3">Veritabanı listesi alınamadı.</td></tr>';
        });
}

// Initial load of CIs
// getServerCIs();
// getDatabaseCIs();