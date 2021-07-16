import { FaTimes, FiEdit } from 'lib/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  deleteProduct,
  listProductDetails,
} from 'redux/actions/productActions';
import Loader from './Loader';
import Modal from './Modal';

function ProductList({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(1);
  const [countInStock, setCountInStock] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productDelete = useSelector(state => state.productDelete);

  const { success: deleteSuccess, error: deleteError } = productDelete;

  if (error || deleteError) {
    toast.error(error);
    toast.error(deleteError);
  }

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, product]);

  const showModalHandler = (category, id) => {
    dispatch(listProductDetails(category, id));
    setShowModal(true);
  };

  const deleteProductHandler = (id, name) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
      if (deleteSuccess) {
        toast.success(`Product '${name}' has been removed.`);
      }
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    // dispatch(
    //   updateUser({
    //     _id: user._id,
    //     name,
    //     email,
    //     isAdmin,
    //   })
    // );
  };

  return (
    <div className='table__wrapper'>
      {loading ? (
        <Loader />
      ) : (
        <Modal
          show={showModal}
          title={`User ID: ${product && product._id}`}
          onClose={() => setShowModal(false)}
        >
          {/* {updateLoading && <Loader />} */}
          <form className='form' onSubmit={submitHandler}>
            <div className='form__group'>
              <label className='form__group-label'>Product Name</label>
              <input
                className='form__group-control'
                type='text'
                id='name'
                value={name}
                required
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='form__group'>
              <label className='form__group-label'>Price</label>
              <input
                className='form__group-control'
                type='number'
                id='price'
                value={price}
                required
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className='form__group'>
              <label className='form__group-label'>Stock</label>
              <input
                className='form__group-control'
                type='number'
                id='stock'
                value={countInStock}
                required
                onChange={e => setCountInStock(e.target.value)}
              />
            </div>
            <div className='form__group'>
              <input
                className='form__group-control btn mb-2'
                type='submit'
                value='Update'
              />
            </div>
          </form>
        </Modal>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CATEGORY</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>$ {product.price.toFixed(2)}</td>
                <td>
                  {product.countInStock === 0
                    ? 'Out of Stock'
                    : product.countInStock}
                </td>
                <td>
                  <button
                    className='table__btn'
                    onClick={() =>
                      showModalHandler(product.category, product._id)
                    }
                  >
                    <FiEdit />
                  </button>
                  <button
                    className='table__btn table__btn-danger'
                    onClick={() =>
                      deleteProductHandler(product._id, product.name)
                    }
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
