import './CreateProduct.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Spinner} from 'react-bootstrap';
import { string } from 'prop-types';

// ASYNC create product fetch function
async function createProduct(product){
    return fetch('http://api.boreal-store.com/products/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "product":{
                "url": product.url
            }
        })
    })
    .then(data => data.json())
    .catch(function(error){
         console.error(error)
    });
}

/**
 * ASYNC function to create/update tags. 
 * @param {Text} tag 
 * @param {Object} product 
 */
async function createTag(tags, product){
    return fetch('http://api.boreal-store.com/tags/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tags)
    })
    .catch(function(error){
        console.error(error);
    });
}

/**
 * ASYNC update product fetch function.
 * @param {Object} product 
 */
async function updateProduct(product = {
    id: Number,
    tags: Array

}){
    return fetch('http://api.boreal-store.com/tags/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "product_id": product.id,
            "tags": product.tags
        })
    })
}

export default class CreateProduct extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addProduct: {
                url: ""
            },
            newProduct: {}
        }
    }

    // Event handler for update product submit.
    fnUpdateProduct = async (e) => {
        e.preventDefault();
        console.log(this.state.newProduct);
        const response = await updateProduct(this.state.newProduct);
        const tags = this.state.newProduct.tags;
        // Checks if the response is OK.
        if(response.status == 200){
            console.log("Everything works fine");
        }
        else{
            console.log(response);
        }

    }

    // Display product tags
    /**
     * 
     * @param {React.Component} component 
     * @returns Array
     */
    showTags(component) {
        let tags = [];
        component.state.newProduct.tags.map((value, key) => {
            let changeTag = async (e) => {
                let key = e.target.id;
                let value = e.target.value;
                component.state.newProduct.tags[key] = value;
            }
            tags.push(<input className="formInput" id={key} onChange={changeTag} defaultValue={value}/>);
        });
        return tags;
    }

    
    // Event handler for create product submit.
    fnCreateProduct = async (e) => {
        e.preventDefault();
        document.querySelector('.loader').style.display = "block"; 
        (async () => {
            const createdProduct = await createProduct({
                url: this.state.addProduct.url
            });
            this.setState({newProduct: createdProduct});
            console.log(this.state);
            if(createdProduct){
                let updateContainer = (
                    <div className="updateCreatedProduct-container">
                        <div className="productFormContainer">
                            <form className="productForm" onSubmit={this.fnUpdateProduct}>
                                <label>
                                    <p>Title</p>
                                    <input className="formInput lgInput" type="text" name="" defaultValue={createdProduct.name} onChange={function(e){

                                    }} id=""/>    
                                </label>
                                <br/>
                                <label>
                                    <p>Brand</p>
                                    <input className="formInput" type="text" name="" defaultValue={createdProduct.brand} onChange={function(e) {

                                    }} id=""/>    
                                </label>
                                <br/>    
                                <label>
                                    <p>Tags</p>
                                    <div className="tags">

                                    </div>

                                    <input type="button" className="btn submitBtn" value="Add tag" onClick={(e) => {
                                        this.state.newProduct.tags.push('');
                                        console.log(this.state.newProduct.tags);
                                        ReactDOM.render(this.showTags(this), document.querySelector('.tags'));
                                    }}/>
                                </label>
                                <div>
                                    <button className="btn submitBtn">Update</button>
                                    
                                </div>
                            </form>
                        </div>      
                    </div>
                );
                ReactDOM.render(updateContainer, document.querySelector('.CreateProduct-container'));
                ReactDOM.render(this.showTags(this), document.querySelector('.tags'));
            }
        })();
    }

    render(){
        return(
            <div className="CreateProduct-container">
                <h3>Add a new product</h3>
                <div className="loader">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
                <div className="productFormContainer">
                    <form className="productForm" onSubmit={this.fnCreateProduct}>
                        <label className="label-lg">
                            <p>Product URL</p>
                            <input type="url" className="formInput form-control-md lg" onChange={(e) => {
                                this.setState({
                                    addProduct: {
                                        url: e.target.value
                                    }
                                })
                                console.log(this.state.addProduct.url)}
                                } type="text" required/>
                        </label>
                        <br/>
                        <input className="btn submitBtn" type="submit" value="Create product"/>

                    </form>
                </div>
            </div>
        );
    }
}


