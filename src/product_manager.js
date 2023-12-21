const { error } = require("console")
const { json } = require("stream/consumers")

const fs = require("fs").promises


class ProductManager{

    static ultimoid = 0

    constructor(path){
        this.products =[]
        this.path = path
    }

    async addProduct(nuevoObjeto){
        let {titulo, descripcion, precio, img, codigo, stock} = nuevoObjeto

        if(!titulo || !descripcion || !precio || !img ||!codigo || !stock  ){
            console.log("Todos los campos son obligatorios")
            return
        }

        if(this.products.some(item => item.codigo === codigo)){
            console.log("ya existe un producto con ese codigo")
            return
        }

        const newProduct = {
            id : ++ProductManager.ultimoid,
            titulo,
            descripcion,
            precio,
            img,
            codigo,
            stock,

        }

        this.products.push(newProduct)

        await this.guardarArchivo(this.products)

    }


    getProducts(){
        console.log(this.products)
    }

    async getProductByID (id){

        try{
            const arrayProductos = await this.leerArchivo()

            const buscado = arrayProductos.find(item => item.id === id)

            if (!buscado){
                console.log("producto no encontrado")

            }else{
                console.log("producto encontrado")
                return buscado 
            }
        } catch(error){
            console.log("Error al leer archivo", error)
        }

        const producto = this.products.find(item => item.id === id)

        if(!producto){
            console.log("producto no encontrado")
        } else{
            console.log("Producto encontrado: ", producto )
        }
    }

    deleteProducts (){
        this.products = []
    }

    async leerArchivo(){
        try{
            const respuesta = await fs.readFile(this.path, "utf-8")
            const arrayProductos = JSON.parse(respuesta)
            return arrayProductos

        } catch(error){
            console.log(error)
        }
    }

    async guardarArchivo(arrayProductos){
        try{
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
        }catch(error){
            console.log("error al guardar el archivo", error)

        }
    }

    async updateProduct(id, ProductoActualizado){
        try {

            const arrayProductos = await this.leerArchivo()

            const index = await arrayProductos.findIndex(item => item.id === id)

            if(index !== -1){
                arrayProductos.splice(index,1,ProductoActualizado)
                await this.guardarArchivo(arrayProductos)
            }
            
        } catch (error) {
            console.log("error al actualizar el producto", error)
        }
    }

    async updateProduct(id, ProductoActualizado){
        try {

            const arrayProductos = await this.leerArchivo()

            const index = arrayProductos.findIndex(item => item.id === id)

            if(index !== -1){
                arrayProductos.splice(index,1,ProductoActualizado)
                await this.guardarArchivo(arrayProductos)
            }else{
                console.log("no existe un producto con ese id")
            }
            
        } catch (error) {
            console.log("error al actualizar el producto", error)
        }
    }


}


module.exports = ProductManager