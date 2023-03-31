import IStadium from "../../models/IStadium.model";
import './StadiumPreview.sass';

export interface IStadiumPreviewProperties {
    stadium: IStadium;
}


export default function StadiumPreview(props: IStadiumPreviewProperties) {
   
   return (
        <div className="card">
        <img className="card-img-top" src={ props.stadium.picture} alt={props.stadium.name}/>
        <div className="card-body">
            <h1 className="card-title">{ props.stadium.name}</h1>
            <h5 className="card-title">Capacity: { props.stadium.capacity}</h5>
        </div>
    </div>
    
   );

}