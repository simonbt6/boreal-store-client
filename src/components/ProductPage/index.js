import React from "react";
import './ProductPage.css';
import { FetchAPI } from '../../Utils/Fetch';

// Material UI
import { Container } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

export default class ProductPage extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.id = this.props.match.params.id;
        console.log(this.id);
        this.state = {
            rating : 0
        }
          
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
                document.getElementById('product-name').textContent = product.message;
            }
            else{
                // Else, display product page.
                console.log("Product: ", product);
                console.log("Tags: ", tags);
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-image').src = product.imageURL;
                
                this.setState({rating: product.shop});

                tags.forEach(tag => {
                    //document.getElementById('product-tags').appendChild(<div>{tag.name}</div>);
                });
            }
        })();
    }
    

    render(){
        return (
            <Container>
                <div className="product-page-container">
                    <div className="right-pane">
                        {/* Product image placeholder */}        
                        <img id="product-image" alt={this.id}/>
                    </div>
                    <div className="left-pane product-information-pane">
                        <div className="product-title-section">
                            <h1>
                                {/* Product name placeholder */}
                                <span id="product-name"></span>
                            </h1>
                        </div>
                        <div className="product-rating-section">
                            <Rating 
                                name="read-only"
                                id="product-rating"
                                value={this.state.rating ? 0 : this.state.rating}
                                onchange={(event, newValue) => {}} 
                                readOnly
                            />
                        </div>
                        <div className="product-tags-section">
                            <span id="product-tags"></span>
                        </div>
                        <div className="product-description-section">
                            {/** Product description placeholder **/}
                            <p>Lorem epsum</p>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}