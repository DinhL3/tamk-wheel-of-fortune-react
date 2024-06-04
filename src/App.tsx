import Box from '@mui/material/Box';
import Wheel from './components/Wheel/Wheel';
import PlayerList from './components/Players/PlayerList';
import PlayersContextProvider from './store/players-context';

function App() {
  return (
    <PlayersContextProvider>
      <Box width="100vw" display="flex" justifyContent="space-around">
        <Wheel />
        <PlayerList />
      </Box>
    </PlayersContextProvider>
  );
}

export default App;
