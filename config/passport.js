//**************************************************
//Modules
//**************************************************

var Innovator = require("../models/innovator");
// var msgService = require(process.env.msgApiName)(process.env.msgAuthKey, process.env.msgPara1, process.env.msgPara2);

// const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const GitHubStrategy = require("passport-github2").Strategy;

//**************************************************
//Helper
//**************************************************

const genOTP = () => {
  OTP = Math.floor(Math.random() * 10000);
  if (OTP < 999) {
    return genOTP();
  } else {
    return OTP;
  }
};

//**************************************************
//Configuation
//**************************************************

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Innovator.findById(id, function (err, userFound) {
      done(err, userFound);
    });
  });

  //**************************************************
  //User Registration
  //**************************************************

  var LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        process.nextTick(function () {
          Innovator.findOne({ email: req.session.email }, function (err, result) {
            if (err || !result) {
              done("Server Error!");
            } else if (result.otp != otp) {
              done("Wrong OTP! Please try again");
            } else {
              done(null, result);
            }
          });
        });
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        process.nextTick(function () {
          Innovator.findOne({ email: req.session.email }, function (err, result) {
            if (err || !result) {
              done("Server Error!");
            } else if (result.otp != otp) {
              done("Wrong OTP! Please try again");
            } else {
              result.otpVerified = true;
              result.save((err) => {
                if (err) done("Server Error");
                else done(null, result);
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    "register-otp",
    new LocalStrategy(
      {
        usernameField: "phone",
        passwordField: "phone",
        passReqToCallback: true,
      },
      function (req, phone, email, done) {
        process.nextTick(function () {
          User.findOne({ phone: phone }, function (err, result) {
            if (err) {
              done("Server Error");
            } else if (result && result.otpVerified) {
              done("User Exists", null, "User Already Exists");
            } else if (result) {
              var otp = genOTP();
              console.log(otp);

              result.username = req.body.username;
              // result.email = req.body.username
              result.phone = phone;
              result.timestamp = new Date();
              result.otp = otp;

              result.save((err) => {
                if (err) done("User not created");
                else
                  msgService.send(
                    Number(phone),
                    "Your OTP for Kvest Login is: " + otp,
                    function (err, response) {
                      if (err) {
                        done("Please check your phone number!");
                      } else {
                        done(null, result);
                      }
                    }
                  );
              });
            } else {
              var otp = genOTP();
              console.log(otp);

              var user = new User();

              user.username = req.body.username;
              // user.email = req.body.username
              user.phone = phone;
              user.timestamp = new Date();
              user.otp = otp;

              user.save((err) => {
                if (err) done("User not created");
                else
                  msgService.send(
                    Number(phone),
                    "Your OTP for Kvest Login is: " + otp,
                    function (err, response) {
                      if (err) {
                        done("Please check your phone number!");
                      } else {
                        done(null, user);
                      }
                    }
                  );
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    "login-otp",
    new LocalStrategy(
      {
        usernameField: "phone",
        passwordField: "phone",
        passReqToCallback: true,
      },
      function (req, phone, email, done) {
        process.nextTick(function () {
          User.findOne(
            { phone: phone, otpVerified: true },
            function (err, result) {
              if (err || !result) {
                done("User doesn't exist");
              } else {
                var otp = genOTP();
                console.log(otp);

                result.otp = otp;

                result.save((err) => {
                  if (err) done("OTP not created");
                  else
                    msgService.send(
                      Number(phone),
                      "Your OTP for Kvest Login is: " + otp,
                      function (err, response) {
                        console.log(err, response);
                        if (err) {
                          done("Please check your phone number!");
                        } else {
                          done(null, result);
                        }
                      }
                    );
                });
              }
            }
          );
        });
      }
    )
  );

  //**************************************************
  //Google Registration
  //**************************************************

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_ID,
//         clientSecret: process.env.GOOGLE_SECRET,
//         callbackURL: process.env.DOMAIN + "/google/callback",
//       },
//       (token, refreshToken, profile, done) => {
//         User.findOne({ email: profile.emails[0].value }, (err, user) => {
//           if (err) throw err;
//           if (user) {
//             Innovator.updateOne(
//               { email: profile.emails[0].value },
//               { $set: { eIsVerified: true } }
//             ).then((dod) => {
//               return done(null, user);
//             });
//           } else {
//             let username =
//               profile.emails[0].value.split("@")[0].toLocaleLowerCase() +
//               Math.floor(1000 + Math.random() * 9000);

//             var newUser = new User({
//               email: profile.emails[0].value,
//               username: username,
//               password: "abnhihoga",
//               userType: "innovator",
//               secretToken: profile.id,
//             });

//             User.createUser(newUser, function (err, userCreated) {
//               if (err) throw err;

//               var newU = new Innovator({
//                 email: profile.emails[0].value,
//                 username: username,
//                 name: profile.displayName,
//                 uType: "innovator",
//                 image: profile.photos[0].value,
//                 eIsVerified: true,
//                 authUsing: "google",
//               });

//               Innovator.createInnovator(newU, (err, user) => {
//                 if (err) throw err;
//                 return done(null, userCreated);
//               });
//             });
//           }
//         });
//       }
//     )
//   );

//   //**************************************************
//   //Facebook Registration
//   //**************************************************

//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: process.env.FACEBOOK_ID,
//         clientSecret: process.env.FACEBOOK_SECRET,
//         callbackURL: process.env.DOMAIN + "/auth/facebook/callback",
//         // profileFields: ['emails', 'displayName']
//         // scope: ['read_stream','emails']
//       },
//       (token, refreshToken, profile, done) => {
//         console.log(profile);
//         User.findOne({ email: profile.emails[0].value }, (err, user) => {
//           if (err) throw err;

//           if (user) {
//             return done(null, user);
//           } else {
//             let username =
//               profile.emails[0].value.split("@")[0].toLocaleLowerCase() +
//               Math.floor(1000 + Math.random() * 9000);

//             var newUser = new User({
//               email: profile.emails[0].value,
//               username: username,
//               password: "facebookauth",
//               userType: "innovator",
//               secretToken: profile.id,
//             });

//             User.createUser(newUser, function (err, userCreated) {
//               if (err) throw err;
//               var newU = new Innovator({
//                 email: profile.emails[0].value,
//                 username: username,
//                 name: profile.displayName,
//                 uType: "innovator",
//                 //   image:profile.photos[0].value,
//                 eIsVerified: true,
//                 authUsing: "facebook",
//               });

//               Innovator.createInnovator(newU, (err, user) => {
//                 if (err) throw err;
//                 return done(null, userCreated);
//               });
//             });
//           }
//         });
//       }
//     )
//   );

//   //**************************************************
//   //Github Registration
//   //**************************************************

//   passport.use(
//     new GitHubStrategy(
//       {
//         clientID: process.env.GITHUB_ID,
//         clientSecret: process.env.GITHUB_SECRET,
//         callbackURL: process.env.DOMAIN + "/auth/github/callback",
//         scope: ["user:email"],
//       },

//       (token, refreshToken, profile, done) => {
//         console.log(JSON.stringify(profile), profile);
//         if (profile.emails) {
//           console.log(profile.emails[0].value);
//           User.findOne({ email: profile.emails[0].value }, (err, user) => {
//             if (err) throw err;
//             if (user) {
//               Innovator.updateOne(
//                 { email: profile.emails[0].value },
//                 {
//                   $set: {
//                     eIsVerified: true,
//                     authUsing: "github",
//                     hireable: profile._json.hireable,
//                     location: profile._json.location,
//                     org: profile._json.company,
//                     bio: profile._json.bio,
//                     github: profile.profileUrl,
//                   },
//                 }
//               ).then((u) => console.log(u));

//               return done(null, user);
//             } else {
//               let username =
//                 profile.emails[0].value.split("@")[0].toLocaleLowerCase() +
//                 Math.floor(1000 + Math.random() * 9000);

//               var newUser = new User({
//                 email: profile.emails[0].value,
//                 username: username,
//                 password: "abnhihoga",
//                 userType: "innovator",
//                 secretToken: profile.id,
//               });

//               User.createUser(newUser, function (err, userCreated) {
//                 if (err) throw err;
//                 var newU = new Innovator({
//                   email: profile.emails[0].value,
//                   username: username,
//                   name: profile.displayName,
//                   uType: "innovator",
//                   image: profile.photos[0].value,
//                   eIsVerified: true,
//                   authUsing: "github",
//                   hireable: profile._json.hireable,
//                   location: profile._json.location,
//                   org: profile._json.company,
//                   bio: profile._json.bio,
//                   github: profile.profileUrl,
//                 });

//                 Innovator.createInnovator(newU, (err, user) => {
//                   if (err) throw err;
//                   return done(null, userCreated);
//                 });
//               });
//             }
//           });
//         } else {
//           done("Emails not found");
//         }
//       }
//     )
//   );

//   //**************************************************
//   //Linkedin Registration
//   //**************************************************

//   passport.use(
//     new LinkedInStrategy(
//       {
//         clientID: process.env.LINKEDIN_ID,
//         clientSecret: process.env.LINKEDIN_SECRET,
//         callbackURL: process.env.DOMAIN + "/auth/linkedin/callback",
//         scope: ["r_emailaddress", "r_liteprofile"],
//       },
//       (token, refreshToken, profile, done) => {
//         User.findOne({ email: profile.emails[0].value }, (err, user) => {
//           if (err) throw err;

//           if (user) {
//             return done(null, user);
//           } else {
//             let username =
//               profile.emails[0].value.split("@")[0].toLocaleLowerCase() +
//               Math.floor(1000 + Math.random() * 9000);

//             var newUser = new User({
//               email: profile.emails[0].value,
//               username: username,
//               password: "abnhihoga",
//               userType: "innovator",
//               secretToken: profile.id,
//             });

//             User.createUser(newUser, function (err, userCreated) {
//               if (err) throw err;

//               var newU = new Innovator({
//                 email: profile.emails[0].value,
//                 username: username,
//                 name: profile.displayName,
//                 uType: "innovator",
//                 image: profile.photos[0].value,
//                 eIsVerified: true,
//                 authUsing: "linkedin",
//               });

//               Innovator.createInnovator(newU, (err, user) => {
//                 if (err) throw err;
//                 return done(null, userCreated);
//               });
//             });
//           }
//         });
//       }
//     )
//   );
 }
