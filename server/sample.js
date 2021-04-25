const jwt = require("jsonwebtoken");

// let token = jwt.sign({name : "Sam"}, "dbc14b4421adca6801ec245c47659da6a9537dbb4993056f92fab26696190de452afd85e1a75b64953d04a58a9ad6230b3963c1c6074c786509936ec6a11bec4", {expiresIn: "2d"})
let ver = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia29sZSIsImlkIjoiNjA4NThjOGJiYmQ1ZjgxZjVjYjFmNDFlIiwiaWF0IjoxNjE5MzY1MDAzLCJleHAiOjE2NTk1NDEwMDN9.1E3l80aAOk6ATQldFjTg4pW9J5ESvfhlW_LVFpM_A6Q", "dbc14b4421adca6801ec245c47659da6a9537dbb4993056f92fab26696190de452afd85e1a75b64953d04a58a9ad6230b3963c1c6074c786509936ec6a11bec4")
console.log(ver)