import { Box, MenuItem, MenuList, Modal } from '@mui/material';
import React from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(20, 23, 32)',
  border: '2px solid #000',
  color: 'white',
  boxShadow: 24,
  p: 4,
};

const ModuleMenu = ({ isOpen, moduleList, isEditMode, addModule, editModule }) => {
  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
        >
          <Box sx={style}>
            <h2>Select a Module:</h2>
            {!isEditMode ? 
              <MenuList sx={{bgcolor: 'rgb(10, 13, 22)', mt: '5px'}}>
                {moduleList.map((module) => (
                  <MenuItem key={module.index} value={module.index} onClick={(e) => addModule(e.target.value)}>
                    + {module.modName}
                  </MenuItem>
                ))}
              </MenuList>
            :
              <MenuList sx={{bgcolor: 'rgb(10, 13, 22)', mt: '5px'}}>
                {moduleList.map((module) => (
                  <MenuItem key={module.index} value={module.index} onClick={(e) => editModule(e.target.value)}>
                    + {module.modName}
                  </MenuItem>
                ))}
              </MenuList>
            }
            
          </Box>
        </Modal>
    
      )}
    </>
  );
};

export default ModuleMenu