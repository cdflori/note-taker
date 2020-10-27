const path = require("path");
const fs = require("fs");


module.exports = (app) => {

    app.get("/api/notes", function(req, res){
        fs.readFile("db/db.json", utf8, (err, data)=>{
            if (err) throw err;
            return res.json(JSON.parse(data));
        });
    });
}

