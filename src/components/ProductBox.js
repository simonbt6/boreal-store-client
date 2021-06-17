import React from "react";
import { Link } from "react-router-dom";
import './ProductBox.css';

export default class ProductBox extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.productURL = "/product/"+this.props.product.id;
    }
    

    render(){
        return (
            <div className="productBox">
                <div>
                    <div className="productImgDiv">
                        <a href={this.productURL}>
                            <img className="productImg" src={this.props.product.imageURL} alt={this.props.product.name}/>
                        </a>
                    </div>
                    <span>
                        <a href={this.props.product.url} className="productTxt"> {this.props.product.name} </a>
                    </span>
                    <span id="shopname"></span>
                </div>
                <p className="priceTag">${this.props.product.price}</p>
            </div>
        );
    }
}
/*return (
    <div className="productBox">
        <div>
            <div className="productImgDiv">
                <a href={this.productURL}>
                    <img className="productImg" src={this.props.product.imageURL} alt={this.props.product.name}/>
                </a>
            </div>
            <span>
                <a href={this.props.product.url} className="productTxt"> {this.props.product.name} </a>
            </span>
            <span id="shopname"></span>
        </div>
        <p className="priceTag">${this.props.product.price}</p>
    </div>
    */