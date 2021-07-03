/* eslint-disable jsx-a11y/anchor-is-valid */

// Css import
import './App.css';

// React imports
import 'react-bootstrap';
import { Navbar, FormControl, Form } from 'react-bootstrap';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Switch } from 'react-router-dom';

// Project imports
import Search from '../Search';
import Login from '../Login';
import Dashboard from '../Dashboard';
import Preferences from '../Preferences';
import useToken from './useToken';
import ProductPage from '../ProductPage';
import logo from '../../logo.png';
import CreateProduct from '../CreateProduct';

// Material UI imports
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

async function searchItems(tags){
  console.log(JSON.stringify({
    tags: tags
  }));
  return fetch('http://api.boreal-store.com/products/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      tags: tags
    })

  })
  .then(data => data.json());
}

function App() {
  const {token, setToken} = useToken();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  
  if(!token){
    return <Login setToken={setToken} />;
  }

  

  const searchForProduct = async (event) => {
    event.preventDefault();
    if(search !== undefined){
      const results = await searchItems(search.split(' '));
      setSearchResults(results);
      sessionStorage.setItem('searchResults', JSON.stringify(results));
      window.location.href = '/search';

    }
  }

  return (
    <div className="App">
      <Router>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"/>
        <div id="mySidenav" className="sidenav">
          <center>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/">My Products</Link>
            <Link to="/product/add">Add Product</Link>
          </center>  
        </div>
        <Navbar className="justify-content-between topNav">
          <Form inline className = "brandLogo">
            <img src={logo} className="App-logo" alt="logo" />
            <Navbar.Brand >
              <Link to="/"><h1>Boreal</h1></Link>
            </Navbar.Brand>
          </Form>

          <Form className = "searchBar" onSubmit={searchForProduct}>
            <FormControl onChange={e => setSearch(e.target.value)} type="text" placeholder="Search" className=" mr-sm-2" />
          </Form>
          
          <Navbar.Text >
          <Badge badgeContent={4} color="primary" anchorOrigin={{ vertical: 'top', horizontal: 'right'}}>
            <MailIcon />
          </Badge>
          <Badge></Badge>
          <Badge>
            <a onClick={logout} href="#" id="logoutBtn" title="Logout" className="_username">
              <MeetingRoomIcon/>
            </a>
          </Badge>
          </Navbar.Text>
        </Navbar>
        <div className="contenty">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/search">
            <Search items={searchResults}/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="/product/add">
            <CreateProduct />
          </Route>
          <Route path="/product/:id" component={ProductPage}/>
        </Switch>
        </div>
    </Router>
    </div>
    
    
  );
}

function logout(){
  localStorage.removeItem('token');
  window.location.reload();
}

export default App;
