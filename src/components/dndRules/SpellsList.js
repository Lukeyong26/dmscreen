import { Box, Container, FormControl, IconButton, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CloseIcon from '@mui/icons-material/Close';

const spellLevels = ['1','2','3','4','5','6','7','8','9']

function SpellsList() {
    const [spells, setSpells] = useState([]);
    const [selection, setSelection] = useState('')
    const [selectedSpell, setSelectedSpell] = useState({})
    const [spellDesc, setSpellDesc] = useState([])
    const [isSpellOpen, setIsSpellOpen] = useState(false)
  
    const ruleURL = "https://www.dnd5eapi.co/api/spells";
    
    useEffect(() => {
        fetch(ruleURL)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.results);
            setSpells(data.results);
          })
          .catch((err) => {
            console.log(err.message);
          });
    }, []);
  
    const changeSelection = (e) => {
      setSelection(e.target.value);
      const URL = e.target.value === "" ? ruleURL : ruleURL + "?level=" + e.target.value
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setSpells(data.results);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const openSpell = (spell) => {
      setIsSpellOpen(true);
      const URL = ruleURL + "/" + spell;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setSelectedSpell(data);
          setSpellDesc(data.desc)
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const closeSpell = () => {
      setIsSpellOpen(false);
    }
  
    return (
      <Container sx={{mt:1}}>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <h1>Spells List</h1>
          <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginTop: '3px'}}>
            <small>Level: </small>
            <FormControl sx={{minWidth: 10}} size="small">
              <Select
                value={selection}
                onChange={changeSelection}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{color: 'black', bgcolor: 'grey.200', fontSize: '12px'}}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {spellLevels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        {!isSpellOpen ? 
          <List>
            {spells.map((spell) => (
              <ListItem key={spell.index} disablePadding>
                <ListItemButton onClick={() => openSpell(spell.index)}>
                  <ListItemText primary={spell.name}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          : 
          <Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <h2>{selectedSpell.name}</h2>
              <IconButton  sx={{marginLeft: 'auto', color:'white'}} onClick={closeSpell}>
                <CloseIcon/>
              </IconButton>
            </Box>
            <h3>Description:</h3>
            {spellDesc.map((text) => (
              <Markdown remarkPlugins={[remarkGfm]}>
                {text}
              </Markdown>
            ))}
            
            <small>
              Range: {selectedSpell.range}<br/>
              Duration: {selectedSpell.duration}<br/>
              Concentration: {selectedSpell.concentration ? 'Yes':'No'}<br/>
              Cast Time: {selectedSpell.casting_time}<br/>
              Level: {selectedSpell.level}<br/>
            </small>
            <h3>At Higher Levels:</h3>
            {selectedSpell.higher_level}
            <br/><br/>
          </Typography>
        }
      </Container>
    )
}

export default SpellsList