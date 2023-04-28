import './ScheduleAMatch.sass';

export default function ScheduleAMatch() {
    return (
    
    <div className="white">
    <div className="centar">

        <form>
        <br/>
        <h1>SCHEDULE A MATCH</h1>
        <br/>
        <div className="form-group">
            <label>1st team:</label>
            <select className="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>
            <br/>
        </div>
        <div className="form-group">
            <label>2nd team:</label>
            <select className="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>
            <br/>
        </div>
        <label htmlFor="date">Date:</label>
        <br/>
        <input type="datetime-local" id="birthdaytime" name="birthdaytime"/>
        
        <div className="form-group">
            <br/>
            <label>Stadium:</label>
            <select className="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </select>
            <br/>
        </div>
        <button type="button" className="btn btn-secondary btn-lg">Schedule a match</button>
        </form>

        
    </div>
    </div>
       

    );
}