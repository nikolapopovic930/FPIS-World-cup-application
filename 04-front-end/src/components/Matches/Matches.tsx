import { useEffect, useState } from "react";
import IMatch from '../../models/IMatch.model';
import MatchesPreview from "./MatchesPreview";

export default function Matches(){
    const [ matches, setMatches ] = useState<IMatch[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:10000/api/match")
        .then(res => res.json())
        .then(data => {
            setMatches(data)
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
            { matches.map(match => (
                <div>
                <MatchesPreview key={ "match-" + match.matchId } match={ match }/>
                </div>
                )) }
            </div>
           
            } 
              
        </div>  
    );

    
}