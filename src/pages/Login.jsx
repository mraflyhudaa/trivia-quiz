import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../utils/ProtectedRoute';
import Loading from '../components/Loading';

const data = {
  email: 'user@email.com',
  password: 'user',
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { email, password } = formData;

  useEffect(() => {
    setIsLoading(true);
    const data = localStorage.getItem('user');
    if (data) {
      setUser(data);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleClick();
  };

  const handleClick = () => {
    if (email == data.email) {
      if (password == data.password) {
        localStorage.setItem('user', true);
        navigate(0);
      } else {
        console.log('failed');
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/quiz');
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex items-center justify-center min-h-full pt-10 overflow-hidden sm:px-6 lg:px-8 '>
      <form
        className='w-5/12 flex justify-center items-center py-10 rounded-lg border-2 border-[#094067] bg-[#fffffe]'
        onSubmit={onSubmit}
      >
        <div className='w-full max-w-md space-y-8'>
          <p className='text-center text-2xl font-bold text-[#094067]'>Login</p>
          <Input
            htmlFor='email'
            label='Email'
            type='email'
            name='email'
            onChange={onChange}
          />
          <Input
            htmlFor='password'
            label='Password'
            type='password'
            name='password'
            onChange={onChange}
          />
          <div className='flex'>
            <button className='px-4 py-2 transition-colors font-semibold bg-[#3da9fc] text-white rounded-lg hover:bg-[#1d9cfd] mx-auto'>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
