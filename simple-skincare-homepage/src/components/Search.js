import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Search(){
    //need to reach out to my repository to do a skincareRepository.findAll()
    const navigate = useNavigate();
    const selectProduct = (product) => {
        navigate("/product", { state: { product }});
    };

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const hStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        minHeight: '100vh',

        backgroundImage: `
            linear-gradient(
            rgba(239, 221, 234, 0.5)`
        
    }

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '80%',
        textAlign: 'left',
        margin: '0 auto'
    }

    const searchSection = {
        height: '20vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }

    const searchBar = {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '999px',
        fontSize: '20px',
        width: '90%',
        height: '60px',
        color: 'black',
        alignItems: 'center',
        textAlign: 'center',
        margin: '0 auto'
    }

    const buttonStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        gap: '30px',
    }

    const buttonTextStyle = {
        gap: '60px',
        fontSize: '15px',
        width: '250px',
        height: '50px',
        borderRadius: '999px',
        color: 'black',
        backgroundImage: `
            linear-gradient(
            rgba(251, 208, 239, 0.5)`
    }


    useEffect(() => {
        async function getProducts(){
        try {
            const response = await fetch(
                `/skincares/search`
            );
            if (!response.ok){
                throw new Error("No products found");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching skincare products: ", error);
        }
        }
        getProducts();
    }, []);

    const filteredProducts = products.filter(products =>
        products.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div style = {hStyle}>
            <div style = {searchSection}>  
            <input style = {searchBar}
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <ul style = {listStyle}>
                {filteredProducts.map((product) => ( 
                    <li 
                        key={product.id}
                            onClick={() => selectProduct(product)}
                            style={{ cursor: 'pointer' }} 
                        >
                        <h2>{product.name}</h2>
                        <p>{product.barcode}</p>
                    </li>
                ))}
            </ul>
            <div style = {buttonStyle}>
            <Link to="/"><button style={buttonTextStyle}>
                Go To Homepage
                </button></Link>
            </div>
        </div>

    );

}

export default Search;