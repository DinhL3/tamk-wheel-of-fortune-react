import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { FixedSizeList, ListChildComponentProps } from 'react-window';

const PeopleList = () => {
  const [peopleList, setPeopleList] = useState<string[]>([]);
  const [newPerson, setNewPerson] = useState<string>('');

  const handleAddPerson = () => {
    if (newPerson.trim() === '') return;
    setPeopleList([...peopleList, newPerson.trim()]);
    setNewPerson(''); // Clear the input field after adding a person
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPerson();
    }
  };

  const renderRow = ({ index, style }: ListChildComponentProps) => (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={peopleList[index]} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Box sx={{ mt: 2, ml: 5 }}>
      <Box sx={{ display: 'flex', mb: 1 }}>
        <TextField
          id="outlined-basic"
          label="Add a person"
          variant="outlined"
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
          onKeyDown={handleEnterKeyDown}
        />
        <Button variant="contained" onClick={handleAddPerson} sx={{ ml: 2 }}>
          Add
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 400,
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemCount={peopleList.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </Box>
  );
};

export default PeopleList;
