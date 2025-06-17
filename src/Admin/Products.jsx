import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { axiosInstance } from '../Utils/axioInstance';
import { getErrorMsg, serverUrl, serverUrlAPI } from '../Utils/info';
import Category, { ProductCards } from '../Store/Category';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentLoader from '../UI_Components/ContentLoader';
import { ClipLoader } from 'react-spinners';
import { ErrorMessage, Form, Formik } from 'formik';
import { TiDelete } from "react-icons/ti";
import { LuAsterisk } from 'react-icons/lu';
import { productValidation, updateProductValidation } from '../Form/FormValidation';
import toast from 'react-hot-toast';
import Error from '../UI_Components/Error';



function Products() {
  const QueryClient = useQueryClient();
const [addProduct,setAddProduct] = useState(false);
const [updateProduct,setUpdateProduct] = useState(false);
const [updateProductData , setUpdateProductData] = useState({});
const PAGE_LIMIT = 10;

  const fetchProducts =async ({pageParam=1}) =>{
    const response = await axiosInstance.get(serverUrl+'api/product/getAll',{
        params:{
          page: pageParam,
          limit:PAGE_LIMIT
        },
      });
      const data = {...response.data,prevParam:pageParam};
      return data;
  
    }

    const{
    data : productData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading : productDataLoading,
  
   } = useInfiniteQuery({
    queryKey:["Allproducts"],
    queryFn:fetchProducts,
    staleTime:Infinity,
    getNextPageParam: (lastPage) => {
      const prevPage = lastPage.prevParam;
      if (prevPage === lastPage.totalPages) {
        return undefined;
      }
      return prevPage + 1;
    },
    refetchOnWindowFocus: false,
   });

  const productContent = productData?.pages?.reduce((result, page) => {
    return [...result, ...page?.content];
  }, []);


  //Add product

  const addProductFunction = async(val)=>{
    const response = await axiosInstance.post(`${serverUrlAPI}product/add`,val)
    console.log(response.data)
    return response.data;
  }

  const AddProductMutaion = useMutation({
    mutationKey:['addProduct'],
    mutationFn:addProductFunction,
    onSuccess:(data)=>{
      toast.success(data.status)
      QueryClient.invalidateQueries(["Allproducts"])
    },
    onError:(error)=>{
      toast.error(getErrorMsg(error))
    }
  })

  //upadte product

  const updateProductFunction = async(val)=>{
    console.log(val)
    const response = await axiosInstance.patch(`${serverUrlAPI}product/update`,val)
    console.log(response.data)
    return response.data;
  }


  const updateProductMutaion = useMutation({
    mutationKey:['updateProduct'],
    mutationFn:updateProductFunction,
    onSuccess:(data)=>{
      toast.success(data.status)
      QueryClient.invalidateQueries(["Allproducts"])
    },
    onError:(error)=>{
      toast.error(getErrorMsg(error))
    }
  })


  //delete product

    const deleteProductFunction = async(val)=>{
    const response = await axiosInstance.delete(`${serverUrlAPI}product/delete?id=${val}`);
    console.log(response.data)
    return response.data;
  }

  const deleteProductMutaion = useMutation({
    mutationKey:['deleteProduct'],
    mutationFn:deleteProductFunction,
    onSuccess:(data)=>{
      toast.success(data)
      QueryClient.invalidateQueries(["Allproducts"])
      setTimeout(() => {
              setUpdateProduct(false)
            }, 700); 
    },
    onError:(error)=>{
      toast.error(getErrorMsg(error))
    }
  })





  return (
    <div className='h-screen w-full flex flex-col items-center py-8'>
      {/* //add product */}
      <button className='min-h-[40px] w-[150px] bg-eliteGray rounded-lg m-5 font-bold text-white cursor-pointer'
      onClick={()=>{
        setAddProduct(true)
      }}>Add product</button>
      {
      addProduct && (
      <section className='fixed top-0 left-0 h-screen w-screen z-10 bg-black/75 place-content-center'
      onClick={()=>{
        setAddProduct(false)
      }}
      >
        <div className='h-[80%] w-[30%] rounded-lg bg-white mx-auto relative py-8'
        onClick={(e)=>{
            e.stopPropagation()
        }}>
          <span className='absolute right-2 top-2'
          onClick={()=>{
            setAddProduct(false)
          }}><TiDelete className='text-2xl cursor-pointer'/></span>

          <Formik
          initialValues={{name:"",category:"",description:"",price:0,discount:0,image:""}}
          validationSchema={productValidation}
          onSubmit={(val)=>{
            AddProductMutaion.mutate(val);

            setTimeout(() => {
              setAddProduct(false)
            }, 500);
            
            
          }}
          >
            {
              (({
                handleChange,
                values,
                dirty
              })=>(
                <Form className='h-full w-full flex flex-col gap-3 px-4 mt-2 '>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <ErrorMessage
                              name='name'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='text'
                      name='name'
                      value={values.name}
                      placeholder='Enter Product Name'
                      onChange={handleChange}
                      />
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <ErrorMessage
                              name='category'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='text'
                      name='category'
                      value={values.category}
                      placeholder='Enter category'
                      onChange={handleChange}
                      />
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <ErrorMessage
                              name='description'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='text'
                      name='description'
                      value={values.description}
                      placeholder='Enter description'
                      onChange={handleChange}
                      />
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <p className='text-[10px]'>price</p>
                          <ErrorMessage
                              name='price'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='number'
                      name='price'
                      value={values.price}
                      placeholder='Enter price'
                      onChange={handleChange}
                      />
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <p className='text-[10px]'>discount in percentage</p>
                          <ErrorMessage
                              name='discount'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='number'
                      name='discount'
                      value={values.discount}
                      placeholder='Enter discount'
                      onChange={handleChange}
                      />
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <ErrorMessage
                              name='image'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='text'
                      name='image'
                      value={values.image}
                      placeholder='Enter image link'
                      onChange={handleChange}
                      />
                  </div>

                  <button type='submit'
                    className={`w-[70%] p-2 bg-eliteGray text-white absolute bottom-4 left-15 hover:bg-gray-700  
                      ${dirty ? "cursor-pointer":"bg-gray-700 cursor-not-allowed"}`}>
                      Add Product
                  </button>
                </Form>
              ))
            }

          </Formik>
          

        </div>

      </section>
      )}


      {/* //upadtePRoduct */}
      {updateProduct && (
      <section className='fixed top-0 left-0 h-screen w-screen z-10 bg-black/75 place-content-center'
      onClick={()=>{
        setUpdateProduct(false)
      }}
      >
        <div className='h-[70%] w-[30%] rounded-lg bg-white mx-auto relative py-8'
        onClick={(e)=>{
            e.stopPropagation()
        }}>
          <span className='absolute right-2 top-2'
          onClick={()=>{
            setUpdateProduct(false)
          }}><TiDelete className='text-2xl cursor-pointer'/></span>

          <Formik
          
          initialValues={{productId: updateProductData.productId,
            name:updateProductData.name,
            available:updateProductData.available,description:updateProductData.description,
            price:updateProductData.price,discount:updateProductData.discount}}

             validationSchema={updateProductValidation}
             onSubmit={(val)=>{
            console.log('Submitting update with values:');
            updateProductMutaion.mutate(val);
            setTimeout(() => {
              setUpdateProduct(false)
            }, 700);
             }}

          >
            
           {
              (({
                handleChange,
                values
              })=>(
                <Form className='h-full w-full flex flex-col gap-3 px-4 mt-2 '>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <ErrorMessage
                              name='name'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='text'
                      name='name'
                      value={values.name}
                      placeholder='Enter Product Name'
                      onChange={handleChange}
                      />
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <ErrorMessage
                              name="available"
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                        <select
                          name="available"
                          value={values.available}
                          onChange={handleChange}
                          className="p-3 w-full bg-gray-100 rounded-md !text-black">
                          <option value="">Select availability</option>
                          <option value={1}>Available</option>
                          <option value={0}>Not Available</option>
                        </select>
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <ErrorMessage
                              name='description'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='text'
                      name='description'
                      value={values.description}
                      placeholder='Enter description'
                      onChange={handleChange}
                      readOnly
                      />
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <p className='text-[10px]'>price</p>
                          <ErrorMessage
                              name='price'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='number'
                      name='price'
                      value={values.price}
                      placeholder='Enter price'
                      onChange={handleChange}
                      />
                  </div>

                  <div>
                      <span className='flex flex-row items-center'>
                          <LuAsterisk className='text-red-700 text-xs'/>
                          <p className='text-[10px]'>discount in percentage</p>
                          <ErrorMessage
                              name='discount'
                              component={'p'}
                              className='text-[0.7rem] text-red-500 '
                          />
                      </span>
                      <input
                      className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                      type='number'
                      name='discount'
                      value={values.discount}
                      placeholder='Enter discount'
                      onChange={handleChange}
                      />
                  </div>

                  
                  <div className=' w-full flex flex-row items-center justify-around'>
                    
                  <button type='submit'
                    className={`w-[35%] p-2 border-2 bg-eliteGray text-white  hover:bg-gray-700 cursor-pointer`}
                    >
                      Update Product
                  </button>

                  <button type='button'
                    className={`w-[35%] p-2 bg-red-800 text-white  hover:bg-white hover:border-2 hover:border-red-800 hover:text-red-800 cursor-pointer box-border`}
                    onClick={() => {
                      deleteProductMutaion.mutate( updateProductData.productId );
                      
                      setUpdateProduct(false);
                    }}>
                      Delete Product
                  </button>

                  </div>
                </Form>
              ))
            }





          </Formik>



        </div>

      </section>
      )}
      
      {/* //display products */}
      <section id="scrollableDiv" className='relative  w-full h-full  overflow-y-scroll scrollbar-hidden'>
        {productDataLoading && <ContentLoader/>}
        {productContent?.length === 0 ? (<Error/>) 
        : (
          <InfiniteScroll
          dataLength = {
            productContent?.length ? productContent?.length : 0
          }
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollableTarget="scrollableDiv"
          >
             <div  className=' relative h-auto w-full  flex flex-wrap gap-[24px] md:px-[18px] md:my-5 '>
            {
              productContent?.map((product,idx)=>(
                <div key={idx}
                onClick={()=>{
                  setUpdateProduct(true);
                  setUpdateProductData(product)
                }}>
                <ProductCards  product={product} />
                </div>
              ))
            }
            </div>
            {isFetchingNextPage && (
              <article className="w-full flex justify-center items-center py-6 flex-col">
                <ClipLoader size={50}  />
                <p className="text-[0.8rem] text-gray-500 mt-2">Loading</p>
              </article>
              )}
              {!hasNextPage && productContent?.length > 0 && (
                <article className="w-full flex  justify-center items-center p-5 text-[0.8rem] text-gray-500">
                  No more Data
                </article>
              )}

          </InfiniteScroll>
          )}
      </section>
    </div>
  )
}

export default Products
