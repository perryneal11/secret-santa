import emailjs from "@emailjs/nodejs";
import EmailJSResponseStatus from "@emailjs/nodejs";

export class send {
  invite(initiator, location, date, limit, attendees, eventID) {
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

    async function email(templateParams) {
      await emailjs.send(
        "service_u2p4mbv",
        "template_vnt00kk",
        templateParams,
        {
          publicKey: "CLZD_47ouNXy4XSjV",
          privateKey: "3V9nSeche-s_X8HCJoug8", // optional, highly recommended for security reasons
        }
      );
    }

    async function loop(matches) {
      for (let x = 0; x < matches.length; x++) {
        var templateParams = {
          initiator: initiator,
          location: location,
          date: date,
          limit: limit,
          attendees: attendees,
          to: matches[x].santa.email,
          link: eventID + matches[x].santa.id,
        };

        console.log(
          "emailing " +
            templateParams.to +
            " their recipient is " +
            matches[x].receiver.name
        );

        await email(templateParams).then((result) => console.log("weeeee"));
      }
      return matches
    }

    const result = loop(matches)
    return matches
  }
}
