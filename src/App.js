import { Box, Container } from '@mui/material';
import './App.css';
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import RulesText from './components/dndRules/RulesText';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <div>header</div>
      <div>
        <GridLayout
          className="layout"
          cols={20}
          rowHeight={100}
          width={1200}
        >
          <Box key='a' data-grid={{x: 0, y: 0, w: 1, h: 1}}><RulesText/></Box>
        </GridLayout>
      </div>
      <div className='footer'><Footer/></div>
    </div>
  );
}

export default App;
