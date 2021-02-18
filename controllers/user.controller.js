const passport = require("passport");
const User = require("../models/UserModel");
class UserController {

  /**
   * 
   * @param {*} req pedido do cliente.
   * @param {*} res resposta do servidor.
   */
    createUser(req, res) {
      let errors = [];
      const {
        nome,
        email,
        password,
        password2,
      } = req.body;

      /**
       * Validações
       */
      //verificar se o user ja existe....


      //Verificar se as passwords são iguais.
      if (password !== password2) {
        errors.push({ message: "As palavras-passe não são iguais!" });
      }

      //verificar se a password tem no minimo 6 caracteres.
      if (password.length < 6) {
        errors.push({
          message: "Palavra-passe deve ter no minimo 6 caracteres!",
        });
      }
      //Verificar se existe erros, se não => cria o user MAS se sim => dá render da view index e devolve os erros.
    if (errors.length > 0) {
      console.log(errors);
      //res.json({"errors" : errors, "firstname" : firstName, "lastName" : lastName, "email" : email});
      res.render("signup", { errors, nome, email });
    }else {
      User.create(nome, email, password, function(err, result) {
        if (err) throw err;
        if (result > 0) {
          req.flash("success_msg", "Conta criada! Pode agora iniciar sessão!");
          res.redirect("/signin");
        }
      });
    }

  }

  /**
   * 
   * @param {*} req pedido do cliente.
   * @param {*} res resposta do servidor.
   */
  mobileSignIn(req, res) {

  }

  mobileSignOut(req, res) {

  }

  /**
   * Função para iniciar a sessão do user.
   * @param {*} req pedido do cliente.
   * @param {*} res resposta do servidor.
   * @param {*} next 
   */
  signIn(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin",
      failureFlash: true
    })(req, res, next);
  }

  /**
   * Função para terminar sessão.
   * @param {*} req pedido do cliente.
   * @param {*} res resposta do servidor.
   */
  signOut(req, res){
    req.logout();
    res.redirect("/");
  }

}
module.exports = new UserController();