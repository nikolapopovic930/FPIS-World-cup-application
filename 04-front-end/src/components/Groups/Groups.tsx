import { useEffect, useState } from "react";
import IGroup from '../../models/IGroup.model';
import GroupsPreview from "./GroupsPreview";

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
                <GroupsPreview key={ "groups-" + group.groupId } group={ group }/>
                
                </div>
                )) }
            </div>
           
            } 
              
        </div>  
    );

    
}