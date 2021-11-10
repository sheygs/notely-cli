const fs = require("fs");
const chalk = require("chalk");

const getNote = (title) => {
      const notes = [...loadNotes()];
      const existingNote = notes.find(
            (note) => note.title.toLowerCase() === title.trim().toLowerCase()
      );

      existingNote
            ? console.log(chalk.bold.green(`Found ${title}!`))
            : console.log(chalk.inverse.grey("Note title not found"));
      return existingNote;
};

const getNotes = () => {
      const notes = [...loadNotes()].map((note) => note.title);
      console.log(chalk.bold.green("Notes List\n"), notes);
      return notes;
};

const addNote = (title, body) => {
      debugger;
      let notes = [...loadNotes()];

      const existingNote = notes.find(
            (note) => note.title.trim().toLowerCase() === title.trim().toLowerCase()
      );

      if (!existingNote) {
            const note = {
                  id: notes.length + 1,
                  title: title || "",
                  body: body || "",
            };
            notes = [...notes, note];
            console.log(chalk.bold.green("Note added!"));
            saveNotes(notes);
      } else {
            console.log(chalk.bold.red("title already taken"));
      }
};

const saveNotes = (notes) => {
      if (Array.isArray(notes)) {
            const notesJson = JSON.stringify(notes);
            fs.writeFileSync("notes.json", notesJson);
      }
};

const removeNote = (title) => {
      try {
            const notes = [...loadNotes()];

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

const updateNote = (note) => {};

const loadNotes = () => {
      try {
            const dataBuffer = fs.readFileSync("notes.json");
            const dataToJson = dataBuffer.toString();
            const data = JSON.parse(dataToJson);
            return data;
      } catch ({ message }) {
            // create an empty array
            // for no existent file
            return [];
      }
};

module.exports = {
      addNote,
      removeNote,
      updateNote,
      getNote,
      getNotes,
};
