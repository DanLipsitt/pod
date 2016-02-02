import SockJS from 'sockjs-client';

let connections = [];

export function addConnection(url, dispatch) {
  let conn = new SockJS(url);
  connections.push(conn);

  conn.onopen = function() {
    console.log(`socket opened (${url})`);
  };
  conn.onmessage = function(e) {
    console.log(`socket message (${url})`, e.data);
  };
  conn.onclose = function() {
    console.log(`socket closed (${url})`);
  };

}
