const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simüle edilmiş UCMDB veri çekme fonksiyonları
async function getServersFromUCMDB() {
    // Gelecekte UCMDB API'sinden veri çekilecek
    const data = await fs.readFile(path.join(__dirname, 'servers.txt'), 'utf-8');
    return data.split('\n').filter(Boolean);
}

async function getDatabasesFromUCMDB() {
    // Gelecekte UCMDB API'sinden veri çekilecek
    const data = await fs.readFile(path.join(__dirname, 'databases.txt'), 'utf-8');
    return data.split('\n').filter(Boolean);
}

app.get('/', async (req, res) => {
    try {
        const servers = await getServersFromUCMDB();
        const databases = await getDatabasesFromUCMDB();
        res.render('index', { servers, databases, message: null });
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        res.status(500).render('index', { servers: [], databases: [], message: 'Veri çekme hatası oluştu' });
    }
});

app.get('/update-servers', async (req, res) => {
    try {
        const servers = await getServersFromUCMDB();
        res.json({ servers });
    } catch (error) {
        console.error('Sunucu güncelleme hatası:', error);
        res.status(500).json({ error: 'Sunucular güncellenirken bir hata oluştu' });
    }
});

app.get('/update-databases', async (req, res) => {
    try {
        const databases = await getDatabasesFromUCMDB();
        res.json({ databases });
    } catch (error) {
        console.error('Veritabanı güncelleme hatası:', error);
        res.status(500).json({ error: 'Veritabanları güncellenirken bir hata oluştu' });
    }
});

app.post('/add-server', async (req, res) => {
    try {
        const { serverName } = req.body;
        // Gelecekte UCMDB API'sine yeni sunucu eklenecek
        await fs.appendFile(path.join(__dirname, 'servers.txt'), `\n${serverName}`);
        res.redirect('/');
    } catch (error) {
        console.error('Sunucu ekleme hatası:', error);
        res.status(500).send('Sunucu eklenirken bir hata oluştu');
    }
});

app.post('/add-database', async (req, res) => {
    try {
        const { databaseName } = req.body;
        // Gelecekte UCMDB API'sine yeni veritabanı eklenecek
        await fs.appendFile(path.join(__dirname, 'databases.txt'), `\n${databaseName}`);
        res.redirect('/');
    } catch (error) {
        console.error('Veritabanı ekleme hatası:', error);
        res.status(500).send('Veritabanı eklenirken bir hata oluştu');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});