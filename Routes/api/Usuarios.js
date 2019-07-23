const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../Validacion/registro");
const validateLoginInput = require("../../Validacion/login");

const Usuario = require("../../Modelos/Usuario");

// @route POST api/Usuarios/registro
// @desc Registrar usuario
// @access Public
router.post("/registro",(req,res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
       return res.status(400).json(errors);
    }

    Usuario.findOne({ email: req.body.email }).then(user => {
    if(user){
      return res.status(400).json({ email:"El email ya esta registrado" })
    } else {
       const nuevoUsuario = new Usuario({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
       });

       // Encriptamos password
       bcrypt.genSalt(10,(err,salt) => {
           bcrypt.hash(nuevoUsuario.password,salt,(err,hash) => {
              if(err) throw err;
              nuevoUsuario.password = hash;
              nuevoUsuario
                   .save()
                   .then(user => res.json(user))
                   .catch(err => console.log(err));                   
          });
        });
     }   
 });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
    Usuario.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

module.exports = router;