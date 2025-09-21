const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = new Server(server);

// make io accessible if needed later
app.set('io', io);

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // welcome ping
  setTimeout(() => {
    socket.emit('serverMessage', 'Hello from server!');
  }, 50);

  // when a client sends a chat message, broadcast to others
  socket.on('chatMessage', (text) => {
    const payload = { from: socket.id.slice(0, 4), text, ts: Date.now() };
    socket.broadcast.emit('chatMessage', payload);   // others only
    // use io.emit('chatMessage', payload) if you want sender to also get the server echo
  });

  // optional typing indicator
  socket.on('typing', (isTyping) => {
    socket.broadcast.emit('typing', {
      from: socket.id.slice(0, 4),
      isTyping: !!isTyping
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
