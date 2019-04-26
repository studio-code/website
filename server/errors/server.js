const CloudKit = require("./cloudkit.js")
const fetch = require("node-fetch");

CloudKit.configure({
	services: {
		fetch: fetch,
		// logger: console
	},
	containers: [{
		containerIdentifier: "iCloud.com.ArthurG.StudIO",
		// serverToServerKeyAuth: {
		//
		// 	// This is the key ID you generated in CloudKit Dashboard.
		// 	keyID: "3c0075a617681c67fd31b8530d203e18c5d7a3829bc716e4ed2eaa6c0ee9be45",
		//
		// 	// This should reference the private key file that you used to
		// 	// generate the above key ID.
		// 	privateKeyFile: __dirname + "/eckey.pem"
		//
		// },
		apiTokenAuth: {
			apiToken: "24b8f629f9d82fd2df910ebd946892133b9b0b9e5f3b8b55ac858164a7103f88"
		},
		environment: "development"
	}]
})

const container = CloudKit.getDefaultContainer();
const publicDB = container.publicCloudDatabase;

const express = require("express")
const app = express()
const port = 3000

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get("/", (req, res) => {
	publicDB.performQuery({
		recordType: "EditorJSError"
	}).then(function(response) {
		const records = response.records
		let out = "<h1>StudIO - Editor common errors</h1><br>"
		for (let record of records) {
			out += `Name: ${record.fields.name.value}<br>`
			out += `Number: ${record.fields.recurrence.value}<br><hr>`
		}
		res.send(out)
		res.end()
	}).catch(function(error) {
		console.log(error)
		res.end(error)
	})
})

app.post("/", (req, res) => {
	const name = req.body.name
	const json = req.body["JSON"]

	const record = {
		recordType: "EditorJSError",
		fields: {
			name: {
				value: name
			},
			"JSON": {
				value: json
			},
			recurrence: {
				value: 1
			}
		}
	}

	publicDB.performQuery({
		recordType: "EditorJSError"
	}).then(function(response) {
		const records = response.records

		for (let r in records) {
			if (r.fields.name.value == name) {
				record.recordName = r.recordName
				record.recordChangeTag = r.recordChangeTag

				record.fields.recurrence.value += r.fields.recurrence.value
			}
		}

		publicDB.saveRecords(record).then(response => {
			res.jsonp({
				error: "success",
				response: response.toString()
			})
			res.end()
		}).catch(function(error) {
			console.log(error)
			res.jsonp({
				error: error
			})
			res.end()
		})
	}).catch(function(error) {
		console.log(error)
		res.end(error)
	})
})
app.listen(port, () => console.log(`App listening on port ${port}!`))
