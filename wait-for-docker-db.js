import chalk from 'chalk';
import mysql from 'mysql';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'pulsarroot',
  database: 'pulsar'
};

const maxAttempts = 60;
const delay = 1000; // 1s
let loading = 1;

function waitForDBConnection(attempts) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if(err) {
      if(attempts < maxAttempts) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`${chalk.cyan('[Pulsar MySQL Worker]')} Database server is starting, wait a moment${loading === 2? '..' : loading === 3? '...' : '.'}`);
        if(loading >= 3) {
          loading = 1;
        } else {
          loading++;
        }
        setTimeout(() => waitForDBConnection(attempts + 1), delay);
      } else {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.error(`${chalk.red('[Error]')} Database server not started. Exiting...`);
        process.exit(1);
      }
    } else {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log(`${chalk.green('[Success]')} Database started, running migrations...`);
      connection.end();
    }
  });
}

waitForDBConnection(1);