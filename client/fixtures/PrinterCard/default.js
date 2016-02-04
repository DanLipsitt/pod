module.exports = {
  printer: {
    id: 1,
    name: 'Printer 1',
    state: {text: 'Operational'},
    job: {
      file: {name: 'file.gcode'},
    },
  },
  printerHandlers: {
    start: () => null,
    stop: () => null,
    pause: () => null,
  },
  connectDropTarget: function() {},
};
