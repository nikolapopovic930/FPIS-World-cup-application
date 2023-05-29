import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

export interface IAddTeamInGroupParams extends Record<string, string | undefined> {
    group_id: string
}

const AddTeamInGroup = () => {
  const params = useParams<IAddTeamInGroupParams>();
  const groupId = +(params.group_id ?? '');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) {
        setErrorMessage('Please enter a name for team.');
        return;
      }
    if (name.length < 4) {
        setErrorMessage('Please enter a name with at least 4 characters.');
        return;
    }
    axios.post('http://localhost:10000/api/team', { name, groupId })
    .then((response: AxiosResponse<any>) => {
        console.log(response);
      

        setName('');
        setSuccessMessage('Team added successfully!');
        
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
        <h1>ADD A TEAM</h1>
        <br/>
        <input className="form-control" type="text" placeholder="Name" value={name} onChange={handleNameChange} onFocus={() => setErrorMessage('')}/>
        
        <p>{errorMessage}</p>
        <br/>
      <button type="submit" className="btn btn-secondary btn-lg">Add a team</button>
        <p>{successMessage}</p>
    </form>

    </div>
    </div>
    

  );
};

export default AddTeamInGroup;