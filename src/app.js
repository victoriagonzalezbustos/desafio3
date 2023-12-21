
const PUERTO = 8080

const express = require("express")

const app = express()

//creo ruta raiz

app.get("/", (req, res) => {
    res.send("server con express")
})




// desafio 3

const ProductManager = require("./product_manager.js")

const manager = new ProductManager("./src/products.json")

//limite

app.get("/products", async (req, res) => {

    let limit = parseInt(req.query.limit);

    let productos = await  manager.leerArchivo()
    
    if(limit){
        productosAcotados = productos.slice(0,limit)
        res.send(productosAcotados)
    }else{
        res.send(productos)
    }
    
})

//filtro por id

app.get("/products/:id", async (req, res) =>{

    let id = parseInt(  req.params.id)
    let productos = await  manager.leerArchivo()

    productoBuscado = productos.find(item => item.id == id)

    if (id){
        res.send(productoBuscado)
    }else{
        res.send("nada que mostrar")
    }



})

// pongo a escuchar el servidor

app.listen(PUERTO, () => {
    console.log(`escuchando en http://localhost:${PUERTO}`)
})



