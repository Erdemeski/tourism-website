import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleAuth from '../components/GoogleAuth';
import { useSelector } from 'react-redux';

export default function SignUpPage() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard?tab=profile');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields!');
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate('/sign-in');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to="#" className='font-bold dark:text-white text-4xl'>
            <span className='px-3 py-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-400 rounded-lg text-white'>Erdem's</span>
            Tour
          </Link>
          <p className='text-sm mt-5'>
            To give a reservation, you can sign up with your email and password or with your Google account.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='Email'
                id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='password'
                id='password' onChange={handleChange}
                helperText={
                  <>
                    We’ll never share your details. Read our
                    <a href="#" className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Privacy Policy
                    </a>
                    .
                  </>
                } />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{
              loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign Up'}
            </Button>
            <GoogleAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='my-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
