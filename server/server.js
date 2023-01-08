// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to database
connectToDb();

// Routing
app.post("/api/signup", usersController.signup);
app.post("/api/login", usersController.login);
app.get("/api/logout", usersController.logout);
app.get("/api/check-auth", requireAuth, usersController.checkAuth);
app.get("/api/notes", requireAuth, notesController.fetchNotes);
app.get("/api/notes/:id", requireAuth, notesController.fetchNote);
app.post("/api/notes", requireAuth, notesController.createNote);
app.put("/api/notes/:id", requireAuth,  notesController.updateNote);
app.delete("/api/notes/:id", requireAuth, notesController.deleteNote);

// Start our server
app.listen(process.env.PORT);