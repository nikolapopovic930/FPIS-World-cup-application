import { Link } from "react-router-dom";
import IGroup from "../../models/IGroup.model";
import './GroupsPreview.scss';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export interface IGroupPreviewProperties {
    group: IGroup;
}

const handleDeleteGroup = async (groupId: number) => {
    try {
        await axios.delete(`http://localhost:10000/api/group/${groupId}`);
        
    } catch (error) {
        console.log(error)
    }
};



const handleDeleteTeam = async (teamId: number) => {
    try {
        await axios.delete(`http://localhost:10000/api/team/${teamId}`);
		
    } catch (error) {
        console.log(error)
    }
};



export default function GroupsPreview(props: IGroupPreviewProperties) {

  const [errorMessage, setErrorMessage] = useState("");

  const { teams } = props.group;
  const isFull = teams.length >= 4;

  let navigate = useNavigate();

  const handleAddTeam = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isFull) {
      setErrorMessage("This group already has 4 teams.");
	  setTimeout(() => {
        setErrorMessage("");
      }, 3000);
	} else {
		navigate(`/addteamingroup/${props.group.groupId}`)
	}
  };
    
    return (

    <div className="white-backround">
        
        <div className="name">
        <td><h1 className = "group-name">{props.group.name}</h1></td>
		<td><Link to={`/editgroup/${props.group.groupId}`}><img className="icons" src="images/edit.png" alt="Edit"/></Link></td>
		<td><img className="icons" src="images/delete.png" alt="Delete" onClick={() => handleDeleteGroup(props.group.groupId).then(() => window.location.reload())}/></td> 
        </div>
        
			<div className="table-div">
				<table width="900px">
					<thead>
						<tr className="col">
							<th>#</th>
							<th>Team</th>
							<th></th>
							<th>GP</th>
							<th>W</th>
							<th>D</th>
							<th>L</th>
							<th>GD</th>
							<th>PTS</th>
						</tr>
					</thead>
					<tbody>
						{props.group.teams.map((team, index) => (
							<tr key={team.teamId}>
								<td>{index + 1}</td>
								<td>{team.name}</td>
								<td><img className="iconsforgroup" src={"images/icons/" + team.name.toLowerCase().split(' ').join('') +".png"} alt = "flag"/></td>
								<td>{team.gamesPlayed}</td>
								<td>{team.wins}</td>
								<td>{team.draws}</td>
								<td>{team.losses}</td>
								<td>{team.goalDifference}</td>
								<td>{team.points}</td>
								<td><Link to={`/editteam/${team.teamId}`}><img className="icons" src="images/edit.png" alt="Edit"/></Link></td>
								<td><img className="icons" src="images/delete.png" alt="Delete" onClick={() => handleDeleteTeam(team.teamId).then(() => window.location.reload())}/></td>
								
							</tr>
							
						))}
						
					</tbody>
				</table>
			</div>
		
                <div className="plus">
				<Link to={`/addteamingroup/${props.group.groupId}`} onClick={handleAddTeam}><img className="plus-img" src="images/plus.png" alt="Add"/></Link>
				
                </div>
				<span className="groupError">{errorMessage}</span>
           
        </div>
    );
}