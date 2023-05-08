import './MatchesPreview.scss';
import IMatch from '../../models/IMatch.model';
import React from 'react';

export interface IMatchPreviewProperties {
    match: IMatch;
}


export default function MatchesForHomePreview(props: IMatchPreviewProperties) {

    function getDateFromISO(date: string): string {
        
        var dateObj = new Date(date);
        var day = dateObj.getDate();
        var month = dateObj.toLocaleString('default', { month: 'long' });

        return day + " " + month;
    }

    function getTimeFromISO(date: string): string {
        return date.substring(11, 16);
    }


    
    return (

        <div className="white-backround">
        <div className="container">
        <div className="match">
            
            <div className="match-content">
                <div className="column">
                    <div className="team team--home">
                        <div className="team-logo">
                        
                        <img src={"images/icons/" + props.match.firstTeamData.name.toLowerCase().split(' ').join('') +".png"} alt = ""/>


                        </div>
                        <h2 className="team-name">{props.match.firstTeamData.name}</h2>
                    </div>
                </div>
                <div className="column">
                    <div className="match-details">
                        <div className="match-date">
                        <strong>{getDateFromISO(props.match.date)}</strong> at <strong>{getTimeFromISO(props.match.date)}</strong>
                        </div>
                        
                        <div className="match-score">
                        
                        {props.match.firstTeamGoals !== null && props.match.secondTeamGoals !== null ?
                        <React.Fragment>
                        <span className={"match-score-number " + (props.match.firstTeamGoals > props.match.secondTeamGoals ? 'match-score-number--leading' : '') }>{props.match.firstTeamGoals}</span>
                        <span className="match-score-divider"> : </span>
                        <span className={"match-score-number " + (props.match.secondTeamGoals > props.match.firstTeamGoals ? 'match-score-number--leading' : '') }>{props.match.secondTeamGoals}</span>
                        </React.Fragment>
                        :
                        <div>
                        <span className="match-score-number">-</span>
                        <span className="match-score-divider"> : </span>
                        <span className="match-score-number">-</span>
                        </div>
                        }
                        
                        </div>
                        <div className="match-referee">
                        <strong>{props.match.stadiumData.name}</strong>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="team team--away">
                        <div className="team-logo">

                        <img src={"images/icons/" + props.match.secondTeamData.name.toLowerCase().split(' ').join('') +".png"} alt = ""/>
                        
                        </div>
                        <h2 className="team-name">{props.match.secondTeamData.name}</h2>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        
    </div>
    </div>    
    
    );

}