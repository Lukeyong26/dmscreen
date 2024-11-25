import { Box, Button, Fab } from '@mui/material';
import './App.css';
import { Responsive, WidthProvider } from "react-grid-layout";
import RulesText from './components/dndRules/RulesText';
import Initiative from './components/initative/Initiative';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useState } from 'react';

const ResponsiveGridLayout = WidthProvider(Responsive);

const moduleList = [<RulesText/>, <Initiative/>]

function App() {
  const [modules, setModules] = useState([])

  

  function addModule(mod) {
    setModules([
      ...modules,
      {
        i : modules.length,
        x: 0, y: 0, w: 2, h: 2,
        content: mod
      }
    ]);
  }

  function updateLayout(layout) {
    const newLayout = modules.map(mod => {
      const newItem = layout.at(mod.i)
      return {...mod, x:newItem.x, y:newItem.y, w:newItem.w, h:newItem.h };
    });
    console.log(newLayout)
    setModules(newLayout)
  }

  function deleteModule() {

  }

  return (
    <div className="App">
      <div>
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          width={1200}
          margin={[5,5]}
          compactType={null}
          onLayoutChange={updateLayout}
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
              <Box sx={{bgcolor: 'white', display:'flex', flexDirection: 'column', width: "15px"}}>
                <Button onClick={deleteModule}>x</Button>
                <Button onClick={deleteModule}>y</Button>
              </Box>
              
              <Box 
                sx={{
                  height: 1, 
                  typography: 'body2',
                  overflow: 'hidden', 
                  overflowY: 'scroll', 
                  scrollbarWidth: 'thin'
                }}
              >
                {moduleList.at(mod.content)}
              </Box>
              
            </Box>
          ))}
        </ResponsiveGridLayout>
      </div>
      <Fab sx={{
          position: 'fixed',
          right: '10px',
          bottom: '10px',
        }} color='primary' onClick={()=> addModule(0)}
      >
        Add
      </Fab>
    </div>
  );
}

export default App;
