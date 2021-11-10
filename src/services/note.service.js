const fs = require("fs");
const chalk = require("chalk");

const getNote = (title) => {
      const previousNotes = [...fetchAllNotes()];
      const existingNote = previousNotes.find(
            (note) => note.title.toLowerCase() === title.trim().toLowerCase()
      );

      existingNote
            ? console.log(chalk.bold.green(`Found ${title}!`))
            : console.log(chalk.inverse.grey("Note title not found"));
      return existingNote;
};

const getNotes = () => {
      const previousNotes = [...fetchAllNotes()].map((note) => note.title);
      console.log(chalk.bold.green("Notes List\n"), notes);
      return previousNotes;
};

const addNote = (title = "", body = "") => {
      let previousNotes = [...fetchAllNotes()];

      const existingNote = previousNotes.find(
            (note) => note.title.trim().toLowerCase() === title.trim().toLowerCase()
      );

      if (!existingNote) {
            const note = {
                  id: previousNotes.length + 1,
                  title,
                  body,
            };
            previousNotes = [...previousNotes, note];
            console.log(chalk.bold.green("Note added!"));
            saveNotes(previousNotes);
      } else {
            console.log(chalk.bold.red("title already taken"));
      }
};

const saveNotes = (notes = []) => {
      if (Array.isArray(notes)) {
            const notesJson = JSON.stringify(notes);
            fs.writeFileSync("notes.json", notesJson);
      }
};

const removeNote = (title) => {
      try {
            const notes = [...fetchAllNotes()];

            const remainingNotes = notes.filter(
                  (note) => note.title.toLowerCase() !== title.toLowerCase()
            );

            if (remainingNotes.length < notes.length) {
                  console.log(chalk.bold.green("Notes removed!"));
                  saveNotes(remainingNotes);
                  return remainingNotes;
            } else if (remainingNotes.length === notes.length) {
                  console.log(chalk.bold.red("No note found!"));
            }
      } catch ({ message }) {
            console.log(chalk.bold.yellow(message));
      }
};

const updateNote = (note = {}) => {
      let previousNotes = [...fetchAllNotes()];

      const index = previousNotes.findIndex(({ id }) => id === parseInt(note.id));

      if (index < 0) {
            console.log(chalk.bold.grey("Note with the given index not found"));
            return;
      } else {
            previousNotes[index] = {
                  ...previousNotes[index],
                  title: note.title || "No title",
                  body: note.body || "No body",
            };
            saveNotes(previousNotes);
      }
};

const fetchAllNotes = () => {
      try {
            const dataBuffer = fs.readFileSync("./db/notes.json");
            const dataToJson = dataBuffer.toString();
            const data = JSON.parse(dataToJson);
            return data;
      } catch ({ message }) {
            // create an empty array
            // for no existent file
            return [];
      }
};

const NoteService = {
      addNote,
      removeNote,
      updateNote,
      getNote,
      getNotes,
};

module.exports = NoteService;
