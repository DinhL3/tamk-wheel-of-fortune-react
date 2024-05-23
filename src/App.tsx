import React from 'react';
import logo from './logo.svg';

import PeopleList from './components/PeopleList';
import Wheel from './components/Wheel/Wheel';

function App() {
  const participants = [
    'Alice',
    'Bob',
    'Charlie',
    'Dave',
    'Eve',
    'Frank',
    'Grace',
    'Heidi',
    'Ivan',
    'Judy',
    'Mallory',
    'Oscar',
    'Peggy',
    'Rupert',
    'Sybil',
  ];

  return <Wheel participants={participants} />;
}

export default App;
