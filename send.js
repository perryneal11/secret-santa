import emailjs from "@emailjs/nodejs";

export class send {
  async invite(initiator, location, date, limit, attendees) {
    console.log(attendees);

    emailjs.init({
      publicKey: "CLZD_47ouNXy4XSjV",
      privateKey: "3V9nSeche-s_X8HCJoug8",
    });

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    const randomNames = shuffle(attendees);

    // Match each person with the next one, folding over at the end
    const matches = randomNames.map((name, index) => {
      return {
        santa: name,
        receiver: randomNames[index + 1] || randomNames[0],
      };
    });

    matches.forEach((a) => {
      var templateParams = {
        initiator: initiator,
        location: location,
        date: date,
        limit: limit,
        attendees: attendees,
        to: a.santa.email,
      };

      console.log(
        "emailing " +
          templateParams.to +
          " their recipient is " +
          a.receiver.name
      );

      emailjs.send("service_u2p4mbv", "template_vnt00kk").then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
          return err;
        }
      );
    });

    return "Fin";
  }
}
