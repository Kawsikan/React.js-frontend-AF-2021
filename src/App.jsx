import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import Categories from './components/Categories/categories';
import Vehicles from './components/Vehicles/vehicles'
import CreateVehicles from './components/Vehicles/create-vehicles';
import VehiclesInCategory from './components/Categories/vehicles-in-category';


export default function App() {
    return (
      <div>
        <Router>
          <Navbar />
          <section>
            <Switch>             
              <Route path="/categories" component={Categories}/>
               <Route path="/create-vehicle" component={CreateVehicles}/>
              <Route path="/:id" component={VehiclesInCategory} />
              <Route path="/" component={Vehicles} exact/>
            </Switch>
          </section>
        </Router>
      </div>
    )
  }