// code away!
const server = require('./server');
const port = 5000;

const apiRoutes = require('./api/apiRoutes');

server.use('/api',apiRoutes);

server.listen(port, ()=> {
    console.log(`Server is runnning on port ${port}` )
  })