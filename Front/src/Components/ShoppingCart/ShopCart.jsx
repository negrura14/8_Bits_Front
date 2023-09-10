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

    // const tptalCrice = 

    return (
        <div class={cartOpen}>
            <div className="subCont">
                <div class="headerCart">
                    <span>Mi Carrito</span>
                    <span class="closeCart" onClick={handleCloseCart}>x</span>
                </div>
                <div class="container-target">
                    {   cart.map(element => (
                        <div class="target">
                            <p class="title-target">{element.name}</p>
                            <div class="img-price-cant">
                                <img class="dimension-img" src={element.image} alt="" />
                                <div class="price-cant">
                                    <p class="scroll">$USD{element.price}</p>
                                    <div>
                                        <span class="scroll">&lt;</span>
                                        <span class="scroll count">cant</span>
                                        <span class="scroll">&gt;</span>
                                    </div>
                                </div>
                                <div class="close-target">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        // <div class="target">
                        //     <p class="title-target">Name</p>
                        //     <div class="img-price-cant">
                        //         <img class="dimension-img" src="https://i.blogs.es/f52c71/mejores-juegos-nintendo-switch/1366_2000.jpg" alt="" />
                        //         <div class="price-cant">
                        //             <p class="scroll">Price</p>
                        //             <div>
                        //                 <span class="scroll">&lt;</span>
                        //                 <span class="scroll count">cant</span>
                        //                 <span class="scroll">&gt;</span>
                        //             </div>
                        //         </div>
                        //         <div class="close-target">C</div>
                        //     </div>
                        // </div>
                        // <div class="target">
                        //     <p class="title-target">Name</p>
                        //     <div class="img-price-cant">
                        //         <img class="dimension-img" src="https://i.blogs.es/f52c71/mejores-juegos-nintendo-switch/1366_2000.jpg" alt="" />
                        //         <div class="price-cant">
                        //             <p class="scroll">Price</p>
                        //             <div>
                        //                 <span class="scroll">&lt;</span>
                        //                 <span class="scroll count">cant</span>
                        //                 <span class="scroll">&gt;</span>
                        //             </div>
                        //         </div>
                        //         <div class="close-target">C</div>
                        //     </div>
                        // </div>
                        // <div class="target">
                        //     <p class="title-target">Name</p>
                        //     <div class="img-price-cant">
                        //         <img class="dimension-img" src="https://i.blogs.es/f52c71/mejores-juegos-nintendo-switch/1366_2000.jpg" alt="" />
                        //         <div class="price-cant">
                        //             <p class="scroll">Price</p>
                        //             <div>
                        //                 <span class="scroll">&lt;</span>
                        //                 <span class="scroll count">cant</span>
                        //                 <span class="scroll">&gt;</span>
                        //             </div>
                        //         </div>
                        //         <div class="close-target">C</div>
                        //     </div>
                        // </div>
                        ))
                    }                   
                </div>
                <div>
                    <p>Total: $USD </p>
                </div>
            </div>
        </div>
    )

}
