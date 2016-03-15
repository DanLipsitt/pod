module.exports = {
  printerHandlers: {
    start: () => null,
    stop: () => null,
    pause: () => null,
  },
  printer: {
    id: 1,
    state: {
      text: 'Operational',
    },
    job: {file: {name: 'file.gcode'}},
  },
};
