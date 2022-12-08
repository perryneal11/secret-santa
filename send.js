import * as tslib_1 from "tslib";
import {initializeApp} from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";

import emailjs from "@emailjs/nodejs";


export class send {
  invite(initiator, location, date, limit, attendees, eventID) {
    const firebaseConfig = {
      apiKey: "AIzaSyB5FHho9x2J-J4e-pM1V6vfyha3LnLnqvI",
      authDomain: "secret-santa-bbe84.firebaseapp.com",
      projectId: "secret-santa-bbe84",
      storageBucket: "secret-santa-bbe84.appspot.com",
      messagingSenderId: "106961082809",
      appId: "1:106961082809:web:2bb17866e0b77c89973e68",
      measurementId: "G-6817D884BG",
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    const database = getDatabase();

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

    function firebaseWrite(matches){
      set(ref(database, "events/" + eventID), {
        initiator: initiator,
        date: date,
        location: location,
        limit: limit
      });
      console.log(matches);
      matches.forEach((r) => {
        set(ref(database, "events/" + eventID + "/attendees/" + r.santa.id), {
          name: r.santa.name,
          person: r.receiver.name,
        });
      });
    };

    async function loop(matches) {
      for (let x = 0; x < matches.length; x++) {
        var templateParams = {
          initiator: initiator,
          location: location,
          date: date,
          limit: limit,
          attendees: attendees,
          to: matches[x].santa.email,
          link: "http://localhost:3000/view/" + eventID + "/" + matches[x].santa.id,
        };

        console.log(
          "emailing " +
            templateParams.to +
            " their recipient is " +
            matches[x].receiver.name
        );

        await email(templateParams).then( )
         
      }
      firebaseWrite(matches)
      return matches
    }

   

    const result = loop(matches)
    return result
    }}
