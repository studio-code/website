const jsondb = require('node-json-db');

const db = new jsondb("editorErrorJS", true, true);

const model = {
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
}

function logRecords(callback, res) {
	try {
		const data = db.getData("/db");
		callback(data)
	} catch (error) {
		// The error will tell you where the DataPath stopped. In this case test1
		// Since /test1/test does't exist.
		console.error(error);
		res.end(error)
	};
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
		records.forEach((record, i) => {
			out += `Name: <a href="/${i}">${record.name}</a><br>`
			out += `Number: ${record.recurrence}<br><hr>`
		})
		res.send(out)
		res.end()
	}, res)
})

app.post("/", (req, res) => {
	const name = req.body.name
	const json = req.body["JSON"]

	const record = {
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
	}

	const query = {
		name: name
	}
	logRecords(records => {
		records.forEach((r, i) => {
			if (r.name == name) {
				record.recurrence = r.recurrence + 1
				db.delete(`/db[${i}]`)
			}
		})
	}, res)
	db.push(`/db[]`, record)

	res.jsonp({
		error: "success"
	})
	res.end()
})

app.delete("/", (req, res) => {
	const i = req.body.id

	db.delete(`/db[${i}]`)

	res.end(0)
})

app.get("/:id", (req, res) => {
	const i = req.params.id

	const data = db.getData(`/db[${i}]`)
	res.jsonp(data)
	res.end()
})

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`))
