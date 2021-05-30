import mysql from 'promise-mysql';

import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.then(p => p.getConnection())
    .then(connection => {
        // pool.releaseConnection(connection);
        console.log('Db is connected');
        
    });

export default pool;