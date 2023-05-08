import './ScheduleAMatch.sass';
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import ITeamDetailedModel from '../../models/ITeamDetailed.model';
import IStadium from '../../models/IStadium.model';
import IMatch from '../../models/IMatch.model';
import { useNavigate } from 'react-router-dom';
import ITeam from '../../models/ITeam.model';


function ScheduleAMatch() {
    
    const [teames, setTeams ] = useState<ITeamDetailedModel[]>([]);
    const [teamsFromGroup, setTeamsFromGroup ] = useState<ITeam[]>([]);
    const [stadiums, setStadiums ] = useState<IStadium[]>([]);
    const [matches, setMatches ] = useState<IMatch[]>([]); 
    const [firstTeam, setFirstTeam] = useState<number>();
    const [secondTeam, setSecondTeam] =useState<number>();
    const [stadiumId, setStadiumId] = useState<number>();
    const [date, setDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [firstTeamErrorMessage, setFirstTeamErrorMessage] = useState('');
    const [secondTeamErrorMessage, setSecondTeamErrorMessage] = useState('');
    const [stadiumErrorMessage, setStadiumErrorMessage] = useState('');
    const [dateErrorMessage, setDateErrorMessage] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');

    let isSameTimeStadium = false;
    let isSameTeams = false;
    let isSameTimeTeam = false;
    
    let navigate = useNavigate(); 
  

    function loadTeams(){
            fetch("http://localhost:10000/api/team")
            .then(res => res.json())
            .then(data => {
               setTeams(data)
            })
            .catch(error => {
                setErrorMessage(error?.message ?? 'Unknown error')
            })
    }

    function loadTeamsFromGroup(groupId: number){
      if(firstTeam !== undefined){
      fetch(`http://localhost:10000/api/group/${groupId}/team`)
      .then(res => res.json())
      .then(data => {
        const filteredTeams = data.filter((team: ITeam) => team.teamId !== firstTeam);
        setTeamsFromGroup(filteredTeams);
      })
      .catch(error => {
          setErrorMessage(error?.message ?? 'Unknown error')
      })
    }}


    function loadStadiums(){
        fetch("http://localhost:10000/api/stadium")
        .then(res => res.json())
        .then(data => {
           setStadiums(data)
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error')
        })
    }

    function loadMatches(){
        fetch("http://localhost:10000/api/match")
        .then(res => res.json())
        .then(data => {
            setMatches(data)
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error')
        })
    }

    function handleFirstTeamChange(event: ChangeEvent<HTMLSelectElement>) {
      const selectedTeamId = parseInt(event.target.value);
      const selectedTeam = teames.find(team => team.teamId === selectedTeamId);
      const selectedGroupId = selectedTeam ? selectedTeam.groupId : '';
      setSelectedGroupId(String(selectedGroupId));
      
      if (event.target.value === '') {
        setFirstTeam(undefined);
      } else {
        setFirstTeam(selectedTeamId);
      }
    }

    
    


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

         if (firstTeam == null ) {
            
          setFirstTeamErrorMessage('Please select the first team.');
              
             
            
           }
         if (secondTeam == null ) {

          setSecondTeamErrorMessage('Please select the second team.');
              
             
           
          }
         if (stadiumId == null ) {

          setStadiumErrorMessage('Please select a stadium.');
              
              
           
           }
         if (date === "" ) {

          setDateErrorMessage('Please select a date.');
              
              
            
          }

         if (firstTeam === secondTeam) {

            setErrorMessage('First and second team cant be the same.');
              
              setTimeout(() => {
                setErrorMessage('');
                }, 3000);
            return;
            
         }

         for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            let matchDateISO = new Date(match.date);
            let matcDateISOMinus2 = new Date(matchDateISO.setHours(matchDateISO.getHours() - 2));     
            let dateFromFormISO = new Date(date);
            let beforeMatchDate = new Date(matcDateISOMinus2.setHours(matcDateISOMinus2.getHours() - 2));
            let afterMatchDate = new Date(matcDateISOMinus2.setHours(matcDateISOMinus2.getHours() + 4));
            if(match.stadiumId === stadiumId && dateFromFormISO >= beforeMatchDate && dateFromFormISO <= afterMatchDate) {
    
            setErrorMessage('There is already a match at this stadium at selected time.');
              
              setTimeout(() => {
                setErrorMessage('');
                }, 3000);

            isSameTimeStadium = true;
            break;
            }
        };
        

        if (isSameTimeStadium === true) {
            return;
        }

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            if ((match.firstTeam === firstTeam && match.secondTeam === secondTeam) || (match.secondTeam === firstTeam && match.firstTeam === secondTeam )) {
              
              
              setErrorMessage('These teams already played their match.');
              
              setTimeout(() => {
                setErrorMessage('');
                }, 3000);

              isSameTeams = true;
              break;
            }
          }

        if (isSameTeams === true) {
            return;
        }


        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            let matchDateISO = new Date(match.date);
            let matcDateISOMinus2 = new Date(matchDateISO.setHours(matchDateISO.getHours() - 2));     
            let dateFromFormISO = new Date(date);
            let beforeMatchDate = new Date(matcDateISOMinus2.setHours(matcDateISOMinus2.getHours() - 2));
            let afterMatchDate = new Date(matcDateISOMinus2.setHours(matcDateISOMinus2.getHours() + 4));
            
            if ((match.firstTeam === firstTeam || match.secondTeam === secondTeam || match.firstTeam === secondTeam)&& dateFromFormISO >= beforeMatchDate && dateFromFormISO <= afterMatchDate ) {

                   
              
              setErrorMessage('The one of teams already has a match scheduled');
              
              setTimeout(() => {
                setErrorMessage('');
                }, 3000);
              
                isSameTimeTeam = true;
              break;
            }
          }

        if (isSameTimeTeam === true) {
            return;
        }


        axios.post('http://localhost:10000/api/match', { firstTeam: firstTeam, secondTeam: secondTeam, date: date, stadiumId: stadiumId })
        .then((response: AxiosResponse<any>) => {
            console.log(response);
        

            setDate('');
            setSuccessMessage('Match scheduled successfully!');
            
            setTimeout(() => {
            setSuccessMessage('');
            }, 3000);

            setTimeout(() => {
              navigate("/matches");
              }, 1000);
            

            
            
        })
        .catch((error: AxiosError<any>) => {
            console.log(error?.message)
        });
    };

    useEffect(() => {
        loadTeams();
        loadStadiums();
        loadMatches();
        loadTeamsFromGroup(Number(selectedGroupId));
    }, [selectedGroupId]);

    
    

    
    
    return (
      <div className="white">
        <div className="centar">
          <form onSubmit={handleSubmit}>
            <br/>
            <h1>SCHEDULE A MATCH</h1>
            <br/>
            <div className="form-group">
              <label>First team:</label>
              <select className="form-control" id="firstTeam" placeholder="First team" name="firstTeam" value={firstTeam} onChange={handleFirstTeamChange} onFocus={() => setFirstTeamErrorMessage('')}>
                <option value="">Select a team</option>
                {teames.map((team) => (
                  <option value={team.teamId} key={ "first-team-" + team.teamId } >{team.name}</option>
                ))}
              </select>
              <p>{firstTeamErrorMessage}</p>
            <br/>
        </div>
        <div className="form-group">
            <label>Second team:</label>
            <select className="form-control" id="secondTeam" placeholder="Second team" name="secondTeam" value={secondTeam} onChange={e => setSecondTeam(+(e.target.value))} onFocus={() => setSecondTeamErrorMessage('')} disabled={firstTeam === undefined}>
            <option value="">Select a team</option>
            {teamsFromGroup.map((team) => (
                
              <option value={team.teamId} key={ "second-team-" + team.teamId } >{team.name}</option>

            ))}
            </select>
            <p>{secondTeamErrorMessage}</p>
            <br/>
        </div>
        <label htmlFor="date">Date:</label>
        <br/>
        <input type="datetime-local"  id="date" placeholder="Date" name="date" value={date} onChange={e => {setDate(e.target.value)}} onFocus={() => setDateErrorMessage('')}/>
        <p>{dateErrorMessage}</p>
        
        <div className="form-group">
            <br/>
            <label>Stadium:</label>
            <select className="form-control" id="stadiumId" placeholder="Stadium" name="stadiumId" value={stadiumId} onChange={e => setStadiumId(+(e.target.value))} onFocus={() => setStadiumErrorMessage('')}>
            <option value="">Select a stadium</option>
            {stadiums.map((stadium) => (
              <option value={stadium.stadiumId} key={ "stadium-" + stadium.stadiumId } >{stadium.name}</option>

            ))}
            </select>
            <p>{stadiumErrorMessage}</p>
            <br/>
        </div>
        <button type="submit" className="btn btn-secondary btn-lg">Schedule a match</button>
        <p>{successMessage}</p>
        <p>{errorMessage}</p>
        
        </form>

        
    </div>
    </div>
       

    );
};

export default ScheduleAMatch;