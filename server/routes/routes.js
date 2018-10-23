var Controller = require('./../controllers/controller')

var appRouter = function (app) {

    app.get("/", function(req, res) {

      res.status(200).send("Welcome to our restful API");
    });

    app.get("/emergencias", async function(req,res) {

      res.setHeader('content-Type', 'application/json' );
      eventos = await Controller.pegaTodosEventos()
      res.status(200).send(JSON.stringify(eventos))
    });

    app.get("/emergencia/:num", function(req, res) {

      var num = req.params.num
      res.status(200).send(` Numero: ${num}`)
    });

    app.post("/emergencia", async function(req, res) {

      var novoEvento = {
        eventId: req.body.eventId,
        event: req.body.event,
        started: req.body.started, 
        vallid: true,
        location: {
            street: req.body.street,
            district: req.body.district,
            city: req.body.city,
            url: req.body.locationUrl, 
        },
        user: {
            idAuth: req.body.userid,
            nome: req.body.userNome, 
            imgUrl: req.body.userImg,
            relaciono: req.body.userRel , 
            identifico: req.body.userIdent , 
            etnia: req.body.userEtnia ,
            apelido:  req.body.userApelido
        },
        views: 0, 
        helps: 0
    }
      console.log("Rota cadastra evento")
      await Controller.cadastraEvento(evento)
      res.status(200).send
      
    });
    
    app.post("/usuario",  async function(req,res) {

      console.log("Post usuario")
      console.log(req.body)
      const usuario = {
        idAuth: req.body.idAuth,
        relaciono: req.body.relaciono, 
        identifico: req.body.identifico, 
        etnia: req.body.etnia,
        apelido: req.body.apelido,
        nome: req.body.nome,
        imgUrl: req.body.imgUrl, 
      }


      try{
        console.log("Chamando controller")
        await Controller.cadastraUsuario(usuario)
        console.log("Depois chamada controller")
      }catch(err) {

        console.log("Erro")
        res.status(400).send()
      }

      res.status(200).send()
    });


    app.post("/emergencia/:num/ajudar", async function(req,res) {

      let num = req.params.num 

      await Controller.ajudar(num)

    })
    
  }


  module.exports = appRouter;