import React from 'react';
import ReactDOM from 'react-dom';


//Importing CSS files and reactstrap components
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table} from 'reactstrap';

//Importing custom modules
import OrderParent from './orderModule.js';
import menuImport from './menu';
import * as serviceWorker from './serviceWorker';


//date functionality for 'daily menu'
let date = new Date();

//set the day suffix
let day = date.getDate();

if (day === 1 || day === 21 || day === 31) { day = day + 'st'}
else if (day === 2 || day === 22) { day = day + 'nd'}
else if (day === 3 || day === 23) { day = day + 'rd'}
else { day = day + 'th'};

//converting the numerical month to text
let month = date.getMonth();
switch (month) {
  case 0: month = 'January';
    break;
  case 1: month = 'February';
    break;
  case 2: month = 'March';
    break;
  case 3: month = 'April';
    break;
  case 4: month = 'May';
    break;
  case 5: month = 'June';
    break;
  case 6: month = 'July';
    break;
  case 7: month = 'August';
    break;
  case 8: month = 'September';
    break;
  case 9: month = 'October';
    break;
  case 10: month = 'November';
    break;
  case 11: month = 'December';
    break;

  default:
    break;
}
//end of date functionality

//App assembly 
class App extends React.Component {

  render() {
    return (<div>
      <Landing />
      <Intro />
      <Menu />
      <OrderParent />
      <Footer />
    </div>
    )
  }
}
//End of app assembly

//Non-interactive components below:
//---------------------------------


//Create the landing image and text 
class Landing extends React.Component {
  render() {
    return <div className='header'>
      <div className='headerText'>
        <h1>'Valle de la Sella' Bar and grill</h1>
        <h3>Traditional Spanish cuisine </h3>
        <h3>in the heart of the Picos de Europa</h3>
      </div>
    </div>
  }
}
//end of landing section

//Create the responsive information boxes below the landing image
class Intro extends React.Component {
  render() {
    return (
      <Container className='intro'>
        <Row>
          <Col md="4">
            <h3>Local ingredients</h3>
            <p >Our kitchen uses only the finest ingredients from the mountains, rivers, seas and forests of Asturias.</p>
          </Col>
          <Col md="4">
            <h3>Seasonal flavors</h3>
            <p>Our menu changes daily depending on what is available and in season, so you will never have the same experience twice.</p>
          </Col>
          <Col md="4">
            <h3>World-class cuisine</h3>
            <p>Our award-winning cuisine demonstrates traditional home-style cooking, always prepared to the highest standard.</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
//End of information boxes


//Daily menu (non-interactive, updated from the express server)
class Menu extends React.Component {
  constructor() {
    super();
    this.state = ({ menu: menuImport })
  }
 
  render() {
    return (
      <div >
        <hr></hr>
        <h3 className='sectionHeader'>Our menu today ({month} {day}, {date.getFullYear()})</h3>
        <p className='sectionHeader'><i>All dishes subject to availability</i></p>
        <Table striped borderless responsive>
          <thead>
            <tr>
              <th>
                Dish
              </th>
              <th>
                Description
              </th>
              <th>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.menu.map((item,index) => {
              return <tr>
                <td key ={'item' + index}>{item.name}</td>
                <td key ={'description' + index}>{item.desc}</td>
                <td key ={'price' + index}>€{item.price.toFixed(2)}</td>
              </tr>
            })
            }
          </tbody>

        </Table>
      </div>)
  }
}
//end of daily menu



//Footer
class Footer extends React.Component {
  render() {
    return <div className='footer'>

      <Container>
        <Row>
          <Col><h3 className='sectionHeader'>'Valle de la Sella' bar and grill</h3></Col>
        </Row>

        <Row>
          <Col><h5>This website is for demonstration purposes only.</h5>
            <p>This site demonstrates various web design technologies and does not represent a real restaurant.</p>

          </Col>
          <Col><h5>Built with React</h5>
            <ul>
              <li>Responsive design with Reactstrap</li>
              <li>Back-end with Node.js and Express</li>
              <li>Hosting by Heroku</li>
            </ul>
          </Col>
          <Col><h5>Contact</h5>
            <ul>
              <li>Github: <a href='https://github.com/abacobob/staticReactSite' target='blank'>View this project on Github</a></li>
              <li>LinkedIn: <a href='https://www.linkedin.com/in/chris-davies-819113186/' target='blank'>Contact the developer</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col><h5 className='sectionHeader'>© Copyright 2020</h5></Col>
        </Row>
      </Container>
    </div>
  }
}
//End of footer


//Render the App
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
