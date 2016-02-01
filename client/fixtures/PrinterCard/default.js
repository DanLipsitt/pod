module.exports = {
  printer: {
    id: '1',
    name: 'Printer 1',
  },
  printerHandlers: {
    start: function(args) {console.log('start: ', args)},
  },
  connectDropTarget: function() {},
};
