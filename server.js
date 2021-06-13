//  import
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';
//  app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
	appId: '1067710',
	key: '6dbe3a50e6f9ec718b4b',
	secret: '676aaa83ffbc6fc98e7f',
	cluster: 'ap2',
	useTLS: true,
});

// middlewares

app.use(express.json());

app.use(cors());

// dB config

const connection_url =
	'mongodb+srv://admin:O0JEovNtuhA8LsuY@cluster0.ewcdt.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
	console.log('DB connected');

	const msgCollection = db.collection('messagecontents');
	const changeStream = msgCollection.watch();

	changeStream.on('change', (change) => {
		console.log('A Change occured', change);

		if (change.operationType === 'insert') {
			const messageDetails = change.fullDocument;
			pusher.trigger('messages', 'inserted', {
				name: messageDetails.name,
				message: messageDetails.message,
				timestamp: messageDetails.timestamp,
				received: messageDetails.received,
			});
		} else {
			console.log('Error triggering Pusher');
		}
	});
});

// ??

// api route
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post('/messages/new', (req, res) => {
	const dbMessage = req.body;

	Messages.create(dbMessage, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

//  Listner
app.listen(port, () => console.log(`Listening on localhost:${port}`));
