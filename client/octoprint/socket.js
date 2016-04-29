import SockJS from 'sockjs-client';

let directConnections = [];

export function addDirectConnection(id, url, dispatch) {
  let conn = new SockJS(url);
  directConnections.push(conn);

  conn.onopen = function() {
    console.log(`socket opened (${url})`);
  };

  conn.onmessage = function({data}) {
    if ('current' in data) {
      dispatch({type:'OCTO_CURRENT', payload:{id, ...data.current}});
    } else if ('history' in data) {
      console.debug('history:', id, data.current);
    } else {
      console.debug('msg:', id, data);
    }
  };

  conn.onclose = function() {
    console.log(`socket closed (${url})`);
  };

}
