import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ClientDetails = () => {
  const { id } = useParams();
  const [balance, setBalance] = useState(0);
  const [details, setDetails] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchClient = async () => {
      const docRef = doc(db, "clients", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const clientData = docSnap.data();
        setBalance(clientData.balance);
        setDetails({ name: clientData.name, email: clientData.email });
      } else {
        console.log("No such document!");
      }
    };

    fetchClient();
  }, [id]);

  const handleUpdateBalance = async () => {
    await updateDoc(doc(db, "clients", id), { balance });
  };

  const handleUpdateDetails = async () => {
    await updateDoc(doc(db, "clients", id), { name: details.name, email: details.email });
  };

  return (
    <div className="client-details">
      <h1>Client Details</h1>
      <div>
        <h2>Balance: {balance}</h2>
        <TextField
          label="Balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdateBalance}>
          Update Balance
        </Button>
      </div>
      <div>
        <TextField
          label="Name"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="secondary" onClick={handleUpdateDetails}>
          Update Details
        </Button>
      </div>
    </div>
  );
};

export default ClientDetails;