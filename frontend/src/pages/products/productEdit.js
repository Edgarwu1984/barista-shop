import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Hero from 'components/layout/Hero';
import Layout from 'components/layout/Layout';
import Divider from 'components/layout/Divider';
import { bg11 } from 'assets';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';
import {
  deleteProduct,
  listProductDetails,
  updateProduct,
  uploadProductImage,
} from 'redux/actions/productActions';

function ProductEditPage({ match, history }) {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  // const [uploading, setUploading] = useState(false);

  const productId = match.params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading: loadingProductDetails, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { success: updateProductSuccess, error: updateProductError } =
    productUpdate;

  const productImageUpload = useSelector(state => state.productImageUpload);

  const {
    loading: uploading,
    success,
    error: uploadError,
    image: uploadedImage,
  } = productImageUpload;

  useEffect(() => {
    if (updateProductError || uploadError) {
      toast.error(updateProductError);
      toast.error(uploadError);
    } else if (updateProductSuccess) {
      history.push('/admin/dashboard');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setImage(product.image);
        setName(product.name);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
      }
    }

    if (success) {
      toast.success('Product image has been uploaded.');
      setImage(uploadedImage);
    }
  }, [
    dispatch,
    history,
    product,
    productId,
    updateProductSuccess,
    updateProductError,
    success,
    uploadError,
    uploadedImage,
  ]);

  const deleteProductHandler = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(product._id));
      history.goBack();
    }
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
    <Layout>
      <Hero bgImage={bg11} height='400px'>
        <div className='title-center'>
          <h1 className='mb-4'>Create Product</h1>
          <Divider />
        </div>
      </Hero>
      {loadingProductDetails ? (
        <Loader />
      ) : (
        <div className='container offset-top'>
          <form className='form' onSubmit={submitHandler}>
            <div className='flex'>
              {uploading ? (
                <Loader />
              ) : (
                <div className='form__group center'>
                  <img
                    src={image}
                    alt={image}
                    className='form__group-image mb-1'
                  />
                  <p>{image}</p>
                  <input
                    type='file'
                    onChange={uploadFileHandler}
                    accept='image/jpg, image/jpeg, image/png'
                  />
                </div>
              )}

              <div>
                <div className='flex'>
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
                <div className='flex'>
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
                </div>
                <div className='form__group'>
                  <input
                    className='form__group-control btn mb-2'
                    type='submit'
                    value='Update'
                  />
                </div>
                <div className='form__group'>
                  <button
                    className='btn btn__outline btn-block'
                    onClick={deleteProductHandler}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}

export default ProductEditPage;
