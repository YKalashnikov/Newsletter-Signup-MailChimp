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
    url: "https://us19.api.mailchimp.com/3.0/lists/a9319b3155",
    method: "Post",
    headers: {
      Authorization: "auth 64102999d73162b735d67f074e8f761c-us19"
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
const port = process.env.PORT || 3003;

app.listen(port, console.log(`listen on port ${port}`));
