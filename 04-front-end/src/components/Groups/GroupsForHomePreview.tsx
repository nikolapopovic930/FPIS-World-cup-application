
import IGroup from "../../models/IGroup.model";
import './GroupsPreview.scss';


export interface IGroupPreviewProperties {
    group: IGroup;
}


export default function GroupsPreview(props: IGroupPreviewProperties) {

    props.group.teams.forEach(t => console.log("data.name : " + props.group.name + ": teams : " + t.name));
    
    return (

    <div className="white-backround">
        
        <div className="namee">
        <td><h1 className = "group-name">{props.group.name}</h1></td>
	 
        </div>
        
			<div className="table-div">
				<table width="900px">
					<thead>
						<tr className="col">
							<th>#</th>
							<th>Team</th>
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
								<td>{team.name}<img className="iconsforgroup" src={"images/icons/" + team.name.toLowerCase().split(' ').join('') +".png"} alt = "flag"/></td>
								<td>{team.gamesPlayed}</td>
								<td>{team.wins}</td>
								<td>{team.draws}</td>
								<td>{team.losses}</td>
								<td>{team.goalDifference}</td>
								<td>{team.points}</td>
								
							</tr>
							
						))}
						
					</tbody>
				</table>
			</div>               
        </div>  
    
    );

}