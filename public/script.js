// Function to update node list
// function updateNodes() {
//     getNodes();
//     alert('Node listes are updating'); // Change the alert message to 'Node listes updated!');
// }

// // Function to fetch and display nodes
// function getNodes() {
//     fetch('/get-nodes')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Received nodes data:', data);
            
//             const nodeList = document.getElementById('nodeList');
//             const nodeCounts = document.getElementById('nodeCounts');
//             nodeList.innerHTML = '';
//             nodeCounts.innerHTML = '';

//             if (Array.isArray(data.cis)) {
//                 const typeCounts = {};

//                 // Populate node table and count node types
//                 data.cis.forEach(node => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                         <td>${node.label || 'N/A'}</td>
//                         <td>${node.type || 'N/A'}</td>
//                         <td>${node.ucmdbId || 'N/A'}</td>
//                     `;
//                     nodeList.appendChild(row);

//                     // Count occurrences of each node type
//                     typeCounts[node.type] = (typeCounts[node.type] || 0) + 1;
//                 });

//                 // Display node type counts
//                 Object.entries(typeCounts).forEach(([type, count]) => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = `${type}: ${count}`;
//                     nodeCounts.appendChild(listItem);
//                 });

//                 alert('Node list updated!');
//             } else {
//                 throw new Error('Data structure is not as expected');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching nodes:', error);
//             nodeList.innerHTML = '<tr><td colspan="3">Failed to retrieve node list: ' + error.message + '</td></tr>';
//         });
// }

// // Function to update computer list
// function updateComputers() {
//     getComputers();
//     alert('computer listes are updating');
// }

// // Function to fetch and display computers
// function getComputers() {
//     fetch('/get-computers')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Received computers data:', data);
            
//             const computerList = document.getElementById('computerList');
//             const computerCounts = document.getElementById('computerCounts');
//             computerList.innerHTML = '';
//             computerCounts.innerHTML = '';

//             if (Array.isArray(data.cis)) {
//                 const typeCounts = {};

//                 // Populate computer table and count computer types
//                 data.cis.forEach(computer => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                         <td>${computer.label || 'N/A'}</td>
//                         <td>${computer.type || 'N/A'}</td>
//                         <td>${computer.ucmdbId || 'N/A'}</td>
//                     `;
//                     computerList.appendChild(row);

//                     // Count occurrences of each computer type
//                     typeCounts[computer.type] = (typeCounts[computer.type] || 0) + 1;
//                 });

//                 // Display computer type counts
//                 Object.entries(typeCounts).forEach(([type, count]) => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = `${type}: ${count}`;
//                     computerCounts.appendChild(listItem);
//                 });

//                 alert('Computer list updated!');
//             } else {
//                 throw new Error('Data structure is not as expected');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching computers:', error);
//             computerList.innerHTML = '<tr><td colspan="3">Failed to retrieve computer list: ' + error.message + '</td></tr>';
//         });
// }

// Uncomment these lines if you want to load CIs automatically when the page loads
// getNodes();
// getComputers();

// ******************************************************************************

// the following codes integrated for reading  from json
// // Function to update node list
function updateNodes() {
    getNodes();
    alert('Node listesi yenilendi!');
}

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
            
            // Clear the node list and counts
            const nodeList = document.getElementById('nodeList');
            const nodeCounts = document.getElementById('nodeCounts');
            nodeList.innerHTML = '';
            nodeCounts.innerHTML = '';

            if (Array.isArray(data)) {
                // Object to store counts of each type
                const typeCounts = {};

                // Populate node table and count types
                data.forEach(node => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${node.label}</td>
                        <td>${node.type}</td>
                        <td>${node.ucmdbId}</td>
                    `;
                    nodeList.appendChild(row);

                    // Increment count for this type
                    if (typeCounts[node.type]) {
                        typeCounts[node.type]++;
                    } else {
                        typeCounts[node.type] = 1;
                    }
                });

                // Display node type counts
                for (const [type, count] of Object.entries(typeCounts)) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${type}: ${count}`;
                    nodeCounts.appendChild(listItem);
                }
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
            
            // Clear the computer list and counts
            const computerList = document.getElementById('computerList');
            const computerCounts = document.getElementById('computerCounts');
            computerList.innerHTML = '';
            computerCounts.innerHTML = '';

            if (Array.isArray(data)) {
                // Object to store counts of each type
                const typeCounts = {};

                // Populate computer table and count types
                data.forEach(computer => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${computer.label}</td>
                        <td>${computer.type}</td>
                        <td>${computer.ucmdbId}</td>
                    `;
                    computerList.appendChild(row);

                    // Increment count for this type
                    if (typeCounts[computer.type]) {
                        typeCounts[computer.type]++;
                    } else {
                        typeCounts[computer.type] = 1;
                    }
                });

                // Display computer type counts
                for (const [type, count] of Object.entries(typeCounts)) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${type}: ${count}`;
                    computerCounts.appendChild(listItem);
                }
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
