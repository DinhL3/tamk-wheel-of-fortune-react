import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { FixedSizeList, ListChildComponentProps } from 'react-window';

const PlayerList = () => {
  const [playerList, setPlayerList] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState<string>('');

  const handleAddPlayer = () => {
    if (newPlayer.trim() === '') return;
    setPlayerList([...playerList, newPlayer.trim()]);
    setNewPlayer(''); // Clear the input field after adding a player
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  const renderRow = ({ index, style }: ListChildComponentProps) => (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={playerList[index]} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Box sx={{ mt: 2, ml: 5 }}>
      <Box sx={{ display: 'flex', mb: 1 }}>
        <TextField
          id="outlined-basic"
          label="Add a player"
          variant="outlined"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={handleEnterKeyDown}
        />
        <Button variant="contained" onClick={handleAddPlayer} sx={{ ml: 2 }}>
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
          itemCount={playerList.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </Box>
  );
};

export default PlayerList;
