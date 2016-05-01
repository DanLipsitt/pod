import SockJS from 'sockjs-client';
import {eventTypes} from '../components/PrintLog';
import {printLogsAdd} from '../actions';

const MUX_URL = 'ws://localhost:9000/';

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

export function connectPrinterStatus(dispatch) {
  /* Connect to the printer mutltiplex websocket aggregator. */
  let conn = new WebSocket(MUX_URL);
  conn.onopen = function() {
    console.debug(`socket opened (${MUX_URL})`);
  };

  conn.onmessage = function(msg) {
    const data = JSON.parse(msg.data);
    if ('event' in data && eventTypes.includes(data.event.type)) {
      dispatch(printLogsAdd({
        event: data.event.type,
        host: data.host,
        port: data.port,
        filename: data.event.payload.filename,
      }));
    }
  };

  conn.onclose = function() {
    console.debug(`socket closed (${MUX_URL})`);
  };

}
