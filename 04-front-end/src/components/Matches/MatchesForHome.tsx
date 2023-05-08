import { useEffect, useState } from "react";
import IMatch from '../../models/IMatch.model';
import { Link } from "react-router-dom";
import MatchesForHomePreview from "./MatchesForHomePreview";

export default function MatchesForHome(){
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
            { matches.slice(0, 4).map(match => (
                <div>
                <MatchesForHomePreview key={ "match-" + match.matchId } match={ match }/>
                </div>
                )) }
            </div>

            

            }

            <div className="centarrr">
            <Link type="button" className="btn btn-secondary btn-lg" to={"/matches"}>See all matches</Link>
            </div>
              
        </div>  
    );

    
}