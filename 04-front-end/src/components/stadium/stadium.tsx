import { useEffect, useState } from "react";
import IStadium from '../../models/IStadium.model';
import StadiumPreview from "./StadiumPreview";

export default function Stadium(){
    const [ stadiums, setStadiums ] = useState<IStadium[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:10000/api/stadium")
        .then(res => res.json())
        .then(data => {
            setStadiums(data)
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
            { stadiums.map(stadium => (
                <div>
                <StadiumPreview key={ "stadium-" + stadium.stadiumId } stadium={ stadium }/>
                </div>
                )) }
            </div>
           
            }   
        </div>  
    );

}