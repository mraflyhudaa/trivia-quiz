import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../utils/ProtectedRoute';

const Navbar = () => {
  const navigate = useNavigate();

  // const isUser = localStorage.getItem('user');
  const { user } = useLocalStorage();

  const onLogout = () => {
    localStorage.removeItem('user');
    navigate(0);
  };
  return (
    <div className='flex justify-between items-center border-b-2 border-b-[#094067] bg-[#fffffe]'>
      <h1 className='text-3xl font-bold p-6 text-[#094067]'>Trivia Quiz</h1>
      {user ? (
        <p
          className='m-6 hover:cursor-pointer text-[#094067] font-semibold text-lg'
          onClick={onLogout}
        >
          Logout
        </p>
      ) : null}
    </div>
  );
};

export default Navbar;
