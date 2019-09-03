const server = require('http').createServer();
const io = require('socket.io')(server);

const clients  = [];
const usernames = {};

io.on('connection', client => {
    clients.push(client);
    client.on('message', data => {
        clients.forEach(c => c.emit("message", usernames[client.id] + ": " + data))
    });
    client.on('username', data => usernames[client.id] = data);
    client.on('disconnect', () => {
        clients

    });
});
server.listen(3000);