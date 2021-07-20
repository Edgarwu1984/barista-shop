import React from 'react';
import LocalTimeFormatter from 'utils/LocalTimeFormatter';
import { Link } from 'react-router-dom';

function OrderList({ orders }) {
  return (
    <div className='table__wrapper'>
      <table>
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>USER</th>
            <th>SHIPPING ADDRESS</th>
            <th>TOTAL PRICE</th>
            <th>PAID AT</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{Object.values(order.shippingAddress).join()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{LocalTimeFormatter(order.paidAt)}</td>
                <td>
                  {order.isDelivered ? order.deliveredAt : 'Not Delivered'}
                </td>
                <td>
                  <Link
                    className='btn btn__outline btn-sm'
                    to={`/orders/${order._id}`}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
