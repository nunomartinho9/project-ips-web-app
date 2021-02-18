const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

//Criar a estratégia
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      function (email, password, done) {

        //Comparar email do utilizador com o da base de dados
        User.findOne({ email: email }, function (err, user) {
          if (err) throw err;
          if (!user.length) {
            return done(null, false, {
              message: "Esse email não foi registado",
            });
          }
          
          //Comparar a password recebida com a da base de dados
          bcrypt.compare(
            password,
            user[0].password,
            function (err, isMatch) {
              if (err) throw err;

              if (isMatch) {
                return done(null, user[0]);
              } else {
                return done(null, false, {
                  message: "Email e/ou password incorreto/s",
                });
              }
            }
          );
          passport.serializeUser(function (user, done) {
            done(null, user.user_id);
          });
          passport.deserializeUser(function (id, done) {
            User.findOne({ user_id: id }, function (err, user) {
              done(err, user);
            });
          });
        });
      }
    )
  );
};
