let items = [0, 1, 2, 3, 4];

module.exports = {
  printers: items.map(i => ({
    id: i,
    name: `Printer ${i}`,
    hostname: `series1-100${i}.local`,
    port: 5000 + i,
    job: {file: {name: 'file.gcode'}},
    state: {
      text: ['Operational', 'Printing', 'Paused', 'Offline', 'Closed'][i],
    },
    progress: {completion: 50},
  })
  ),
  printerHandlers: {},
};
