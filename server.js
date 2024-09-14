const express = require('express');
const axios = require('axios');
const https = require('https');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// UCMDB API configuration
const ucmdbConfig = {
  baseURL: 'https://s001ucmdb1.konsalt.info:8443/rest-api',
  username: 'sysadmin',
  password: 'Sysadmin123.',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false // Only use this in development. For production, use proper SSL certificates.
  })
};

// Function to get authentication token from UCMDB
async function getAuthToken() {
  try {
    const response = await axios.post(`${ucmdbConfig.baseURL}/authenticate`, {
      username: ucmdbConfig.username,
      password: ucmdbConfig.password,
      repository: "UCMDB",
      clientContext: 1
    }, {
      httpsAgent: ucmdbConfig.httpsAgent
    });
    return response.data.token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
}

// Function to fetch data from UCMDB API
async function getUCMDBData(endpoint, body) {
  try {
    const token = await getAuthToken();
    const response = await axios.post(`${ucmdbConfig.baseURL}${endpoint}`, body, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      httpsAgent: ucmdbConfig.httpsAgent
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from UCMDB:', error);
    throw error;
  }
}

// Route to get nodes from UCMDB
app.get('/get-nodes', async (req, res) => {
  try {
    const data = await getUCMDBData('/topology', { nodes_query: "" });
    res.json(data.cis || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get computers from UCMDB
app.get('/get-computers', async (req, res) => {
  try {
    const data = await getUCMDBData('/topology', { All_Computers: "" });
    res.json(data.cis || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// ******************************************************************************

// the following codes integrated for reading  from json


// const express = require('express');
// const fs = require('fs').promises; // Use the promises API of the fs module

// const app = express();
// const port = 3000;

// app.use(express.static('public'));
// app.use(express.json());

// async function readJSONFile(filename) {
//     try {
//         const data = await fs.readFile(filename, 'utf8');
//         return JSON.parse(data);
//     } catch (error) {
//         console.error('Failed to read file:', error);
//         throw error;
//     }
// }

// app.get('/get-nodes', async (req, res) => {
//     try {
//         const jsonData = await readJSONFile('nodes_query.json');  
//         if (!jsonData.cis || !Array.isArray(jsonData.cis)) {  
//             throw new Error('Data read from file is not structured as expected');
//         }
//         res.json(jsonData.cis);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.get('/get-computers', async (req, res) => {
//     try {
//         const jsonData = await readJSONFile('database_query.json'); // Adjust filename as necessary
//         if (!jsonData.cis || !Array.isArray(jsonData.cis)) {
//             throw new Error('Data read from file is not structured as expected');
//         }
//         res.json(jsonData.cis);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });





// const express = require('express');
// const axios = require('axios');
// const fs = require('fs').promises;  // Include the promises API of the fs module

// const app = express();
// const port = 3000;

// const UCMDB_API_URL = 'https://s001ucmdb1.konsalt.info:8443/rest-api/topology';
// const UCMDB_API_USERNAME = 'sysadmin';
// const UCMDB_API_PASSWORD = 'Sysadmin123';

// app.use(express.static('public'));
// app.use(express.json());

// async function getUCMDBData(query) {
//     try {
//         const response = await axios.post(UCMDB_API_URL, query, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             auth: {
//                 username: UCMDB_API_USERNAME,
//                 password: UCMDB_API_PASSWORD
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching data from UCMDB:', error);
//         throw error;
//     }
// }

// async function readJSONFile(filename) {
//     try {
//         const data = await fs.readFile(filename, 'utf8');
//         return JSON.parse(data);
//     } catch (error) {
//         console.error('Failed to read file:', error);
//         throw error;
//     }
// }

// app.get('/get-nodes', async (req, res) => {
//     try {
//         const query = await readJSONFile('nodes_query.json'); // Reads nodes query from a JSON file
//         const data = await getUCMDBData(query);
//         const nodes = data.map(node => ({
//             ucmdbId: node.ucmdbId,
//             type: node.type,
//             label: node.label
//         }));
//         res.json(nodes);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch nodes from UCMDB' });
//     }
// });

// app.get('/get-computers', async (req, res) => {
//     try {
//         const query = await readJSONFile('database_query.json'); // Reads database query from a JSON file
//         const data = await getUCMDBData(query);
//         const computers = data.map(computer => ({
//             ucmdbId: computer.ucmdbId,
//             type: computer.type,
//             label: computer.label
//         }));
//         res.json(computers);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch computers from UCMDB' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
