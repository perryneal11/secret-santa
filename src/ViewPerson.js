import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";



export default function ViewPerson() {

  const [name, setName] = useState("unknown")
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
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();
  const eventID = useParams().eventID
  const userID = useParams().userID
  
  useEffect(()=>{
    const personRef = ref(database, "events/" + eventID + "/attendees/" + userID);
    console.log(personRef)
    onValue(personRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setName(data.person);
    });
  }, [])


  return <p>Your person is:{name}</p>;
}