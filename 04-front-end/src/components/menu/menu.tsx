import {Link} from 'react-router-dom';
import './menu.sass';

export default function Menu() {
    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/"><img className="logo" src="images/logo.png" alt="logo"/></Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    
                    <Link className="nav-item nav-link" to="/groups"><h4><b>GROUPS</b></h4></Link>
                    <Link className="nav-item nav-link" to="/matches"><h4><b>MATCHES</b></h4></Link>
                    <Link className="nav-item nav-link" to="/stadium"><h4><b>STADIUMS</b></h4></Link>
                    
                    </ul>
            </div>
            </nav>
        
       

    );
}