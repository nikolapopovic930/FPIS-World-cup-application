import IGroup from "../../models/IGroup.model";
import './GroupsPreview.scss';

export interface IGroupPreviewProperties {
    group: IGroup;
}


export default function GroupsPreview(props: IGroupPreviewProperties) {

    props.group.teams.forEach(teams => console.log(teams.name));
    //console.log(props.group.teams[0])
    return (

    <div className="white-backround">
        
        <div className="name">
        <h1 className = "group-name">{props.group.name}</h1>
        </div>
        
        <div className="table-div">

        <div className="ptable">
					<table width="900px">
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
						<tr className="wpos">
							<td>1</td>
							<td>{ props.group.teams.map(team => {return <span key={ "teams-" + props.group.groupId + "-" + team.teamId }>{ team.name }</span>}) }</td>
							<td>2</td>
							<td>2</td>
							<td>0</td>
							<td>0</td>
							<td>5</td>
							<td>6</td>
						</tr>
						<tr className="wpos">
							<td>2</td>
							<td>YOLO FC</td>
							<td>2</td>
							<td>2</td>
							<td>0</td>
							<td>0</td>
							<td>4</td>
							<td>6</td>
						</tr>
						<tr className="wpos">
							<td>3</td>
							<td>Majestic A</td>
							<td>2</td>
							<td>1</td>
							<td>1</td>
							<td>0</td>
							<td>4</td>
							<td>4</td>
						</tr>
						<tr className="wpos">
							<td>4</td>
							<td>Fenris</td>
							<td>2</td>
							<td>1</td>
							<td>1</td>
							<td>0</td>
							<td>1</td>
							<td>4</td>
						</tr>
		
					</table>
        </div>	
										
						
        </div>                
        </div>  
    
    );

}