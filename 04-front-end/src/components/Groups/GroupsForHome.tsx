import { useEffect, useState } from "react";
import IGroup from '../../models/IGroup.model';
import GroupsPreview from "./GroupsPreview";
import './GroupsPreview.scss';
import { Link } from 'react-router-dom';
import GroupsForHomePreview from "./GroupsForHomePreview";


export default function GroupsForHome(){
    const [ groups, setGroups ] = useState<IGroup[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:10000/api/group")
        .then(res => res.json())
        .then(data => {
            setGroups(data)
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error')
        })
    }, [ ]);

    return (
        <div>
        { errorMessage && <p>Error: { errorMessage }</p> }  
        { !errorMessage &&
            <div>
                  
            { groups.slice(0, 2).map(group => (
                <div>
                <GroupsForHomePreview key={ "group-" + group.groupId } group={ group }/>
                
                </div>
                )) }
                
            </div>

            } 
            
            <div className="centarrr">
                <Link type="button" className="btn btn-secondary btn-lg" to={"/groups"}>See all groups</Link>
            </div> 
             
        </div>  
    );

    
}