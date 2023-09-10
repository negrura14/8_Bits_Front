import React from 'react'
import './ShopCart.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../Redux/cartSlice';
export const ShopCart = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(state => state.cart.isCartOpen);
    const cartOpen = isCartOpen ? 'shop show' : 'shop';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("DENTRO DEL COMPONENTE SHOPCART EL RESULTADO DE LA VARIABLE GLOBAL ES: ", cart);
    
    const handleCloseCart = () => {
        dispatch(toggleCart());
    }


    return (
        <div class={cartOpen}>
            <div className="subCont">
                <div class="headerCart">
                    <span>Mi Carrito</span>
                    <span class="closeCart" onClick={handleCloseCart}>x</span>
                </div>
                <div class="container-target">
                    {/* {   cart.map(element => ( */}
                        <div class="target">
                            <p class="title-target">Name</p>
                            <div class="img-price-cant">
                                <img class="dimension-img" src="https://i.blogs.es/f52c71/mejores-juegos-nintendo-switch/1366_2000.jpg" alt="" />
                                <div class="price-cant">
                                    <p class="scroll">Price</p>
                                    <div>
                                        <span class="scroll">&lt;</span>
                                        <span class="scroll count">cant</span>
                                        <span class="scroll">&gt;</span>
                                    </div>
                                </div>
                                <div class="close-target">C</div>
                            </div>
                        </div>
                        <div class="target">
                            <p class="title-target">Name</p>
                            <div class="img-price-cant">
                                <img class="dimension-img" src="https://i.blogs.es/f52c71/mejores-juegos-nintendo-switch/1366_2000.jpg" alt="" />
                                <div class="price-cant">
                                    <p class="scroll">Price</p>
                                    <div>
                                        <span class="scroll">&lt;</span>
                                        <span class="scroll count">cant</span>
                                        <span class="scroll">&gt;</span>
                                    </div>
                                </div>
                                <div class="close-target">C</div>
                            </div>
                        </div>
                        <div class="target">
                            <p class="title-target">Name</p>
                            <div class="img-price-cant">
                                <img class="dimension-img" src="https://i.blogs.es/f52c71/mejores-juegos-nintendo-switch/1366_2000.jpg" alt="" />
                                <div class="price-cant">
                                    <p class="scroll">Price</p>
                                    <div>
                                        <span class="scroll">&lt;</span>
                                        <span class="scroll count">cant</span>
                                        <span class="scroll">&gt;</span>
                                    </div>
                                </div>
                                <div class="close-target">C</div>
                            </div>
                        </div>
                        <div class="target">
                            <p class="title-target">Name</p>
                            <div class="img-price-cant">
                                <img class="dimension-img" src="https://i.blogs.es/f52c71/mejores-juegos-nintendo-switch/1366_2000.jpg" alt="" />
                                <div class="price-cant">
                                    <p class="scroll">Price</p>
                                    <div>
                                        <span class="scroll">&lt;</span>
                                        <span class="scroll count">cant</span>
                                        <span class="scroll">&gt;</span>
                                    </div>
                                </div>
                                <div class="close-target">C</div>
                            </div>
                        </div>
                        {/* ))
                    } */}                  
                </div>
            </div>
        </div>
    )

}
