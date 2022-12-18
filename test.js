const newMember = {
  name: "NOEL",
  team: "HI",
  position: "",
  emailAddress: ""
};

fetch("http://127.0.0.1:3000/api/members", {
  method: "POST",
  body: JSON.stringify(newMember),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.text())
  .then(result => {
    console.log(result);
  });
