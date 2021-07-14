import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CheckoutSteps({ step1, step2, step3 }) {
  return (
    <nav className='checkout__step center'>
      <li className='checkout__step-item'>
        {step1 ? (
          <NavLink to='/cart'>Shopping Cart</NavLink>
        ) : (
          <p>Shopping Cart</p>
        )}
      </li>
      <li className='checkout__step-item'>
        {step2 ? <NavLink to='/shipping'>Shipping</NavLink> : <p>Shipping</p>}
      </li>
      <li className='checkout__step-item'>
        {step3 ? <NavLink to='/checkout'>Checkout</NavLink> : <p>Checkout</p>}
      </li>
    </nav>
  );
}
