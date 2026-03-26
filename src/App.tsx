import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './routes/RoutesComponent';
import ScrollToTop from './Common/Components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
