const { Client } = require('pg');

const str = 'postgres://vnbyfsulhyxaei:5fcbe6e2e4efe7526fc740cb879535bdc7277980ac00f5aac3e87808bb912eed@ec2-34-205-46-149.compute-1.amazonaws.com:5432/d14kjstmn05ghq';
const client = new Client({
  connectionString: str,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();
module.exports = client;