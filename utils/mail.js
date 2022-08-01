const Mailgen = require("mailgen");

// Mail Generator Configuration
var mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      // Appears in header & footer of e-mails
      name: "Hack2skill",
      link: "https://hack2skill.com",
      // logo: "https://hack2skill.com/images/Incubate_Logo.png",
      logo: "https://hack2skill.com/new/H2S-Gradient.png",
      logoHeight: "50px",
    },
  });
  
  let { Transporter } = require("../config/mail");
  
  function sendEmailOne(mailOptions) {
    Transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error.message);
      }
      console.log("Normal email sent successfully");
    });
  }

  function sendCertificate(name, email, certificateLink, subject, body) {
    // Prepare email contents
    // var eEmail = {
    //   body: {
    //     greeting: "Dear",
    //     name: name,
    //     intro: [
    //       `Thank you for registering for ${hackName}.`,
    //       `For participant’s assistance, we strongly suggest you join our discord community as it will be our primary mode of communication.`,
    //       `All the updates, next steps to follow, and communication regarding the challenge will be done on our discord community and through emails.`,
    //       `Join us on Discord: https://discord.gg/KMKtbxBJpW`,
    //     ],
    //     action: [
    //       {
    //         instructions: "To join our community:",
    //         button: {
    //           text: "Click Here",
    //           link: "https://discord.gg/KMKtbxBJpW",
    //         },
    //       },
    //     ],
    //     outro:
    //       "If you have any queries, you can reach out to us at support@hack2skill.com.",
    //     signature: "Regards",
    //   },
    // };
  
    // Generate an HTML email with the provided contents
    // var emailBody = mailGenerator.generate(eEmail);
  
    // // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    // var emailText = mailGenerator.generatePlaintext(eEmail);
    var text = `${body} || Hey ${name} Here's your certificate Link: ${certificateLink}`;
    let mailOptions = {
        from: {
          name: `prince`,
          address: `certificate@update.hack2skill.com`,
        },
        // from: `hack2skill@no-reply.hack2skill.com`,
        to: email,
        replyTo: "support@hack2skill.com",
        subject: subject,
        html: text,
        text: text,
      };
    sendEmailOne(mailOptions);
  }

  module.exports = {
    sendCertificate: sendCertificate,
  }
  