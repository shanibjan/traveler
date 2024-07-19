
import './App.css';
import DestinationDetails from './Pages/DestinationDetails';
import Destinations from './Pages/Destinations';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hotels from './Pages/Hotels';
import Hotel from './Pages/Hotel';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminLogin from './Pages/AdminLogin';
import Admin from './Pages/Admin';
import CreateSpots from './Pages/CreateSpots';
import CreateHotel from './Pages/CreateHotel';
import Bookings from './Pages/Bookings';
import './fontAwesome.js'


function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
        <Route Component={Home} exact path='/' />
        </Routes>

        <Routes>
        <Route Component={Destinations} path='/destination' />
        </Routes>

        <Routes>
        <Route Component={DestinationDetails} path='/destination_details' />
        </Routes>

        

        <Routes>
        <Route Component={Hotel} path='/hotel' />
        </Routes>

        <Routes>
        <Route Component={Login} path='/login' />
        </Routes>

        <Routes>
        <Route Component={Register} path='/register' />
        </Routes>

        <Routes>
        <Route Component={AdminLogin} path='/admin_login' />
        </Routes>


        <Routes>
        <Route Component={Admin} path='/admin' />
        </Routes>

        <Routes>
        <Route Component={CreateSpots} path='/create_spots' />
        </Routes>

        <Routes>
        <Route Component={CreateHotel} path='/create_hotel' />
        </Routes>

        <Routes>
        <Route Component={Bookings} path='/bookings' />
        </Routes>


      </Router>
       

    </div>
  );
}

export default App;
