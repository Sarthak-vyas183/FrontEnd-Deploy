/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from '../Store/useAuth';
import { toast } from 'react-toastify';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function ContactDoctorForm() {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    doctorEmail: '',
    queryType: '',
    reqDescription: '',
    emailVerified: false,
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/verifyemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.doctorEmail }),
      });

      if (response.status === 200) {
        setVerificationMessage('Email verified successfully!');
        setSubmitDisabled(false);
        setFormData({ ...formData, emailVerified: true });
      } else {
        setVerificationMessage('Email verification failed.');
        setSubmitDisabled(true);
      }
    } catch (error) {
      setVerificationMessage(`Verification Error: ${error.message}`);
      setSubmitDisabled(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/user/connect_to_dr`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorEmail: formData.doctorEmail,
          queryType: formData.queryType,
          reqDescription: formData.reqDescription,
        }),
      });

      if (response.status === 200) {
        toast.success('Request submitted successfully!');
        // Clear the form after successful submission
        setFormData({
          doctorEmail: '',
          queryType: '',
          reqDescription: '',
          emailVerified: false,
        });
        setVerificationMessage(''); // Clear the verification message
        setSubmitDisabled(true); // Disable the submit button
      } else {
        toast.error('Failed to submit request.');
      }
    } catch (error) {
      toast.error(`Submit Error: ${error.message}`);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto p-4 sm:p-6 lg:p-8'>
      <div className='w-full bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center px-4 sm:px-6 lg:px-8 pt-4'>
          Contact Doctor
        </h2>
        <form onSubmit={handleSubmit} className='p-4 sm:p-6 lg:p-8'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='doctorEmail'>
              Doctor's Email
            </label>
            <div className='flex flex-col sm:flex-row'>
              <input
                type='email'
                id='doctorEmail'
                name='doctorEmail'
                value={formData.doctorEmail}
                onChange={handleChange}
                placeholder='Enter doctor email'
                className='w-full sm:w-auto px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500'
                required
                disabled={formData.emailVerified} // Lock the email field after verification
              />
              {!formData.emailVerified && (
                <button
                  type='button'
                  onClick={handleVerifyEmail}
                  className='bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors'
                >
                  Verify
                </button>
              )}
            </div>
            {verificationMessage && (
              <p className={`text-sm mt-2 ${formData.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                {verificationMessage}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='queryType'>
              Query is About
            </label>
            <select
              id='queryType'
              name='queryType'
              value={formData.queryType}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
              required
            >
              <option value=''>Select a query type</option>
              <option value='Verify My Remedy'>Verify My Remedy</option>
              <option value='Suggest Pros and Cons'>Suggest Pros and Cons on My Remedy</option>
              <option value='Disagree with My Remedy'>Why You Disagree with My Remedy</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='reqDescription'>
              Description of Remedy
            </label>
            <textarea
              id='reqDescription'
              name='reqDescription'
              value={formData.reqDescription}
              onChange={handleChange}
              placeholder='Provide a detailed description of your remedy'
              className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 h-32'
              required
            ></textarea>
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors ${
                submitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={submitDisabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactDoctorForm;
