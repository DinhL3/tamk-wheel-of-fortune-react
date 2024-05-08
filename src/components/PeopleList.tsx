import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const PeopleList = () => {
  const [peopleList, setPeopleList] = useState<string[]>([]);
  const [newPerson, setNewPerson] = useState<string>('');

  const handleAddPerson = () => {
    if (newPerson.trim() === '') return;

    setPeopleList([...peopleList, newPerson.trim()]);
    setNewPerson(''); // Clear the input field after adding a person
  };

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        <TextField
          id="outlined-basic"
          label="Add a person"
          variant="outlined"
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddPerson} sx={{ ml: 2 }}>
          Add
        </Button>
      </Box>
      <List dense={true}>
        {peopleList.map((person, index) => (
          <ListItem key={index}>
            <ListItemText primary={person} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PeopleList;
