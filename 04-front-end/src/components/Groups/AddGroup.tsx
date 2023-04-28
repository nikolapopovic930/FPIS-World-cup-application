import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

const AddGroup = () => {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) {
        setErrorMessage('Please enter a name for the group.');
        return;
      }
    if (name.length < 4) {
        setErrorMessage('Please enter a name with at least 4 characters.');
        return;
    }
    axios.post('http://localhost:10000/api/group', { name })
    .then((response: AxiosResponse<any>) => {
        console.log(response);
      

        setName('');
        setSuccessMessage('Group added successfully!');
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((error: AxiosError<any>) => {
        setErrorMessage(error.response?.data)
        console.log(error.response?.data)
      });
  };

  return (

    <div className="white">
    <div className="centar">

    
    <form onSubmit={handleSubmit}>
      <br/>
        <h1>ADD A GROUP</h1>
        <br/>
        <input className="form-control" type="text" placeholder="Name" value={name} onChange={handleNameChange} onFocus={() => setErrorMessage('')}/>
        
        <p>{errorMessage}</p>
        <br/>
      <button type="submit" className="btn btn-secondary btn-lg">Add a group</button>
        <p>{successMessage}</p>
    </form>

    </div>
    </div>
    

  );
};

export default AddGroup;