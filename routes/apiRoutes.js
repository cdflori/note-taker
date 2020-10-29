const fs = require("fs");
const UUID = require("uuid");

module.exports = (app) => {

    // GET "/api/notes" responds with all notes from the database
    app.get("/api/notes", function(req, res){
        fs.readFile("db/db.json", "utf8", (err, data)=>{
            if (err) throw err;
            parsedData = JSON.parse(data)
            return res.json(parsedData);
        });
    });

    app.post("/api/notes",(req, res)=>{
        const note = req.body
        note.id = UUID.v1();
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let parsedData = JSON.parse(data);
            parsedData.push(note);
            // let stringedNote = JSON.stringify(parsedData);


            fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
                if (err) throw err;
                return res.json(note)
                // res.json(JSON.parse(stringedNote));
            });
            
        });
        
    });

    // DELETE "/api/notes" rids of any note with an id equal req.params.id

    app.delete("/notes/:id", function(req, res){
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) throw err;
            let parsedData = JSON.parse(data);
            parsedData = parsedData.filter(parsedData => parsedData.id !== req.params.id)

            fs.writeFile(".db/db.json", JSON.stringify(parsedData), (err) => {
                if (err) throw err;
                res.json(parsedData)
            });
        });

        

    });
};
