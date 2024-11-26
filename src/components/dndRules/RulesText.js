import { Box, Container, FormControl, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function RulesText() {
  const [rules, setRules] = useState([]);
  const [selection, setSelection] = useState('')
  const [selectedRule, setSelectedRule] = useState({})

  const ruleURL = "https://www.dnd5eapi.co/api/rule-sections";
  
  useEffect(() => {
      fetch(ruleURL)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.results);
          setRules(data.results);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, []);

  const changeSelection = (e) => {
    setSelection(e.target.value);
    fetch(ruleURL + "/" + e.target.value)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setSelectedRule(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Container sx={{mt:1}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <h1>D&D Rules</h1>
        <FormControl sx={{minWidth: 120, marginLeft: 'auto' }} size="small">
          <Select
            value={selection}
            onChange={changeSelection}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{color: 'black', bgcolor: 'grey.200', fontSize: '12px'}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {rules.map((rule) => (
              <MenuItem key={rule.index} value={rule.index}>{rule.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      
      <Markdown remarkPlugins={[remarkGfm]}>{selectedRule.desc}</Markdown>
    </Container>
  )
}

export default RulesText