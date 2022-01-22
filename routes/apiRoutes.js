const router = require('express').Router();
const res = require('express/lib/response');
const fs = require('fs');

//API get request
router.get("/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) =>{
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

//API post request
router.post("/notes", (req, res) =>{
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        let yourNote = JSON.parse(data);
        if(yourNote){
            yourNote.push(req.body);
            fs.writeFile("./db/db.json", JSON.stringify(yourNote), (err) => {
                if(err) return err;
            });
        }
    });
});

//res.end();

module.exports = router;