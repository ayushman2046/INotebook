const express = require("express");
const fetchUser = require("../miidleware/fetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Notes = require("../models/Notes");
const { render } = require("@testing-library/react");
const { findById } = require("../models/Notes");
//Route 1 : get all the notes using get api/auth/fetchallnotes login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {

  try{
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);

    }catch (error) {
    console.log(error.massage);
    res.status(500).send({ error: "Internal server error" });
  }
});


//Route 2: Add a new note using get api/auth/addnotes login required
router.post("/addnotes", fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description","description must conatain at least 10 character").isLength({ min: 3 }),
  ],async (req, res) => {
    try{
        const { title,description,tag } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title,description,tag, user:req.user.id
    })
    const savednotes = await note.save()
    res.json(savednotes);
  } catch (error) {
    console.log(error.massage);
    res.status(500).send({ error: "Internal server error" });
  }
});



// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const {title, description, tag} = req.body;
  // Create a newNote object
  try{const newNote  = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  // Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json(note);}
  catch (error) {
    console.log(error.massage);
    res.status(500).send({ error: "Internal server error" });
  }
  
  })

// ROUTE 4: Delete an existing note using "/api/notes/deletenotes" login required
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
  const {title, description, tag} = req.body;
  // Create a newNote object

  try{// Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id)
  res.json({"success" : "note has been deleted", note : note});}
  catch (error) {
    console.log(error.massage);
    res.status(500).send({ error: "Internal server error" });
  }
  })


module.exports = router