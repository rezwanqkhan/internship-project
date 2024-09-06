// Function to update node list
function updateNodes() {
    getNodes();
    alert('Node listesi yenilendi!');
}

// Function to get nodes
function getNodes() {
    fetch('/get-nodes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data); // Log to see what data looks like
            const nodeList = document.getElementById('nodeList');
            nodeList.innerHTML = '';
            if (Array.isArray(data)) {
                data.forEach(node => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${node.label}</td>
                        <td>${node.type}</td>
                        <td>${node.ucmdbId}</td>
                    `;
                    nodeList.appendChild(row);
                });
            } else {
                throw new Error('Data is not an array');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('nodeList').innerHTML = '<tr><td colspan="3">Node listesi alınamadı: ' + error.message + '</td></tr>';
        });
}

// Function to update computer list
function updateComputers() {
    getComputers();
    alert('Bilgisayar listesi yenilendi!');
}

// Function to get computers
function getComputers() {
    fetch('/get-computers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data); // Log to see what data looks like
            const computerList = document.getElementById('computerList');
            computerList.innerHTML = '';
            if (Array.isArray(data)) {
                data.forEach(computer => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${computer.label}</td>
                        <td>${computer.type}</td>
                        <td>${computer.ucmdbId}</td>
                    `;
                    computerList.appendChild(row);
                });
            } else {
                throw new Error('Data is not an array');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('computerList').innerHTML = '<tr><td colspan="3">Bilgisayar listesi alınamadı: ' + error.message + '</td></tr>';
        });
}

// Initial load of CIs
// getNodes();
// getComputers();
