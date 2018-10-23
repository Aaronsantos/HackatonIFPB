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
    started: Date, 
    vallid: Boolean,
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
        
        let max =  await Evento.findOne().sort("-eventId")
        console.log(max)

        if(max != null) evento.eventId = max.eventId + 1 
        else evento.eventId = 1 

        let novoEvento =  new Evento(evento)
        await novoEvento.save()
    }

    static async pegaTodosEventos() {

        let eventos =  await Evento.find({})

        eventosFiltrados = eventos.map( event => {
            return {
                eventId :event.eventId,
                event: event.event,
                started: event.started,
                valid: event.valid
            }
        })
        return eventosFiltrados
    }

    static async pegaEvento(id) {

        
        evento  = await Event.find({eventId : id})
        evento.views = evento.views + 1 

        evento.update({eventId: evento.eventId}, {views: evento.views})
        return evento 

    }

    static async ajuda(id) {

        evento = await Event.find({eventId : id})

        evento.helps = evento.helps++ 
        if(evento.helps < 10) await evento.update({eventId : evento.eventId}, {helps: evento.helps})
        else await evento.update({eventId : evento.eventId}, {helps: evento.helps, valid: false})

        
    }

  }

  module.exports = Controller





