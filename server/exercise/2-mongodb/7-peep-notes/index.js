const express = require('express');
const path = require('path');

const server = require('./server');

server.listen(server.get('port'), () => {
  console.log("Server has started.");
});

