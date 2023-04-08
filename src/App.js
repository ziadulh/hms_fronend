import { RouterProvider } from 'react-router-dom';
// import './App.css';
import router from './routes/router';
import LoaderState from './contexts/loadder/LoaderState'

function App() {
  return (
    <div className="App">
      <LoaderState>
        <RouterProvider router={router} />  
      </LoaderState>
    </div>
  );
}

export default App;
