const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const dbPath = path.join(__dirname, '../db/db.json');

const readNotes = () => {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
};

const writeNotes = (notes) => {
    fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
};

router.get('/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const notes = readNotes();
    const newNote = { id: uuidv4(), ...req.body };
    notes.push(newNote);
    writeNotes(notes);
    res.json(newNote);
});


router.delete('/notes/:id', (req, res) => {
    let notes = readNotes();
    notes = notes.filter(note => note.id !== req.params.id);
    writeNotes(notes);
    res.json({ ok: true });
});

module.exports = router;
