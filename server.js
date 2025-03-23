import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected')).catch(error => console.log("error:  connecting database => ", error));

const messageSchema = new mongoose.Schema({ name: String, message: String });
const Message = mongoose.model('Message', messageSchema);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send_message', async (data) => {
        const newMessage = await Message.create(data);
        io.emit('receive_message', newMessage);
    });

    socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

app.use(cors());
app.use(express.json());

app.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));