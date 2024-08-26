const express = require('express');
const fs = require('fs');
const path = require('path');
// const axios = require('axios'); // We'll use axios for UCMDB API calls

const app = express();
const port = 3000;

// UCMDB API information (not used currently)
/*
const UCMDB_API_URL = 'https://your-ucmdb-api-url.com/api';
const UCMDB_API_USERNAME = 'your-username';
const UCMDB_API_PASSWORD = 'your-password';
*/

// Serve static files from the 'public' directory
app.use(express.static('public'));
// Add JSON parsing middleware
app.use(express.json()); // for parsing application/json

// Get server CIs
app.get('/get-server-cis', (req, res) => {
    // Current state: Reading from file
    try {
        const servers = fs.readFileSync('servers.txt', 'utf-8').split('\n').filter(Boolean);
        res.json(servers);
    } catch (error) {
        console.error('Error reading servers.txt:', error);
        res.status(500).json({ error: 'Failed to read server list' });
    }

    // UCMDB API call (currently disabled)
    /*
    try {
        const response = await axios.get(`${UCMDB_API_URL}/servers`, {
            auth: {
                username: UCMDB_API_USERNAME,
                password: UCMDB_API_PASSWORD
            }
        });
        const servers = response.data.map(server => server.name);
        res.json(servers);
    } catch (error) {
        console.error('Error fetching servers from UCMDB:', error);
        res.status(500).json({ error: 'Failed to fetch servers from UCMDB' });
    }
    */
});

// Get database CIs
app.get('/get-database-cis', (req, res) => {
    // Current state: Reading from file
    try {
        const databases = fs.readFileSync('databases.txt', 'utf-8').split('\n').filter(Boolean);
        res.json(databases);
    } catch (error) {
        console.error('Error reading databases.txt:', error);
        res.status(500).json({ error: 'Failed to read database list' });
    }

    // UCMDB API call (currently disabled)
    /*
    try {
        const response = await axios.get(`${UCMDB_API_URL}/databases`, {
            auth: {
                username: UCMDB_API_USERNAME,
                password: UCMDB_API_PASSWORD
            }
        });
        const databases = response.data.map(db => db.name);
        res.json(databases);
    } catch (error) {
        console.error('Error fetching databases from UCMDB:', error);
        res.status(500).json({ error: 'Failed to fetch databases from UCMDB' });
    }
    */
});

// New endpoint to handle CI updates
app.post('/update-ci', (req, res) => {
    // Extract CI information from the request body
    const { ciType, ciName, newStatus } = req.body;
    let filename;

    // Determine which file to update based on CI type
    if (ciType === 'server') {
        filename = 'servers.txt';
    } else if (ciType === 'database') {
        filename = 'databases.txt';
    } else {
        return res.status(400).json({ error: 'Invalid CI type' });
    }

    try {
        // Read the current CIs from the file
        let cis = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);
        // Find the index of the CI to update
        const index = cis.findIndex(ci => ci.split(',')[0] === ciName);
        
        if (index !== -1) {
            // Update the CI status
            cis[index] = `${ciName},${newStatus}`;
            // Write the updated CIs back to the file
            fs.writeFileSync(filename, cis.join('\n'));
            res.json({ message: 'CI updated successfully' });
        } else {
            res.status(404).json({ error: 'CI not found' });
        }
    } catch (error) {
        console.error(`Error updating ${filename}:`, error);
        res.status(500).json({ error: 'Failed to update CI' });
    }

    // UCMDB API update call (currently disabled)
    /*
    try {
        // Make a PUT request to update the CI in UCMDB
        const response = await axios.put(`${UCMDB_API_URL}/${ciType}s/${ciName}`, 
            { status: newStatus },
            {
                auth: {
                    username: UCMDB_API_USERNAME,
                    password: UCMDB_API_PASSWORD
                }
            }
        );
        if (response.status === 200) {
            res.json({ message: 'CI updated successfully in UCMDB' });
        } else {
            res.status(response.status).json({ error: 'Failed to update CI in UCMDB' });
        }
    } catch (error) {
        console.error('Error updating CI in UCMDB:', error);
        res.status(500).json({ error: 'Failed to update CI in UCMDB' });
    }
    */
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});