const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

//Post
app.post("/signup", (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  if ((!firstName, !lastName, !email)) {
    res.redirect("/fail.html");
    return;
  }
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          PHONE: phone
        }
      }
    ]
  };
  const postData = JSON.stringify(data);
  const options = {
    url: "https://<add yours us>.api.mailchimp.com/3.0/lists/<add your id>",
    method: "Post",
    headers: {
      Authorization: "auth <add your API>"
    },
    body: postData
  };
  request(options, (err, response, body) => {
    if (err) {
      res.redirect("/fail.html");
    } else {
      if (response.statusCode === 200) {
        res.redirect("/success.html");
      } else {
        res.redirect("/fail.html");
      }
    }
  });
});
const port = process.env.PORT || 3000;

app.listen(port, console.log(`listen on port ${port}`));
