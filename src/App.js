import { Box, Fab } from '@mui/material';
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
        key : modules.length,
        x: 0, y: 0, w: 1, h: 1,
        content: moduleList.at(mod)
      }
    ]);
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
          verticalCompact={false}
        >
          {modules.map((mod)=> (
            <Box 
              key={mod.key} 
              data-grid={{x: mod.x, y: mod.y, w: mod.w, h: mod.h}}
              sx={{bgcolor:'black', overflow: 'hidden', borderRadius: '10px', border: 1, borderColor: 'blue'}}
            >
              {mod.content}
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
