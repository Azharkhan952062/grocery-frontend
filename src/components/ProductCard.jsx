import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ProductCard = ({ product }) => {
    const { navigate, addToCart, cartItems, removeFromCart, updateCartItem } = useContext(AppContext);
    //const [count, setCount] = useState(0);
    return (
        product && (
            <div onClick={() => {
                navigate(`/product/${product.category.toLowerCase()}/${product._id}`)
            }}
                className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
                <div className="group cursor-pointer flex items-center justify-center px-2">
                    <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={`http://localhost:5000/images/${product.image[0]}`} alt={product.name} />
                </div>
                <div className="text-gray-500/60 text-sm">
                    <p>{product.category}</p>
                    <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                    <div className="flex items-center gap-0.5">
                        {Array(5).fill("").map((_, i) =>
                            product.rating > i ? (
                                <svg
                                    key={i}
                                    className="w-[14px] h-[13px] fill-current text-indigo-500"
                                    viewBox="0 0 18 17"
                                >
                                    <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                                </svg>
                            ) : (
                                <svg
                                    key={i}
                                    className="w-[14px] h-[13px] fill-current text-indigo-500 opacity-30"
                                    viewBox="0 0 18 17"
                                >
                                    <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                                </svg>
                            )
                        )}
                        <p className="text-sm text-gray-500">({product.rating})</p>
                    </div>

                    <div className="flex items-end justify-between mt-3">
                        <p className="md:text-xl text-base font-medium text-indigo-500">
                            ${product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${product.price}</span>
                        </p>
                        <div
                            className="text-indigo-500"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {!cartItems?.[product._id] ? (
                                <button className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium" onClick={() => addToCart(product._id)} >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Add
                                </button>
                            ) : (
                                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                                    <button
                                        onClick={() => {
                                            const qty = cartItems[product._id];
                                            if (qty > 1) {
                                                updateCartItem(product._id, qty - 1);
                                            } else {
                                                removeFromCart(product._id);
                                            }
                                        }}
                                        className="cursor-pointer text-md px-2 h-full"
                                    >
                                        -
                                    </button>
                                    <span className="w-5 text-center">{cartItems[product._id]}</span>
                                    <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductCard