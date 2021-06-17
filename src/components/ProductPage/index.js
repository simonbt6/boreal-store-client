import React from "react";
import Container from '@material-ui/core/Button';
import './ProductPage.css';
import { FetchAPI } from '../../Utils/Fetch';


export default class ProductPage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.id = this.props.match.params.id;
        console.log(this.id);
        
        
    }
    
    componentDidMount(){
        (async() => {

            // Fetch product
            const product = await FetchAPI.getProduct(this.id);
            // Fetch product's tags
            const tags = await FetchAPI.getProductTags(this.id);

            // If product doesn't exist, display error message.
            if(product.message !== undefined){
                // Display error message
                console.log(product.message);
                document.getElementById('productName').textContent = product.message;
            }
            else{
                // Else, display product page.
                console.log("Product: ", product);
                console.log("Tags: ", tags);
                document.getElementById('productName').textContent = product.name;
                document.getElementById('productImage').src = product.imageURL;
            }
        })();
    }

    render(){
        return (
            <Container fluid>
                <div className="product-page-container">
                    <div className="right-pane">
                        {/* Product image placeholder */}        
                        <img id="productImage" alt={this.id}/>
                    </div>
                    <div className="left-pane product-description-pane">
                        <h1>
                            {/* Product name placeholder */}
                            <span id="productName"></span>
                        </h1>
                    </div>
                </div>
            </Container>
        );
    }
}

