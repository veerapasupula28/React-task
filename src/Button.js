import React from 'react'

function Button({course, handleButton, type}){
    return(
        <div>
            <button className="cart-add-button" onClick={()=> handleButton(course, type)}>
                {type == "Add" ? "Add to cart" : "Remove from cart"}
            </button>
        </div>
    )
}
export default Button;