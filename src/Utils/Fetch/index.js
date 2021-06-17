import React from "react";

/**
 * React component class to fetch data from API.
 * @author Simon Brisebois-Therrien
 * @static
 */
export class FetchAPI extends React.Component{
    /**
     * Fetch a product from API.
     * @param {Number} id 
     * @returns Single product matching ID.
     */
    static async getProduct(id){
        return fetch('http://api.boreal-store.com/products/'+id, {method: 'GET'})
        .then(data => data.json());
    }

    /**
     * Fetch all products from API.
     * @returns Array of all products.
     */
    static async getProducts(){
        return fetch('http://api.boreal-store.com/products', {method: 'GET'})
        .then(data => data.json());
    }

    /**
     * Fetch products corresponding tags from API.
     * @param {Array} tags
     * @returns Array of products matching tags. 
     * 
     */
    static async searchByTag(tags){
        return fetch('http://api.boreal-store.com/products/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                tags: tags
            }
        }).then(data => data.json());
    }

    /**
     * Fetch product's tags.
     * @param {Number} productID 
     * @returns Array of tags.
     */
    static async getProductTags(productID)
    {
        return fetch('http://api.boreal-store.com/tags/' + productID, {
            method: 'GET'
        }).then(data => data.json());
    }

    render(){
        return null;
    }


}