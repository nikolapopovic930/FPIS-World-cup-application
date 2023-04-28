import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export interface IEditGroupParams extends Record<string, string | undefined> {
    group_id: string
}

function GroupForm() {
    const params = useParams<IEditGroupParams>();
    const groupId = +(params.group_id ?? '');  
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
  

    axios.get(`http://localhost:10000/api/group/${groupId}`)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.log(error);
        setMessage('Failed to fetch group details');
      });
  }, [groupId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) {
      setErrorMessage('Please enter a name for the group.');
      return;
    }
    if (name.length < 4) {
      setErrorMessage('Please enter a name with at least 4 characters.');
  }
   
    axios.put(`http://localhost:10000/api/group/${groupId}`, { name })
      .then(response => {
        console.log(response);
        setMessage('Group name updated successfully');
      })
      .catch(error => {
        console.log(error);
        setMessage('Failed to update group name');
      });
  };

  return (

    <div className="white">
    <div className="centar">

    <form onSubmit={handleSubmit}>
      <br/>
      <h1>UPDATE A GROUP</h1>
      <br/>
      <input className="form-control" type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} onFocus={() => setErrorMessage('')} />

      {errorMessage && <p>{errorMessage}</p>}
      <br />
      <button type="submit" className="btn btn-secondary btn-lg">Update a group</button>
      {message && <p>{message}</p>}
    </form>
    
    </div>
    </div>
  );
};


export default GroupForm;