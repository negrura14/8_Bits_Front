import React, { useEffect, useState } from 'react'
import './ShopCart.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, UpdateList } from '../../Redux/cartSlice';


export const ShopCart = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(state => state.cart.isCartOpen);
    const cartOpen = isCartOpen ? 'shop show' : 'shop';
    const cartRedux = useSelector(state => state.cart.listCart);


    useEffect(() => {
        if(isCartOpen) {
            dispatch(UpdateList())
        }
    }, [isCartOpen])
        

    const removeFromCart = (itemId) => {
        const updatedCart = cartRedux.filter(item => item.id !== itemId);

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        dispatch(UpdateList())
    }
    
    const AddOrSubClick = (itemId, addSub) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if(addSub === 'add'){
            for(const element of cartRedux){
                if(element.id === itemId){
                    cart.push(element)
                    localStorage.setItem('cart', JSON.stringify(cart));
                    dispatch(UpdateList())
                    break;
                }
            }
        }
        else if(addSub === 'sub'){
            for (let i = cartRedux.length - 1; i > -1; i--) {
                if (cartRedux[i].id === itemId) {
                  cart.splice(i, 1); 
                  localStorage.setItem('cart', JSON.stringify(cart));
                  dispatch(UpdateList());
                  break; 
                }
            }
        }
    }
   

   
    const totalGames = [] ;
    const uniqueIds = {};
    let totalPrice = 0;

    for (const element of cartRedux) {
        totalPrice = totalPrice + Number(element.price);
        if (!uniqueIds[element.id]) {
            uniqueIds[element.id] = true;
            totalGames.push({
                id: element.id,
                name: element.name,
                image: element.image,
                price: element.price,
                cant: 1,
            });
        }
        else {
            const existingIndex = totalGames.findIndex(item => item.id === element.id);
            if (existingIndex !== -1) {
                // Incrementa la cantidad del juego existente
                totalGames[existingIndex].cant++;
            }
        }
    }

    const handleCloseCart = () => {
        dispatch(toggleCart());
    }

   

    return (
        <div className={cartOpen}>
            <div className="subCont">
                <div className="headerCart">
                    <span>Mi Carrito</span>
                    <span className="closeCart" onClick={handleCloseCart}>x</span>
                </div>
                <div className="container-target">
                    {   totalGames.map((element, index) => (
                            <div key={index} className="target">
                                <p className="title-target">{element.name}</p>
                                <div className="img-price-cant">
                                    <img className="dimension-img" src={element.image} alt="" />
                                    <div className="price-cant">
                                        <p className="scroll space">$USD {element.price}</p>
                                        <div className="space">
                                            <span className="scroll addSub-pointer" onClick={() => AddOrSubClick(element.id, 'sub')}>&lt;</span>
                                            <span className="scroll count">{element.cant} units</span>
                                            <span className="scroll addSub-pointer" onClick={() => AddOrSubClick(element.id, 'add')}>&gt;</span>
                                        </div>
                                    </div>
                                    <div className="close-target" onClick={() => removeFromCart(element.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))
                    }                   
                </div>
                {totalGames.length > 0 ?
                <div className="TotalBuy">
                    <p>Total: $USD {totalPrice.toFixed(1)}</p>
                    <button className="buy-button">Buy</button>
                </div>
                 : '' }
            </div>
        </div>
    )

}
