import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';

const ResponsiveGridLayout = WidthProvider(Responsive);

function Initiative() {
  const initialPlayerState = [
    {key:'a',x:0,y:0,turn:false,playerName:''},
    {key:'b',x:1,y:0,turn:false,playerName:''}
  ]
  const [players, setPlayers] = useState(initialPlayerState);
  const [turn, setTurn] = useState(0)

  const addPlayer =()=> {
    const key = new Date().getTime().toString() + 'b'
    setPlayers([
      ...players,
      {
        key : key,
        x: players.length, y: 0,
        turn: false
      }
    ]);
  }

  const deletePlayer =(key)=> {
    const newLayout = players.filter((player) => player.key !== key);
    // console.log(newLayout)
    setPlayers(newLayout);
  }

  const nextPlayer =()=>{
    const newLayout = players.map(player => {
      if (player.x === turn) {
        return {...player, turn: true};
      } else {
        return {...player, turn: false};
      }
      
    });
    setTurn((turn+1)%players.length);
    setPlayers(newLayout);
  }

  const resetInitiative =()=>{
    const newLayout = players.map(player => {
      return {...player, turn: false};
    });
    setTurn(0);
    setPlayers(newLayout);
  }

  function updateLayout(layout) {
    const newLayout = players.map(mod => {
      const newItem = layout.find(item => item.i === mod.key);
      return {...mod, x:newItem.x, y:newItem.y };
    });
    // console.log(newLayout);
    setPlayers(newLayout);
  }
  return (
    <Box sx={{m: 1}}>
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: players.length, md: players.length, sm: players.length, xs: players.length, xxs: players.length }}
        margin={[5,5]} compactType={'horizontal'} maxRows={1} rowHeight={140}
        onLayoutChange={updateLayout} isResizable={false} draggableHandle='.drag-handle-card'
      >
        {players.map((player) => (
          <Box
            key={player.key}
            data-grid={{x: player.x, y: player.y, w: 1, h: 1}}
            sx={{border: '2px solid', borderColor: 'grey.500', borderRadius:'10px'}}
          >
            <Box 
              sx={{
                display: 'flex', flexDirection:'column', 
                borderBottom: '1px solid', borderColor: 'grey.500',
                height:'110px', alignItems:'center'
              }}
            >
              <Box sx={{marginLeft: 'auto', height:'20%'}} >
                {players.length > 1 &&
                  <IconButton  sx={{color:'white'}} onClick={() => deletePlayer(player.key)}>
                    <CloseIcon sx={{fontSize: '15px'}}/>
                  </IconButton>
                }
              </Box>

              <Box className='drag-handle-card' sx={{ display:'flex', width: '100%', alignItems:'center', justifyContent:'center'}}>
                <AccountBoxIcon sx={{fontSize: '50px', mb: '5px'}}/>
              </Box>
              <TextField 
                id="basic" variant="standard" 
                size='small'
                sx={{input: {color:'white', textAlign: 'center', fontSize: '15px'}}}
              />
            </Box>

            {player.turn ? 
              <Box sx={{width:'100%', height:'29px',  mb: '1px', bgcolor:'green',
                borderBottomRightRadius:'10px', borderBottomLeftRadius:'10px'}}/>
              :
              <Box sx={{width:'100%', height:'29px', mb: '1px', bgcolor:''}}/>
            }
            
          </Box>
        ))}
        
      </ResponsiveGridLayout>
      <Button onClick={addPlayer}>Add Player</Button>
      <Button onClick={nextPlayer}>Next Player</Button>
      <Button onClick={resetInitiative}>Reset Initiative</Button>
    </Box>
  )
}

export default Initiative