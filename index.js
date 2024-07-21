import express from "express";
import { connection } from "./database.js";
const app = express();
app.use(express.json());

app.post("/products", async (req,res)=>{
    await connection.execute(
        "INSERT INTO products (name,price) VALUES (?,?)",[req.body.name, req.body.price]
    );
    res.send("product berhasil ditambah");
})

app.put("/products/:id", async(req,res)=>{
    await connection.execute(
        "UPDATE products set name=?, price=? WHERE id=?",[req.body.name, req.body.price, req.params.id]
    );
    res.send("Product berhasil di update");
})

app.get("/products", async(req,res)=>{
    const result= await connection.query("SELECT * from products");
    res.json(result);
})

app.delete("/products/:id", async (req,res)=>{
    await connection.execute(
        "DELETE from products WHERE id=?",[req.params.id]

    )
    res.send("PRODUCT BERHASIL DIHAPUS")
})
// TANPA BASIS DATA
// let datas=[];

// app.get("/coba",(req,res)=>{
//     res.send("hello word");
// })

// app.post("/addData",(req,res)=>{
//     datas.push(req.body);
//     res.send("data berhasil ditambah");
// })

// app.get("/getData",(req,res)=>{
//     res.send(datas);
// });

// // update by index
// app.put("/updateData/:index",(req,res)=>{
//     const dataIndex=datas.findIndex((data,i)=>i == req.params.index)
//     if(dataIndex === -1){
//         res.send("data tidak ditemukan");
//     }
//     datas[dataIndex]= req.body;
//     console.log( datas[dataIndex]);
//     res.send("data berhasil diubah");
// })
// // update by id
// app.put("/updateById/:id",(req,res)=>{
//   const dataId=datas.findIndex((data)=>data.id == req.params.id);

//   if(dataId === -1){
//     res.status(404).send("data tidak ditemukan");
//   }
//   datas[dataId]={...datas[dataId], ...req.body}

//   res.send("data by id berhasil di ubah ");
// })

// app.delete("/deleteData/:index",(req,res)=>{
//     const dataIndex=datas.findIndex((data,i)=>i == req.params.index)
//     if(dataIndex === -1){
//         res.send("data tidak ditemukan");
//     }
//     datas.splice(dataIndex,1);
//     res.send("data berhasil dihapus")
// })

// // delete by id
// app.delete("/deleteById/:id",(req,res)=>{
    
//     const dataIndex=datas.findIndex((data)=>data.id == req.params.id)
//     if(dataIndex === -1){
//         res.send("data tidak ditemukan");
//     }
//     datas.splice(dataIndex,1);
//     res.send("data berhasil dihapus")
// })


// menjalankan server
app.listen(3000, ()=> console.log("server berjalan"));