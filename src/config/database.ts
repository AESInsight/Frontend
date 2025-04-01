import mysql from 'mysql2/promise';

// Parse connection string
const connectionString = process.env.DB_CONNECTION_STRING || 'Server=qq70r.h.filess.io;Port=61002;Database=AESInsight_goesrateis;User=AESInsight_goesrateis;Password=93327c90bb0b8872f03cfea06ac7fea3c070def9;';

// Parse the connection string into components
const parseConnectionString = (connStr: string) => {
    const params = new Map(
        connStr.split(';')
            .filter(Boolean)
            .map(pair => {
                const [key, value] = pair.split('=');
                return [key.trim(), value];
            })
    );

    return {
        host: params.get('Server'),
        port: parseInt(params.get('Port') || '3306'),
        database: params.get('Database'),
        user: params.get('User'),
        password: params.get('Password')
    };
};

const dbConfig = parseConnectionString(connectionString);

// Create a connection pool
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function executeQuery<T>(query: string, params: any[] = []): Promise<T> {
    try {
        const [results] = await pool.execute(query, params);
        return results as T;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

export default pool; 