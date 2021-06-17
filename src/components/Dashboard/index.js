import React from 'react';
import {Container, Dropdown} from 'react-bootstrap';
import './Dashboard.css';
import ProductBox from '../ProductBox';
import ReactDOM from 'react-dom';

async function getProducts(){
    return fetch('http://149.28.37.80/products', {method: 'GET'})
    .then(data => data.json());
}
export default class Dashboard extends React.Component{
    componentDidMount(){
        (async() => {
            const products = await getProducts();
            let productBoxes = [];
            products.forEach(product => {
                productBoxes.push(<ProductBox product={product} />);
            });
            ReactDOM.render(productBoxes, document.querySelector('#searchResultsContainer'));
        })();
        
    }

    
    render(){
        return (
            <div className="Search">
                <div className="filters-container">
                    
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Filters
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#" className="DropDrownItem">Hello</Dropdown.Item>
                            <Dropdown.Item>Bye</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Filters
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item><input type="range" className="form-range"/></Dropdown.Item>
                            <Dropdown.Item>Bye</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    
                </div>        
                <Container id="searchResultsContainer" fluid="xxl" className="justify-content-md-space-between content-container">
                </Container>
            </div>
        );
    }
}