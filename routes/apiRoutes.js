const router = require('express').Router();
const fs = require('fs');
const {v4:uuidv4} = require('uuid');
const { receiveMessageOnPort } = require('worker_threads');

//API get request
router.get("/notes", (req, res) => {
    try {
        fs.readFile("./db/db.json", "utf8", (err, data) =>{
            if (err) throw err;
            res.json(JSON.parse(data));
        }); 
    } catch (error) {
        res.json(error).status(500)
    }
});

//API post request
router.post("/notes", (req, res) =>{
    try {
        const note = {title: req.body.title, text: req.body.text, id: uuidv4()}
        console.log(note)
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let yourNote = JSON.parse(data);
            if(yourNote){
                yourNote.push(note);
                fs.writeFile("./db/db.json", JSON.stringify(yourNote), (err) => {
                    if(err) return err;
                });
            }
        });
        res.json({
            msg: "Success"
        })
    } catch (error) {
        res.json(error)
    }
});

router.delete('/notes/:id', (req, res) => {
    try {
        fs.readFile("./db/db.json", "utf8", (err, data) =>{
            if (err) throw err;
            const array = JSON.parse(data);
            const newArray = array.filter(note => note.id !== req.params.id)
            console.log(newArray)
            fs.writeFile("./db/db.json", JSON.stringify(newArray), (err) => {
                 if(err) return err;
            })
        }) 
        res.json({msg: 'success'});
    } catch (error) {
        res.json(error)
    }
});



module.exports = router;