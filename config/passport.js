const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


//Load User Model
const User = require('../api/models/User');


module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password,done) => {
            //Match User
            User.findOne({email:email})
            .then(user => {
                if(!user){ return done(null,false, {message:'Diese Email ist nicht registriert'})
            }
            //Match password
            bcrypt.compare(password,user.password, (err, isMatch) =>{
                if(err) throw err;
                if(isMatch){
                    return done(null,user);
                }
                else{
                    return(null,false, {message:'Passwort stimmt nicht!'})
                }
            } );
            })
            .catch(err=>console.log(err));
        })
    ); 
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
        done(err, user);
        });
      });

}