const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creamos schema 

const UsuarioSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  date:{
      type:Date,
      default:Date.now
  }
});

module.exports = Usuario = mongoose.model("usuarios",UsuarioSchema)