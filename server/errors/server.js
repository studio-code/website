const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb+srv://arguiot:zihty6-korxak-weMjab@studioeditorjserror-jmnlo.gcp.mongodb.net/editorErrorJS';

// Database Name
const dbName = 'editorErrorJS';

mongoose.connect(url, {
	poolSize: 2,
	ssl: true,
	keepAlive: 300000,
	connectTimeoutMS: 30000,
	autoReconnect: true,
	reconnectTries: 30000000,
	reconnectInterval: 5000,
	promiseLibrary: global.Promise,
	useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	const model = new mongoose.Schema({
		name: String,
		recurrence: Number,
		json: {
			err: String,
			src: String,
			line: Number,
			column: Number,
			time: String,
			userAgent: String
		}
	})

	const editorErrorJS = mongoose.model("editorErrorJS", model)


	function logRecords(callback) {
		editorErrorJS.find((err, records) => {
			if (err) return console.error(err);
			callback(records)
		})
	}

	/** Server */

	const express = require("express")
	const app = express()
	const port = 8080

	app.use(express.json()); // to support JSON-encoded bodies
	app.use(express.urlencoded()); // to support URL-encoded bodies

	app.get("/", (req, res) => {
		logRecords(records => {
			let out = "<h1>StudIO - Editor common errors</h1><br>"
			for (let record of records) {
				out += `Name: ${record.name}<br>`
				out += `Number: ${record.recurrence}<br><hr>`
			}
			res.send(out)
			res.end()
		})
	})

	app.post("/", (req, res) => {
		const name = req.body.name
		const json = req.body["JSON"]

		const record = new editorErrorJS({
			name: name,
			recurrence: 1,
			json: {
				err: json.err,
				src: json.src,
				line: json.line,
				column: json.column,
				time: json.time,
				userAgent: json.userAgent
			}
		})

		const query = { name: name }
		editorErrorJS.findOne(query, (err, r) => {
			if (r != null && err == null) {
				editorErrorJS.updateOne(query, { recurrence: r.recurrence + 1 }, (err, r) => {
					res.jsonp({
						error: "success",
						response: r.toString()
					})
					res.end()
				})
			} else {
				record.save(err => {
					if (err) {
						res.jsonp({
							error: err
						})
						res.end()
					}
					res.jsonp({
						error: "success"
					})
					res.end()
				})
			}
		})
	})
	app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`))
});
