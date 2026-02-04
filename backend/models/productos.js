import mongoose from "mongoose";
const productShema =new mongoose.Schema({
    productId:{type:String,required:true,unique:true},
    Nombre:{type:String,required:true},
    Descripcion:{type:String,required:true},
    Precio:{type:Number,required:true},
    Image:{type:String,required:true},
});

// forzamos para guardar la informacion en la coleccion de productos//
const Product=mongoose.model("productos",productShema,"productos")

export default Product;