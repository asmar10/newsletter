const bodyParser = require("body-parser")
const express = require("express")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.listen(3000, function () { console.log("Server running on 3000") })

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    let data = {
        members: [{
            "email_address": email,
            "status": "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }

        }]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/d1d1d7e2e3"
    const options = {
        method: "POST",
        auth: "asmar10:a6afa4dab14c4e347e8d49acbef75012-us21"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data))
        })
    }

    )
    request.write(jsonData)
    request.end()
})

// app.post("/failure", function (req, res) {
//     res.redirect("/")
// })

app.post("/success", function (req, res) {
    res.redirect("/")
})
//a6afa4dab14c4e347e8d49acbef75012-us21
//d1d1d7e2e3
