channel_routing = {
    'websocket.add':        'printers.consumers.ws_add',
    'websocket.keepalive':  'printers.consumers.ws_add',
#    'websocket.receive':    'printers.consumers.ws_receive',
    'websocket.disconnect': 'printers.consumers.ws_disconnect',
    'printers.transfer':    'printers.consumers.do_transfer',
}
