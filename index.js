const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const fileUpload = require('express-fileupload')
const app = express();
app.use(express.json())
app.use(fileUpload())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));


let users =[
    {id:1,name : "ketan"},
    {id:2,name : "Dipak"},
    {id:3,name : "ketu"},
]
app.get("/string", (req, res) => {
  return res.status(200).send("This is a string");
});
app.get("/user", (req, res) => {
    const obj = {id:1,name : "ketan"}
  return res.status(200).send(obj);
});
app.get("/users", (req, res) => {
   
  return res.status(200).send(users);
});
app.get("/users/:id", (req, res) => {
   const user = users.find(e=>e.id == parseInt(req.params.id))
  return res.status(200).send(user);
});
app.post("/create", (req, res) => {
   users = [req.body, ...users]
  return res.status(200).send(users);
});

app.get("/usersQuery", (req, res) => {
    const user = users.find(e=>e.id == parseInt(req.query.id))
   return res.status(200).send(user);
 });

 app.post('/upload',(req,res)=>{
    const file = req.files.file
    let path = __dirname + "/upload/" + file.name + Date.now() + ".jpg"
    file.mv(path,(err)=>{
        res.send("Ok")
    })
 })
app.listen(4000, () => {
  console.log("Server is Running On PORT : 4000");
});
