import SockJS from 'sockjs-client';

let connections = [];

export function addConnection(id, url, dispatch) {
  let conn = new SockJS(url);
  connections.push(conn);

  conn.onopen = function() {
    console.log(`socket opened (${url})`);
  };

  conn.onmessage = function({data}) {
    if ('event' in data) {
      console.log('event:', id, data.event);
    } else if ('current' in data) {
      dispatch({type:'OCTO_CURRENT', payload:{id, ...data.current}});
    } else if ('history' in data) {
      console.log('history:', id, data.current);
    } else {
      console.log('msg:', id, data);
    }
  };

  conn.onclose = function() {
    console.log(`socket closed (${url})`);
  };

}
