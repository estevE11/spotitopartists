const path = require("path");

const express = require("express");
const app = express();

const top_artists = require("./top_artists");

const PORT = 80;

app.listen(PORT, () => {
    console.log("Listening to " + PORT);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/:playlist_id", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/playlisttop/:playlist_id", async (req, res) => {
    const top = await top_artists(req.params.playlist_id);
    res.send(top);
});