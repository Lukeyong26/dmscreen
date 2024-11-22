import { Box } from '@mui/material'
import React from 'react'

function RulesText() {
  return (
    <Box sx={{width: 100, height: 100, overflow: 'hidden', bgcolor: '#007FFF'}}>
    Advantage: Roll 2 d20’s and take the highest, then add the respective modifier. Many effects can provide advantage for many skill checks or saving throws. Spells, assistance from an ally, a weakened or surprised enemy or even a generally good roleplaying moment.
    Disadvantage: Roll 2 d20’s and take the lowest, then add the respective modifier. Like advantage, disadvantage can come from many sources, such as an awkward conversation, something weakening you, or a spell from an enemy.
    Note: Advantage and Disadvantage cannot stack, meaning you will never have to roll more than 2 d20’s and take the lowest/highest. With this in mind however, if a source is providing advantage, while another source is providing disadvantage, they cancel.
    </Box>
  )
}

export default RulesText