import { FaTimes, FiEdit } from 'lib/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProductDetails,
  uploadProductImage,
} from 'redux/actions/productActions';

import Loader from './Loader';
import Modal from './Modal';

function ProductList({ products, history }) {
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
    product: createdProduct,
  } = productCreate;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = productUpdate;

  const productDelete = useSelector(state => state.productDelete);
  const { success: deleteSuccess, error: deleteError } = productDelete;

  const productImageUpload = useSelector(state => state.productImageUpload);
  const {
    loading: uploading,
    success: uploadSuccess,
    error: uploadError,
    image: uploadedImage,
  } = productImageUpload;

  if (error || deleteError || createError || updateError || uploadError) {
    toast.error(error);
    toast.error(deleteError);
    toast.error(createError);
    toast.error(uploadError);
    // toast.error(updateError);
  }

  const showModalHandler = id => {
    dispatch(listProductDetails(id));
    setShowModal(true);
  };

  useEffect(() => {
    if (createSuccess) {
      history.push(`/admin/products/${createdProduct._id}/edit`);
    }

    if (updateSuccess) {
      toast.success('Product has been updated.');
    }

    if (uploadSuccess) {
      toast.success('Product image has been uploaded.');
      setImage(uploadedImage);
    }

    if (product) {
      setImage(product.image);
      setName(product.name);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [
    dispatch,
    history,
    product,
    createSuccess,
    createdProduct,
    updateSuccess,
    uploadSuccess,
    uploadedImage,
  ]);

  const deleteProductHandler = (id, name) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
      if (deleteSuccess) {
        toast.success(`Product '${name}' has been removed.`);
      }
    }
  };

  const addProductHandler = () => {
    dispatch(createProduct());
  };

  const uploadFileHandler = e => {
    const file = e.target.files[0];
    dispatch(uploadProductImage(file));
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: product._id,
        category,
        name,
        price,
        image,
        description,
        countInStock,
      })
    );
  };

  return (
    <div className='table__wrapper'>
      {loading ? (
        <Loader />
      ) : (
        <Modal
          show={showModal}
          title={`Product ID: ${product && product._id}`}
          onClose={() => setShowModal(false)}
        >
          {createLoading && <Loader />}
          {updateLoading && <Loader />}
          <form className='form' onSubmit={submitHandler}>
            {uploading ? (
              <Loader />
            ) : (
              <div className='form__group center'>
                <img className='form__group-image' src={image} alt={name} />
                <input
                  type='file'
                  accept='image/jpg, image/jpeg, image/png'
                  onChange={uploadFileHandler}
                />
              </div>
            )}
            <div className='form__group'>
              <label className='form__group-label'>Category</label>
              <select
                className='form__group-control'
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value='Select Category' hidden>
                  Select Category
                </option>
                <option value='coffee'>Coffee</option>
                <option value='equipment'>Equipment</option>
              </select>
            </div>
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
              <label className='form__group-label'>Description</label>
              <textarea
                className='form__group-control'
                type='text'
                cols='30'
                rows='10'
                id='description'
                value={description}
                required
                onChange={e => setDescription(e.target.value)}
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
      <div className='center mb-2'>
        <button
          className='btn'
          style={{ marginLeft: 'auto' }}
          onClick={addProductHandler}
        >
          Add Product
        </button>
      </div>
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
                    onClick={() => showModalHandler(product._id)}
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
