const cron = require('node-cron');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('cron.db', (err) => {
  if(err){
    console.log('Gagal membuka database: ', err.message);
  } else {
    console.log('Berhasil terhubung dengan database.');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
  )
`, (err) => {
  if(err){
    console.log('Gagal membuat tabel ', err.message);
  } else {
    console.log('Berhasil membuat tabel.');
  }
});

cron.schedule('59 21 3 1 *', () => {
  let message = 'Bismillah!';
  db.run(`INSERT INTO messages (message) VALUES (?)`, [message], (err) => {
    if(err){
      console.log('Gagal menyimpan data ', err.message);
    } else {
      console.log('Berhasil menyimpan data.');
    }
  });
});

cron.schedule('0 22 3 1 *', () => {
  db.all('SELECT * FROM messages', [], (err, rows) => {
    if(err){
      console.log('Gagal mengambil data ', err.message);
    } else {
      rows.forEach((row, i) => {
        console.log(row);
      });
    }
  });
});
