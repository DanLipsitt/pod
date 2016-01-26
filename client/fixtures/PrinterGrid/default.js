let items = [1, 2, 3, 4, 5];

module.exports = {
  printers: items.map(i => ({
    id: `${i}`,
    name: `Printer ${i}`,
    hostname: `series1-100${i}.local`,
    port: 5000 + i,
  })
  ),
};
