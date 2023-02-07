const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mailchimp.setConfig({
  apiKey: "0c157a76571f0ea892f49f5950494417-us21",
  server: "us21"
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"\\index.html");
});

app.post("/",function(req,res){

  const listId ="61936719f4";

  const firstName=req.body.Fname;
  const lastName=req.body.Lname;
  const email=req.body.email;

  async function run() {

  try{
  const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    });

    console.log(
                `Successfully added contact as an audience member. The contact's id is ${response.id}.`
              );

              res.sendFile(__dirname + "/success.html");
          } catch (e) {
              res.sendFile(__dirname + "/failure.html");
          }
      }

      run();
});

app.post("/failure", function(req,res){
  res.redirect("/");

});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000")
});

//Api key
// 0c157a76571f0ea892f49f5950494417-us21

// list id or audience id
//  61936719f4
