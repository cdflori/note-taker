const fs = require("fs");


module.exports = (app) => {

    // GET "/api/notes" responds with all notes from the database
    app.get("/api/notes", function(req, res){
        fs.readFile("db/db.json", utf8, (err, data)=>{
            if (err) throw err;
            return res.json(JSON.parse(data));
        });
    });

    app.post("/api/notes",({body}, res)=>{

        fs.readFile("db/db.json", utf8, (err, data)=>{
            if (err) throw err;
            const parsedData = JSON.parse(data);
            const newNote = parsedData.concat(body);
            const stringedNote = JSON.stringify(newNote);

            fs.writeFile("db/db.json", stringedNote, (err) => {
                if (err) throw err;
                res.join(stringedNote);
            });
            
        });
        
    });

    // DELETE "/api/notes" rids of any note with an id equal req.params.id

    app.delete("/notes/:id", function(req, res){
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) throw err;
            const parsedData = JSON.parse(data);
            parsedData = parsedData.filter(obj => obj.id !== req.params.id)

            fs.writeFile(".db/db.json", JSON.stringify(parsedData), (err) => {
                if (err) throw err;
                res.json("")
            });
        });

        

    });
}
