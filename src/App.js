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
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ModuleMenu from './components/moduleMenu/ModuleMenu';
import SpellsList from './components/dndRules/SpellsList';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const ResponsiveGridLayout = WidthProvider(Responsive);
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffe6',
    },
    secondary: {
      main: '#141720'
    },
  },
});

const moduleList = [<RulesText/>, <Initiative/>, <SpellsList/>];
const moduleObjects = [
  {index: 0, modName: 'D&D Rules'},
  {index: 1, modName: 'Initiative Tracker'},
  {index: 2, modName: 'Spells List'},
];

function App() {
  const [prevLayout, setPrevLayout] = useState([]);
  const [modules, setModules] = useState([]);
  const [status, setStatus] = useState(false);
  const [editMode, setEditMode] = useState(null)

  function addModule(mod) {
    setPrevlayout();
    const key = new Date().getTime().toString() + 'a'
    setModules([
      ...modules,
      {
        i : key, x: 0, y: 0, w: 4, h: 10,
        content: mod
      }
    ]);
  }

  function updateLayout(layout) {
    const newLayout = modules.map(mod => {
      const newItem = layout.find(item => item.i === mod.i);
      return {...mod, x:newItem.x, y:newItem.y, w:newItem.w, h:newItem.h };
    });
    setModules(newLayout);
  }

  function deleteModule(i) {
    setPrevlayout();
    const newLayout = modules.filter((mod) => mod.i !== i);
    setModules(newLayout);
  }

  const editModule = (mod) => {
    setPrevlayout();
    const newLayout = modules.map(module => {
      if (module.i === editMode.key) {
        return {...module, content: mod};
      } else {
        return {...module};
      }
    });
    setModules(newLayout);
    setEditMode(null);
  }

  const openModMenu = (modKey) => {
    setEditMode(null);
    if (modKey !== "") {
      setEditMode({key: modKey, mode: true})
    }
    setStatus((prevStatus) => !prevStatus);
  };

  const setPrevlayout = ()=>{
    setPrevLayout(modules);
  }

  const undo =()=>{
    setModules(prevLayout);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div>
          <ResponsiveGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 20, md: 15, sm: 10, xs: 8, xxs: 4 }}
            rowHeight={20} width={1200} margin={[5,5]} compactType={null}
            preventCollision={true} onDragStart={setPrevlayout} onResizeStart={setPrevLayout}
            onLayoutChange={updateLayout} draggableHandle='.drag-handle'
          >
            {modules.map((mod)=> (
              <Box 
                key={mod.i} 
                data-grid={{x: mod.x, y: mod.y, w: mod.w, h: mod.h}}
                sx={{
                  display: 'flex', flexDirection: 'column',
                  border: '1px solid', borderColor: 'grey.500' 
                }}
              >
                
                <Box 
                  sx={{
                    bgcolor: 'primary.main', display:'flex', flexDirection: 'row'
                  }}
                >
                  <Box className='drag-handle' sx={{bgcolor: '', width: '100%'}}>
                    <IconButton>
                      <DragHandleIcon  sx={{color:'secondary.main', fontSize: '15px'}}/>
                    </IconButton>
                  </Box>

                  <Box sx={{display:'flex', flexDirection: 'row', marginLeft:'auto', width: '65px', bgcolor:''}}>
                    <IconButton onClick={() => openModMenu(mod.i)}>
                      <EditIcon sx={{color:'secondary.main', fontSize: '15px'}}/>
                    </IconButton>

                    <IconButton onClick={() => deleteModule(mod.i)}>
                      <DeleteIcon sx={{color:'secondary.main', fontSize: '15px'}}/>
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
        <Box sx={{
          display: 'flex', flexDirection: 'column',position: 'fixed',
          bottom: '10px', p:2, rowGap: '20px'
        }}>
          <Fab sx={{bgcolor: 'primary.main'}} onClick={undo}>
            <UndoIcon sx={{color: 'secondary.main'}}/>
          </Fab>
          <Fab sx={{bgcolor: 'primary.main'}} onClick={() => openModMenu("")}>
            <ModuleMenu
              isOpen={status} moduleList={moduleObjects} isEditMode={editMode}
              addModule={addModule} editModule={editModule}
            />
            <AddIcon sx={{color: 'secondary.main'}}/>
          </Fab>
        </Box>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
