import mongoose from "mongoose";
const pedidoSchema =new mongoose.Schema({
    N_pedido:{type:String,required:true},
    nombreProducto:{type:String,required:true},
    descripcion:{type:String,required:true},
    precio:{type:Number,required:true},
    imagen:{type:String,required:true},
    estado:{type:String,enum: ["pendiente", "procesando", "enviado", "entregado", "cancelado"], default:"pendiente"},
    nombreCliente:{type:String,required:true},
    telefono:{type:Number,required:true,minlength: 10},
    edad:{type:Number,required:true,minlength: 2},
    direccion:{type:String,required:true},
    email: {type:String,required:true},
    total:{type:Number,required:true},
});

// forzamos para guardar la informacion en la coleccion de productos//
const pedido=mongoose.model("pedido",pedidoSchema,"pedido")

export default pedido;