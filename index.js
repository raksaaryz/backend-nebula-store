import express from "express";
import { connection } from "./database.js";
const app = express();
app.use(express.json());

app.post("/products", async (req, res) => {
  try {
    await connection.execute(
      "INSERT INTO products (id,name,price) VALUES (?,?,?)",
      [req.body.id, req.body.name, req.body.price]
    );
    res.send("UHUY PRODUCT BERHASIL DITAMBAH !");
  } catch (error) {
    console.log(error);
    res.send("ID NYA GABOLEH SAMA BRAY");
  }
});

// Get By Id
app.get("/products/:id", async (req, res) => {
  try {
    const result = await connection.query(
      "SELECT * from products where id=?",
      [req.params.id]
    );
    if (result.length == 0) res.status(404).send("Id Tidak Ditemukan");
    res.json(result);
  } catch (error) {
    // res.status(404).send("Id Tidak Ditemukan");
  }
});

app.put("/products/:id", async (req, res) => {
  await connection.execute("UPDATE products set name=?, price=? WHERE id=?", [
    req.body.name,
    req.body.price,
    req.params.id,
  ]);
  res.send("Product berhasil di update");
});

app.get("/products", async (req, res) => {
  const result = await connection.query("SELECT * from products");
  res.json(result);
});

app.delete("/products/:id", async (req, res) => {
  try {
    await connection.execute("DELETE from products WHERE id=?", [
      req.params.id,
    ]);
    res.send("PRODUCT BERHASIL DIHAPUS");
  } catch (error) {
    res.send("Id tidak dapat ditemukan");
  }
});

// menjalankan server
app.listen(3000, () => console.log("server berjalan"));