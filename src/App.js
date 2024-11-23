import { Box, Container } from '@mui/material';
import './App.css';
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import RulesText from './components/dndRules/RulesText';
import Footer from './components/footer/Footer';

function App() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 2, h: 2 },
    { i: "b", x: 2, y: 2, w: 2, h: 2 },
    { i: "c", x: 2, y: 2, w: 2, h: 2 }
  ];
  return (
    <div className="App">
      <div>header</div>
      <div className='body'>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={40}
          width={1200}
        >
          <Box key='a' sx={{bgcolor: '#007FFF'}}><RulesText/></Box>
          <Box key='b' sx={{bgcolor: '#007FFF'}}></Box>
          <Box key='c' sx={{bgcolor: '#007FFF'}}></Box>
        </GridLayout>
      </div>
      <div className='footer'><Footer/></div>
    </div>
  );
}

export default App;
