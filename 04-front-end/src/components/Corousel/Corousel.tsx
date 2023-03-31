import './Corousel.sass';
import { Carousel } from 'react-bootstrap'; 

export default function Corousel(){

return (
        <Carousel>
          <Carousel.Item>
            <div className='image-size'>
            <img
              className="d-block w-100"
              src="images/argintinawinners.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h1 className="black">2022 Word cup champions</h1>
              <p className="black">Argentina beat France on penalties to win World Cup after stunning final</p>
            </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
          <div className='image-size'>
            <img
              className="d-block w-100"
              src="images/allteams.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h1 className="black">All representations</h1>
              <p className="black">32 teams are competing for the trophy</p>
            </Carousel.Caption>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/mascot.jpg"
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h1 className="black">La'eeb</h1>
              <p className="black">
                Official mascot of the FIFA World Cup Qatar 2022
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}