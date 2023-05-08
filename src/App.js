import { RouterProvider } from 'react-router-dom';
// import './App.css';
import router from './routes/router';
import LoaderState from './contexts/loadder/LoaderState'
import UserState from './contexts/loadder/UserState';

function App() {
  return (
    <div className="App">
      <LoaderState>
        <UserState>
          <RouterProvider router={router} />  
        </UserState>
      </LoaderState>
    </div>
  );
}

export default App;
