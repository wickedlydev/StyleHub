import { createContext, useEffect, useState } from "react";

// Now, we no that additemstocart will add any item to the cart, but what if the product is already in the cart
export const ItemCheckandAdd = (cartItems, productToAdd) => {
    // console.log(productToAdd.id)
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

// We need to remove the items from cart
export const ItemCheckandRemove = (cartItems, producttoRemove) => {
  // Check if product exists
  const ItemExist = cartItems.find((element) => {
    return element.id === producttoRemove.id;
  })

  // If product exists then remove the item from cart
  if(ItemExist && (producttoRemove.quantity > 1)){
    return cartItems.map((product) => 
      product.id === producttoRemove.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
    )
  }else if(ItemExist && (producttoRemove.quantity <= 1)){
    return cartItems.filter((product) => 
      product.id !== producttoRemove.id
    )
  }

  // If product does not exist then return cartItems as it is.
  return cartItems;
}

export const ItemRemovefromCheckout = (cartItems, producttoRemove) => {
  // Check if product exists
  const ItemExist = cartItems.find((element) => {
    return element.id === producttoRemove.id;
  })

  if(ItemExist){
    return cartItems.filter((product) => 
      product.id !== producttoRemove.id
    )
  }

  return cartItems;
}

export const CartContext = createContext({
    cartOpen: false,
    setcartOpen: () => {},
    cartItems: [],
    AddItemstoCart: () => {}, // Why do we want this function to be global, because the cart-items component is going to access the component when someone click on add to cart button.
    RemoveItemsfromCart: () => {},
    RemoveItemfromCheckOut: () => {},
    cartCount: 0,
    totalPrice: 0
});

export const CartProvider = ({children}) => {
    const [cartOpen, setcartOpen] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [cartCount, setcartCount] = useState(0);
    const [totalPrice, settotalPrice] = useState(0);

    const AddItemstoCart = (productToAdd) => {
      setcartItems(ItemCheckandAdd(cartItems, productToAdd));
      // console.log(cartItems);
    }

    const RemoveItemsfromCart = (producttoRemove) => {
      setcartItems(ItemCheckandRemove(cartItems, producttoRemove));
    }

    const RemoveItemfromCheckOut = (producttoRemove) => {
      setcartItems(ItemRemovefromCheckout(cartItems, producttoRemove));
    }
    useEffect(() => {
      const TotalCartItems = cartItems.reduce((ac, cv) => {
        return ac + cv.quantity;
      }, 0)

      const TotalPrice = cartItems.reduce((ac, cv) => {
        return ac + ((cv.price)*(cv.quantity));
      }, 0)
      setcartCount(TotalCartItems);
      settotalPrice(TotalPrice);
    }, [cartItems])

    const value = {cartOpen, setcartOpen, cartItems, AddItemstoCart, RemoveItemsfromCart, cartCount, setcartCount, totalPrice, RemoveItemfromCheckOut};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}