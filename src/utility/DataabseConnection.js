
import {Client} from 'pg'
export const AdminDatabaseConnectiomn=()=>{

// Create a new instance of the client
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'your_database',
    password: 'root',
    port: 5432,
  })
// Connect to the database
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));
}