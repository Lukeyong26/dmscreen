import { Box, Fab, IconButton } from '@mui/material';
import './App.css';
import { Responsive, WidthProvider } from "react-grid-layout";
import RulesText from './components/dndRules/RulesText';
import Initiative from './components/initative/Initiative';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ModuleMenu from './components/moduleMenu/ModuleMenu';
import SpellsList from './components/dndRules/SpellsList';
import AddIcon from '@mui/icons-material/Add';

const ResponsiveGridLayout = WidthProvider(Responsive);

const moduleList = [<RulesText/>, <Initiative/>, <SpellsList/>];
const moduleObjects = [
  {index: 0, modName: 'D&D Rules'},
  {index: 1, modName: 'Initiative Tracker'},
  {index: 2, modName: 'Spells List'},
];

function App() {
  const [modules, setModules] = useState([]);
  const [status, setStatus] = useState(false);
  const [editMode, setEditMode] = useState(null)

  function addModule(mod) {
    const key = new Date().getTime().toString() + 'a'
    setModules([
      ...modules,
      {
        i : key,
        x: 0, y: 0, w: 4, h: 2,
        content: mod
      }
    ]);
  }

  function updateLayout(layout) {
    const newLayout = modules.map(mod => {
      const newItem = layout.find(item => item.i === mod.i);
      return {...mod, x:newItem.x, y:newItem.y, w:newItem.w, h:newItem.h };
    });
    // console.log(newLayout);
    setModules(newLayout);
  }

  function deleteModule(i) {
    const newLayout = modules.filter((mod) => mod.i !== i);
    // console.log(newLayout)
    setModules(newLayout)
  }

  const editModule = (mod) => {
    console.log(mod)
    console.log(editMode)
    const newLayout = modules.map(module => {
      if (module.i === editMode.key) {
        return {...module, content: mod};
      } else {
        return {...module};
      }
    });
    // console.log(newLayout);
    setModules(newLayout);
    setEditMode(null);
  }

  const openModMenu = (modKey) => {
    // console.log(modKey)
    setEditMode(null);
    if (modKey !== "") {
      setEditMode({key: modKey, mode: true})
    }
    setStatus((prevStatus) => !prevStatus);
  };

  

  return (
    <div className="App">
      <div>
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 20, md: 15, sm: 10, xs: 8, xxs: 4 }}
          rowHeight={100} width={1200} margin={[5,5]} compactType={null}
          onLayoutChange={updateLayout} draggableHandle='.drag-handle'
        >
          {modules.map((mod)=> (
            <Box 
              key={mod.i} 
              data-grid={{x: mod.x, y: mod.y, w: mod.w, h: mod.h}}
              sx={{
                display: 'flex', flexDirection: 'row',
                border: '1px solid', borderColor: 'grey.500', 
              }}
            >
              
              <Box 
                // alignItems={'center'}
                // justifyContent={'center'}
                sx={{
                  bgcolor: '', display:'flex', flexDirection: 'column', width: "20px"
                }}  
              >
                <Box>
                  <IconButton>
                    <DragHandleIcon className='drag-handle' sx={{color:'white', fontSize: '15px'}}/>
                  </IconButton>
                </Box>

                <Box sx={{marginTop:'auto'}}>
                  <IconButton onClick={() => openModMenu(mod.i)}>
                    <EditIcon sx={{color:'white', fontSize: '15px'}}/>
                  </IconButton>

                  <IconButton onClick={() => deleteModule(mod.i)}>
                    <DeleteIcon sx={{color:'white', fontSize: '15px'}}/>
                  </IconButton>
                </Box>
                
              </Box>
              
              <Box 
                sx={{
                  height: 1, width: 1, typography: 'body2', overflow: 'hidden', overflowY: 'scroll', 
                  scrollbarWidth: 'thin'
                  
                }}
              >
                {moduleList.at(mod.content)}
              </Box>
              
            </Box>
          ))}
        </ResponsiveGridLayout>
      </div>
      <Fab 
        sx={{
          position: 'fixed',
          right: '10px',
          bottom: '10px',
          bgcolor: '#ffffe6'
        }} 
        // color='primary'
        onClick={() => openModMenu("")}
      >
        <ModuleMenu
          isOpen={status}
          moduleList={moduleObjects}
          isEditMode={editMode}
          addModule={addModule}
          editModule={editModule}
        />
        <AddIcon/>
      </Fab>
    </div>
  );
}

export default App;
