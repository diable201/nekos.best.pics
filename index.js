const express = require("express");
const cors = require("cors");
const got = require("got");

const ENDPOINTS = require("./lib/endpoints.js");

const API_URL = "https://nekos.best/api/v2";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is a simple server to get images from nekos.best",
  });
});

app.get("/:type/:endpoint", async (req, res) => {
  let endpoint = req.params.endpoint.toLocaleLowerCase();
  let type = req.params.type.toLocaleLowerCase();
  res.set("Cache-Control", "no-cache");
  if (!Array.isArray(ENDPOINTS[type])) {
    return res.status(400).json({
      message: "Bad type",
    });
  }
  if (ENDPOINTS[type].includes(endpoint)) {
    fetchImage(endpoint, res);
  } else if (endpoint === "random") {
    endpoint =
      ENDPOINTS[type][Math.floor(Math.random() * ENDPOINTS[type].length)];
    fetchImage(endpoint, res);
  } else {
    res.status(400).json({
      message: "Bad endpoint",
    });
  }
});

async function fetchImage(endpoint, response) {
  try {
    const { results } = await got(`${API_URL}/${endpoint}`).json();
    const { url } = results[0];

    got
      .stream(url)
      .on("response", (upstream) => {
        upstream.headers["cache-control"] = "no-cache";
      })
      .on("error", (error) => {
        if (response.headersSent) {
          response.destroy();
        } else {
          response.status(500).json({
            message: error.message,
          });
        }
      })
      .pipe(response);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is listening in port" + PORT);
});

module.exports = app;
