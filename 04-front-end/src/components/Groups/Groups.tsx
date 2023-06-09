import { useEffect, useState } from "react";
import IGroup from '../../models/IGroup.model';
import GroupsPreview from "./GroupsPreview";
import './GroupsPreview.scss';
import { Link } from 'react-router-dom';


export default function Groups(){
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
                  
            { groups.map(group => (
                <div>
                <GroupsPreview key={ "group-" + group.groupId } group={ group }/>
                
                </div>
                )) }
                
            </div>

            } 
            
            <div className="centarr">
                <Link type="button" className="btn btn-secondary btn-lg" to={"/addgroup"}>Add a new group</Link>
            </div> 
             
        </div>  
    );

    
}