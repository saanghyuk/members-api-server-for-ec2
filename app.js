const express = require("express");
const app = express();

const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(cors());

// app.use(express.static("ab180_commerce"));

const members_json = fs.readFileSync("members.json", "utf8");
let members = JSON.parse(members_json);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

app.get("/api/members", (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = members.filter(m => m.team == team);
    res.status(200).send(teamMembers);
  } else {
    res.status(200).send(members);
  }
  // res.send(members);
});

app.get("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const member = members.find(m => m.id == Number(id));
  if (member) {
    res.status(200).send(member);
  } else {
    res.status(404).send({ message: "There is no such member" });
  }
});

//
app.post("/api/members", (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  fs.writeFileSync("members.json", JSON.stringify(members));
  res.status(200).send(newMember);
});

app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find(m => m.id === Number(id));
  if (member) {
    Object.keys(newInfo).forEach(prop => {
      member[prop] = newInfo[prop];
    });
    fs.writeFileSync("members.json", JSON.stringify(members));
    res.status(200).send(member);
  } else {
    res.status(404).send({ message: "There is no member with the id" });
  }
});

app.delete("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const membersCount = members.length;
  members = members.filter(member => member.id !== Number(id));

  if (members.length <= membersCount) {
    res.status(200).send({ message: "Deleted" });
    fs.writeFileSync("members.json", JSON.stringify(members));
  } else {
    res.status(404).sendFile({ message: "There is no member with the id" });
  }
});

app.delete("/api/members", (req, res) => {
  const membersCount = members.length;
  fs.writeFileSync("members.json", JSON.stringify([]));
  res.status(200).send({ message: `${membersCount} members deleted` });
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
