import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import { useContext } from 'react';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return <header id="main-header">
    <div id="title">
      <img src={logoImg} />
      <h1>Order Ease</h1>
    </div>
    <nav>
      <Button textOnly>Cart ({totalCartItems})</Button>
    </nav>
  </header>
}