import React, { useEffect, useState } from 'react';
import Wheel from './components/Wheel/Wheel';

function App() {
  const generateNames = (numNames: number) => {
    const names = [
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
      'Trent',
      'Walter',
      'Xavier',
      'Yvonne',
      'Zack',
      'Uma',
      'Victor',
    ];
    const generatedNames = [];

    for (let i = 0; i < numNames; i++) {
      const name = names[i % names.length];
      const suffix = Math.floor(i / names.length);
      generatedNames.push(suffix === 0 ? name : `${name} ${suffix}`);
    }

    return generatedNames;
  };

  const numberOfParticipants = 10; // Change this number to test with different numbers of participants
  const participants = generateNames(numberOfParticipants);

  useEffect(() => {
    const ws = new WebSocket('ws://10.5.1.105:8765');

    ws.onmessage = (event) => {
      console.log('Message received: ', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return <Wheel participants={participants} />;
}

export default App;
