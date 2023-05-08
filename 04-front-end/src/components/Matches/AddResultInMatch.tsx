import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import IMatch from '../../models/IMatch.model';


export interface IAddResultInMatchParams extends Record<string, string | undefined> {
    match_id: string
}

function AddResultInMatch() {
    const params = useParams<IAddResultInMatchParams>();
    const matchId = +(params.match_id ?? ''); 
    const [match, setMatch ] = useState<IMatch>(); 
    const [firstTeamGoals, setFirstTeamGoals] = useState<number | ''>('');
    const [secondTeamGoals, setSecondTeamGoals] = useState<number | ''>('');
    const [isSurrendered, setisSurrendered] = useState(0);
    const [message, setMessage] = useState('');
    const [firstTeamErrorMessage, setFirstTeamErrorMessage] = useState('');
    const [secondTeamErrorMessage, setSecondTeamErrorMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    
    
    let navigate = useNavigate();

    function loadMatch(){
      fetch(`http://localhost:10000/api/match/${matchId}`)
      .then(res => res.json())
      .then(data => {
        setMatch(data)
      })
      .catch(error => {
        setMessage(error?.message ?? 'Unknown error')
      })
    }



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (firstTeamGoals === '' || firstTeamGoals === null || firstTeamGoals === undefined) {
      setFirstTeamErrorMessage('Please enter a number of goals for the first team.');
      return;
    }
    if (secondTeamGoals === '' || secondTeamGoals === null || secondTeamGoals === undefined) {
      setSecondTeamErrorMessage('Please enter a number of goals for the second team.');
      return;
    }


  const currentDate = new Date();
  const matchDatePlus2 = match?.date ? new Date(match.date) : undefined;
  const matchDate = match?.date ? new Date(match.date) : undefined;
  const matchDateReal = matchDate ? new Date(matchDate.setHours(matchDate.getHours() - 2)) : undefined;
  if (matchDateReal && matchDateReal > currentDate) {
    setMessage('Cannot update score for a match that has not been played yet');
    return;
  }
  if (matchDatePlus2 && currentDate < matchDatePlus2) {
    setMessage('Cannot update score for a match that is still playing');
    return;
  }



    axios.put(`http://localhost:10000/api/match/${matchId}`, { firstTeamGoals, secondTeamGoals, isSurrendered})
      .then(response => {
        console.log(response);
        setMessage('Team score updated successfully');

        setTimeout(() => {
          navigate("/matches");
          }, 1000);

      })
      .catch(error => {
        
        console.log(error);
        setMessage('Failed to update the score');
      });
  };

useEffect(() => {
    loadMatch();
  }, []);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id } = event.target;
    const oppositeId = id === 'CheckboxFirstTeam' ? 'CheckboxSecondTeam' : 'CheckboxFirstTeam';
    const oppositeCheckbox = document.getElementById(oppositeId) as HTMLInputElement;
    const firstTeamGoalsCheckbox = document.getElementById('CheckboxFirstTeam') as HTMLInputElement;
    const secondTeamGoalsCheckbox = document.getElementById('CheckboxSecondTeam') as HTMLInputElement; 
    

    if (event.target.checked && oppositeCheckbox.checked) {
    
      oppositeCheckbox.checked = false;
    } else {
      setMessage('');
    }

    if (firstTeamGoalsCheckbox.checked || secondTeamGoalsCheckbox.checked) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }


  return (

    <div className="white">
    <div className="centar">

    <form onSubmit={handleSubmit}>
      <br/>
      <h1>ENTER A RESULT FOR A MATCH</h1>
      <br/>
      <input className="form-control" type="text" placeholder="Enter the score for first team" disabled={isDisabled} value={firstTeamGoals} onChange={(event) => setFirstTeamGoals(event.target.value ? parseInt(event.target.value) : '')} onFocus={() => setFirstTeamErrorMessage('')} />
      <p>{firstTeamErrorMessage}</p>
      <br/>
      <input className="form-control" type="text" placeholder="Enter the score for second team" disabled={isDisabled} value={secondTeamGoals} onChange={(event) => setSecondTeamGoals(event.target.value ? parseInt(event.target.value) : '')} onFocus={() => setSecondTeamErrorMessage('')} />
      <p>{secondTeamErrorMessage}</p>
      <p>Select the box if some team surrendered:</p>
      <div className="form-check form-check-inline">
      <input className="form-check-input" type="checkbox" id="CheckboxFirstTeam" value="option1" onChange={(event) => {
        if (event.target.checked) {
        setFirstTeamGoals(0);
        setSecondTeamGoals(3);
        setisSurrendered(1);
        } else {
        setFirstTeamGoals('');
        setSecondTeamGoals('');
        setisSurrendered(0);
        }
        handleCheckboxChange(event);
      }} />
      <label className="form-check-label" >1</label>
      </div>
      <div className="form-check form-check-inline">
      <input className="form-check-input" type="checkbox" id="CheckboxSecondTeam" value="option2" onChange={(event) => {
      if (event.target.checked) {
        setFirstTeamGoals(3);
        setSecondTeamGoals(0);
        setisSurrendered(1);
      } else {
        setFirstTeamGoals('');
        setSecondTeamGoals('');
        setisSurrendered(0);
      }
      handleCheckboxChange(event);
    }} />
      <label className="form-check-label" >2</label>
      </div>
      <div>
      <br/>
      <button type="submit" className="btn btn-secondary btn-lg">Add result</button>
      </div>
      <p>{message}</p>
      </form>
    </div>
    </div>
  );
};


export default AddResultInMatch;

