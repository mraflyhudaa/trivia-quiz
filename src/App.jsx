import { Route, Routes } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProtectedRoute, { useLocalStorage } from './utils/ProtectedRoute';

function App() {
  const { user } = useLocalStorage();
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/quiz'
          element={
            <ProtectedRoute user={user}>
              <div className='m-14'>
                <Quiz />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
