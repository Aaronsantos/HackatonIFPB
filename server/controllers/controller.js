var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/danda');

var UsuarioSchema = new mongoose.Schema({
    idAuth: String,
    nome: String, 
    imgUrl: String,
    relaciono: String , 
    identifico: String , 
    etnia:String ,
    apelido:  String
}); 

var EventoSchema = new mongoose.Schema({
    eventId: Number,
    event: String,
    location: {
        street: String,
        district: String,
        city: String,
        url: String, 
    },
    user: {
        idAuth: String,
        nome: String, 
        imgUrl: String,
        relaciono: String , 
        identifico: String , 
        etnia:String ,
        apelido:  String
    },
    views: Number, 
    helps: Number,
    vallid: Boolean
})

var Usuario = mongoose.model('Usuario', UsuarioSchema);
var Evento = mongoose.model('Evento', EventoSchema)

const Controller = class{

    static async cadastraUsuario(novoUsuario) {
        
        let usuarios = await Usuario.find({idAuth: novoUsuario.idAuth}, function(err, usuarios){
            if(err) return console.error(err) 
        })

        if(usuarios.length > 0) {
            throw new Error("Usário já cadastrado")

        }

        var usuarioCriado = new Usuario({
            idAuth: novoUsuario.idAuth, 
            relaciono: novoUsuario.relaciono,
            identifico: novoUsuario.identifico,
            etnia: novoUsuario.etnia,
            apelido: novoUsuario.apelido,
            nome: novoUsuario.nome, 
            imgUrl: novoUsuario.imgUrl
        })
        
        
        await usuarioCriado.save() 
        
    }

    static async cadastraEvento(evento) {
        console.log("Cadastrando evento")
        var max
        await Evento.findOne({eventId : 1} ).sort(last_mod, 1).run(function (err, result){
            max = result.last_mod.eventId

        })
        console.log("Maximo : " + max)
        let NovoEvento = new Evento()
    }
  }

module.exports = Controller

