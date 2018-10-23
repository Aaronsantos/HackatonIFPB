var Controller = require('./../controllers/controller')

var appRouter = function (app) {

    app.get("/", function(req, res) {

      res.status(200).send("Welcome to our restful API");
    });

    app.get("/emergencias", function(req,res) {


      res.status(200).send("todas emergencias")
    });

    app.get("/emergencia/:num", function(req, res) {

      var num = req.params.num
      res.status(200).send(` Numero: ${num}`)
    });

    app.post("/emergencia", async function(req, res) {

      var tipo = {event : req.body.event}
      console.log("Rota cadastra evento")
      await Controller.cadastraEvento(tipo)
      
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
    
  }


  module.exports = appRouter;