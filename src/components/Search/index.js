import 'react-bootstrap';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductBox from '../ProductBox';
import ReactDOM from 'react-dom';
//import { InputGroup, FormControl } from 'react-bootstrap';

const rows = 5;
const cols = 3;

async function getProducts(){
    return fetch('http://149.28.37.80/products', {method: 'GET'})
    .then(data => data.json());
}

export default class Search extends React.Component{
    constructor(props){
        super(props);
        console.log("Search props: ", this.props);
        this.state = {
            products: {}
        }
    }

    componentDidMount(){
        (async () => {
            let products = [];
            if(sessionStorage.getItem('searchResults') !=undefined){
                products = JSON.parse(sessionStorage.getItem('searchResults'));
                
                console.log(products);
                sessionStorage.removeItem('searchResults');
            }
            
            else if(this.props.items == undefined){
                products = await getProducts();
            }
            else products = this.props.items;

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
                    <div>
                    <Container id="searchResultsContainer" fluid="xxl" className="justify-content-md-space-between content-container"></Container>
                    </div>
            </div>
        );
    }
}