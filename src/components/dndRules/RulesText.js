import { Box, Button, Container } from '@mui/material'
import React from 'react'

function RulesText() {
  return (
    <Container>
      <h1>Advantage: </h1>
      Roll 2 d20’s and take the highest, then add the respective modifier. Many effects can provide advantage for many skill checks or saving throws. Spells, assistance from an ally, a weakened or surprised enemy or even a generally good roleplaying moment.
      <h1>Disadvantage:</h1> 
      Roll 2 d20’s and take the lowest, then add the respective modifier. Like advantage, disadvantage can come from many sources, such as an awkward conversation, something weakening you, or a spell from an enemy.
      <h1>Note:</h1> 
      Advantage and Disadvantage cannot stack, meaning you will never have to roll more than 2 d20’s and take the lowest/highest. With this in mind however, if a source is providing advantage, while another source is providing disadvantage, they cancel.
    </Container>
    
  )
}

export default RulesText