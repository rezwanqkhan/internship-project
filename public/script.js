// Function to update CI status
// Function to update servers (now just refreshes the list)
function updateServers() {
    getServerCIs();
    alert('Sunucu listesi yenilendi!');
}

// Function to get server CIsfunction getServerCIs() {
    function getServerCIs() {
        fetch('/get-server-cis')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const serverList = document.getElementById('serverList');
                    serverList.innerHTML = '';
                    data.forEach(server => {
                        const [name] = server.split(','); // Yalnızca name değişkenini alıyoruz
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
    
    alert('Veritabanı listesi yenilendi!');
    getDatabaseCIs();
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