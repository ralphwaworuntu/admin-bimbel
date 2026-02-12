const mysql = require('mysql2/promise');

async function init() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
    });

    const dbName = process.env.MYSQL_DATABASE || 'waas_builder';

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database ${dbName} created or already exists.`);

    await connection.end();
}

init().catch(err => {
    console.error(err);
    process.exit(1);
});
