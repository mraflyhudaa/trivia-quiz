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
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

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
    setIsError(false);
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
        setIsError(true);
        setMessage('Wrong password!');
      }
    } else {
      setIsError(true);
      setMessage('Email not found!');
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
        <div className='w-full max-w-md space-y-4'>
          <p className='text-center text-2xl font-bold text-[#094067]'>Login</p>
          {isError ? (
            <div
              class='flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:text-red-400'
              role='alert'
            >
              <svg
                aria-hidden='true'
                class='flex-shrink-0 inline w-5 h-5 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span class='sr-only'>Info</span>
              <div>
                <span class='font-medium'>{message}</span> Change a few things
                up and try submitting again.
              </div>
            </div>
          ) : (
            ''
          )}
          <Input
            htmlFor='email'
            label='Email'
            type='email'
            name='email'
            placeholder='user@email.com'
            onChange={onChange}
          />
          <Input
            htmlFor='password'
            label='Password'
            type='password'
            name='password'
            placeholder='user'
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
