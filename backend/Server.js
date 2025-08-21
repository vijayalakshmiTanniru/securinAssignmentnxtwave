const express = require("express");
const app = express();
const pool = require("./db");
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Helper to parse numbers
const parseNumber = (value) => (isNaN(value) ? null : Number(value));

// Load JSON into DB
app.get("/api/load", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("recipes.json", "utf-8"));
  for (const recipe of data) {
    await pool.query(
      `INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        recipe.cuisine,
        recipe.title,
        parseNumber(recipe.rating),
        parseNumber(recipe.prep_time),
        parseNumber(recipe.cook_time),
        parseNumber(recipe.total_time),
        recipe.description,
        JSON.stringify(recipe.nutrients),
        recipe.serves,
      ]
    );
  }
  res.send("Recipes loaded successfully!");
});

// Get all recipes (Paginated)
app.get("/api/recipes", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const totalResult = await pool.query("SELECT COUNT(*) FROM recipes");
  const total = parseInt(totalResult.rows[0].count);

  const data = await pool.query(
    "SELECT * FROM recipes ORDER BY rating DESC NULLS LAST LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  res.json({ page, limit, total, data: data.rows });
});

// Search Recipes
app.get("/api/recipes/search", async (req, res) => {
  const { calories, title, cuisine, total_time, rating } = req.query;
  let conditions = [];
  let values = [];

  if (calories) {
    const operator = calories.match(/[><=]+/)[0];
    const value = calories.replace(operator, "");
    conditions.push(`(nutrients->>'calories')::int ${operator} $${values.length + 1}`);
    values.push(value);
  }
  if (title) {
    conditions.push(`title ILIKE $${values.length + 1}`);
    values.push(`%${title}%`);
  }
  if (cuisine) {
    conditions.push(`cuisine = $${values.length + 1}`);
    values.push(cuisine);
  }
  if (total_time) {
    const operator = total_time.match(/[><=]+/)[0];
    const value = total_time.replace(operator, "");
    conditions.push(`total_time ${operator} $${values.length + 1}`);
    values.push(value);
  }
  if (rating) {
    const operator = rating.match(/[><=]+/)[0];
    const value = rating.replace(operator, "");
    conditions.push(`rating ${operator} $${values.length + 1}`);
    values.push(value);
  }

  const query = `SELECT * FROM recipes ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""} ORDER BY rating DESC`;
  const result = await pool.query(query, values);
  res.json({ data: result.rows });
});

app.listen(3001, () => console.log("Server running on port 3001"));
const express = require("express");
const app = express();
const pool = require("./db");
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Helper to parse numbers
const parseNumber = (value) => (isNaN(value) ? null : Number(value));

// Load JSON into DB
app.get("/api/load", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("recipes.json", "utf-8"));
  for (const recipe of data) {
    await pool.query(
      `INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        recipe.cuisine,
        recipe.title,
        parseNumber(recipe.rating),
        parseNumber(recipe.prep_time),
        parseNumber(recipe.cook_time),
        parseNumber(recipe.total_time),
        recipe.description,
        JSON.stringify(recipe.nutrients),
        recipe.serves,
      ]
    );
  }
  res.send("Recipes loaded successfully!");
});

// Get all recipes (Paginated)
app.get("/api/recipes", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const totalResult = await pool.query("SELECT COUNT(*) FROM recipes");
  const total = parseInt(totalResult.rows[0].count);

  const data = await pool.query(
    "SELECT * FROM recipes ORDER BY rating DESC NULLS LAST LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  res.json({ page, limit, total, data: data.rows });
});

// Search Recipes
app.get("/api/recipes/search", async (req, res) => {
  const { calories, title, cuisine, total_time, rating } = req.query;
  let conditions = [];
  let values = [];

  if (calories) {
    const operator = calories.match(/[><=]+/)[0];
    const value = calories.replace(operator, "");
    conditions.push(`(nutrients->>'calories')::int ${operator} $${values.length + 1}`);
    values.push(value);
  }
  if (title) {
    conditions.push(`title ILIKE $${values.length + 1}`);
    values.push(`%${title}%`);
  }
  if (cuisine) {
    conditions.push(`cuisine = $${values.length + 1}`);
    values.push(cuisine);
  }
  if (total_time) {
    const operator = total_time.match(/[><=]+/)[0];
    const value = total_time.replace(operator, "");
    conditions.push(`total_time ${operator} $${values.length + 1}`);
    values.push(value);
  }
  if (rating) {
    const operator = rating.match(/[><=]+/)[0];
    const value = rating.replace(operator, "");
    conditions.push(`rating ${operator} $${values.length + 1}`);
    values.push(value);
  }

  const query = `SELECT * FROM recipes ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""} ORDER BY rating DESC`;
  const result = await pool.query(query, values);
  res.json({ data: result.rows });
});

app.listen(3001, () => console.log("Server running on port 3001"));
