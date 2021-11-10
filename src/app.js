const yargs = require("yargs");
const noteUtils = require("./notes");

// Add

yargs.command({
      command: "add",
      description: "Add a new note",
      builder: {
            title: {
                  description: "note title",
                  demand: true,
                  type: "string",
            },
            body: {
                  description: "note body",
                  demand: true,
                  type: "string",
            },
      },
      handler(argv) {
            noteUtils.addNote(argv.title, argv.body);
      },
});

//Remove

yargs.command({
      command: "remove",
      description: "Remove an existing note",
      builder: {
            title: {
                  description: "note title",
                  demand: true,
                  type: "string",
            },
      },
      handler(argv) {
            noteUtils.removeNote(argv.title);
      },
});

// Read

yargs.command({
      command: "read",
      description: "Get an existing note",
      builder: {
            title: {
                  description: "note title",
                  demand: true,
                  type: "string",
            },
      },
      handler(argv) {
            noteUtils.getNote(argv.title);
      },
});

// List
yargs.command({
      command: "list",
      description: "Get all notes",
      handler() {
            noteUtils.getNotes();
      },
});

// Update
yargs.command({
      command: "update",
      description: "Update a note",
      builder: {
            title: {
                  description: "note title",
                  demand: false,
                  type: "string",
            },
            body: {
                  description: "note body",
                  demand: false,
                  type: "string",
            },
      },
      handler(argv) {
            noteUtils.updateNote({ title: argv.title, body: argv.body });
      },
});

console.log("yargs argv =>", yargs.argv);
