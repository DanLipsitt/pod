import SockJS from 'sockjs-client';
import {argv} from 'yargs';

let url = argv._[0];

let sock = new SockJS(url);
sock.onopen = () => console.log('[');
sock.onmessage = msg => console.log(JSON.stringify(msg.data) + ',');

process.on('SIGINT', () => {
  sock.close();
  console.log('{}',']'); /* empty entry prevents trailing comma error */
  process.exit();
});
