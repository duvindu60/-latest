import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClients(clientsData);
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "clients", id));
    setClients(clients.filter(client => client.id !== id));
  };

  const handleDisable = async (id) => {
    const client = clients.find(client => client.id === id);
    await updateDoc(doc(db, "clients", id), { disabled: !client.disabled });
    setClients(clients.map(client => 
      client.id === id ? { ...client, disabled: !client.disabled } : client
    ));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>User Registration</h2>
        {/* Add user registration form here */}
      </div>
      <div>
        <h2>Admin Registration</h2>
        {/* Add admin registration form here */}
      </div>
      <div>
        <h2>Client Handling Table</h2>
        <TextField
          label="Search clients"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: <SearchIcon />
          }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map(client => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>
                    <Link to={`/client/${client.id}`}>{client.name}</Link>
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.balance}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(client.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDisable(client.id)}>
                      <EditIcon color={client.disabled ? "secondary" : "primary"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;