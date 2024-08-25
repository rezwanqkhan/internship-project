// Function to update servers
function updateServers() {
    fetch('/update-servers')
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Sunucu listesi güncellendi!');
        })
        .catch(error => console.error('Error:', error));
}

// Function to get server CIs
function getServerCIs() {
    fetch('/get-server-cis')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                document.getElementById('serverList').innerHTML = data.join('<br>');
            } else {
                document.getElementById('serverList').innerHTML = 'Sunucu listesi alınamadı.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('serverList').innerHTML = 'Sunucu listesi alınamadı.';
        });
}

// Function to update databases
function updateDatabases() {
    fetch('/update-databases')
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Veritabanı listesi güncellendi!');
        })
        .catch(error => console.error('Error:', error));
}

// Function to get database CIs
function getDatabaseCIs() {
    fetch('/get-database-cis')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                document.getElementById('databaseList').innerHTML = data.join('<br>');
            } else {
                document.getElementById('databaseList').innerHTML = 'Veritabanı listesi alınamadı.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('databaseList').innerHTML = 'Veritabanı listesi alınamadı.';
        });
}