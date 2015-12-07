module.exports = {
  server: false,
  proxy: "localhost:8000",
  port: process.env.PORT || 3000,

  open: false,
  logFileChanges: true,
  logLevel: "info",
  files: [
    "build/**",
    // Exclude Map files
    "!build/**.map"
  ]
};
