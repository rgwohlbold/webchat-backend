const server = require('http').createServer();
const io = require('socket.io')(server);

const clients = {};

io.on('connection', client => {
    clients[client.id] = {client, username: client.id + ""};
    const members = Object.values(clients).map(c => c.username);
    client.emit("members", members);
    client.on('message', data => {
        for (var c in clients) {
            clients[c].client.emit("message", clients[c].username + ": " + data);
        }
    });
    client.on('username', data => {
        clients[client.id].username = data;
        for (var c in clients) {
            const members = Object.values(clients).map(c => c.username)
            clients[c].client.emit("members", members)
        }
    });
    client.on('disconnect', c => {
        delete clients[client.id]
    });
});
server.listen(3000);
