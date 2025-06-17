import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { calculateDiscount } from './Category';
import { IoStar } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../Utils/axioInstance';
import { getErrorMsg, serverUrlAPI } from '../Utils/info';
import ReactStars from 'react-stars';
import toast from 'react-hot-toast';



function Product() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token')
    const productSectionRef = useRef(null);

      const [orderSummary,setOrderSummary] = useState({
          price:0,
          discountAmount:0,
          convenienceFee:29,
          totalAmount:0,
          totalItems:0
      })
      const [ProductsDetails, setCartProductDetails] = useState([]);
    
    
    
    const location = useLocation();
    const [productData, setProductData] = useState(location.state || null );
    const {name,category,price,discount,description,image,rating,productId,available} = productData
    console.log(available)
    

    //order summary
  useEffect(() => {
    if (location.state !== null) {

    setProductData(location.state); 
    const { price, discount } = location.state;
    const discountAmount = price * (discount / 100);
    const totalAmount = price - discountAmount + orderSummary.convenienceFee;

    setOrderSummary((prev) => ({
      ...prev,
      price,
      discountAmount,
      totalAmount,
      totalItems: 1,
    }));
  }
  }, [location.state]);

  //filter product details to proceed to addAddress on buy click
  useEffect(() => {
  if (!productData) return;

  const {name,price,discount,image,productId} = productData
  const productDetails = {
    cartId: null,
    productId,
    name,
    quantity: 1,
    price,
    discount,
    image,
  };

  setCartProductDetails([productDetails]);
}, [productData]);


    if (!productData) {
      return <div className="text-center mt-20">Product not found or invalid data.</div>;
    }

    

    const fetchSimilarProduct = async () => {
        const response =  await axiosInstance.get(`${serverUrlAPI}product/similar?category=${category}`);
        console.log(response.data);
        return response.data;
    }

    const {data} = useQuery({
        queryKey:['similarproduct',category],
        queryFn:fetchSimilarProduct,
        staleTime:Infinity,
        refetchOnWindowFocus:false,
        enabled:!!category
    })

    const similarProduct = data?.filter((data) => data.productId !== productId) || [];

    const handleSimilarClick = (val) => {
        setProductData(val); // update product
        setTimeout(() => {
            productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, ); // wait for UI to update before scroll
        }

     
      const user = queryClient.getQueryData('userProfile');
      const {user_id} = user ?? {};
      console.log(user_id)


    const cartFunction = async () =>{

      const response = await axiosInstance.post(`${serverUrlAPI}cart/add`,{productId,userId:user_id})
      return response.data;
    }

    const cartMutation = useMutation({
      mutationKey: ['addToCart'],
      mutationFn: cartFunction,
      onSuccess: (val) => { 
        toast.success(val.status);
        queryClient.invalidateQueries(['cart']);
      },
      onError: (error) => {
        toast.error(getErrorMsg(error));
      }
    });

   
    

    

  return (
    <div  className='max-w-screen h-screen  lg:max-w-[1800px] overflow-x-hidden overflow-y-auto scrollbar-hidden  scroll-smooth flex flex-col '>


     

        {/* //product section */}
        <section ref={productSectionRef} className='h-auto w-full flex flex-col items-center md:flex-row pt-30 relative mt-10'>

       
        <div className="p-4 mt-10 absolute top-12 md:top-0 left-[5px] md:left-[145px]">
            <Breadcrumbs />
        </div>

            <div className=' h-[200px] md:h-[370px] w-[200px] md:w-[450px] md:ml-40  place-content-center border-1 border-gray-300 mt-8'>
                <img src={image} className='h-[180px] md:h-[325px] w-[180px] md:w-[325px] mx-auto '></img>
            </div>

            <div className='h-[400px] md:h-[400px] w-[350px] md:w-[700px] ml-10 md:ml-20'>
                <h1 className='md:text-3xl'>{name}</h1>
                <p className='text-md flex'>{rating} <IoStar className='mt-[3px] ml-1 text-lg text-eliteGold' /></p>
               
                <p className='mt-5 text-xs font-bold text-gray-500'><strike>MRP:₹ {price}</strike></p>
                <p className='font-semibold md:text-lg'>PRICE:₹ {calculateDiscount(price,discount)} <i className='text-eliteGold text-sm'>({discount}%)</i></p>
                <p className='text-xs text-gray-500'>(inclusive all taxes)</p>

               <h1 className='font-semibold mt-8 text-lg mb-2'>About Product</h1>
               <p className='text-gray-500 flex text-sm'><TbPointFilled className='mt-[5px] text-md'/>{description}</p>
                <p className='text-gray-500 flex text-sm'><TbPointFilled className='mt-[5px] text-md'/>Made from premium whey sourced from USA and Europe</p>
                
                <div className='w-[70%] h-[80px]  items-center flex  gap-5 mt-5'>
                    <button className='bg-gray-300 p-2 w-[150px] md:w-[250px] text-center cursor-pointer'
                    onClick={()=>{
                      if(!token){
                        toast.error("Please Login To Buy")
                        setTimeout(() => {
                          navigate("/signIn")
                        }, 600);
                      }else{
                        if(available === 0){
                          toast.error("Product Out-Off Stock")
                        }else{
                          navigate("/store/addAddress", {
                          state: {
                          source:"",
                          orderSummary: orderSummary,
                          ProductsDetails: ProductsDetails,
                          },
                        });
                      }
                      } 
                    }}
                    >Buy </button>
                    <Link ><button className='bg-eliteGray p-2 w-[150px] md:w-[250px] text-center text-white cursor-pointer'
                    onClick={()=>{
                      if(!token){ 
                        toast.error("Please Login!")
                        setTimeout(() => {
                          navigate("/signIn")
                        }, 600);
                      }else{
                        if(available === 0){
                            toast.error("Product Out-Off Stock")
                        }else{
                            cartMutation.mutate();
                        }
                          
                      }
                    }}
                    >Add to cart</button></Link>
                </div>
                
                

            </div>

        </section>

        {/* //similar product */}
        <section className='h-auto w-full flex flex-col mt-10'>
            <h1 className='mx-auto text-2xl'>Similar Products</h1>
            <div className='w-[120px] mx-auto bg-eliteGold h-1'></div>

            <div className='  py-10 px-16 md:px-25 flex gap-15 overflow-x-scroll scrollbar-hidden'>
                    {similarProduct.length > 0 ? (
                        similarProduct.map((item, idx) => (
                            <SimilarProduct key={item.productId} product={item} clickFn={handleSimilarClick} />
                            
                                
                        ))
                    ) : (
                        <p>No similar products found.</p>
                    )}
                

            </div>


        </section>
        
    </div>
  )
}

export default Product


function SimilarProduct({product,clickFn}){
    const { name, price, discount, image, rating } = product;
 

    return(
        <div className='h-[300px] min-w-[250px]  shadow-2xl flex flex-col px-6 cursor-pointer'
        onClick={() => clickFn(product)}>
            <img src={image} className='h-[160px] w-[160px] mx-auto mt-3'></img>
            <h1 className=' mt-5 truncate'>{name}</h1>
            <div>
            <ReactStars
                count={5}
                value={rating}
                size={18}
                color2={'#D4AF37B1'}
                edit={false}
                                
            /></div>
            <p><strike className="text-xs text-gray-500">₹ {price}</strike></p>
            <p>₹ {calculateDiscount(price,discount)}<b className='text-xs text-eliteGold mb-5'> {discount}%</b></p>
                            
        </div>
    )
}



export   const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
    console.log(pathnames)
  return (
    <nav className="text-sm breadcrumbs my-4 text-gray-500 font-bold">
      <ul className="flex space-x-2">
        <li>
          <Link to="/" className=" hover:underline">
            Home
          </Link>
          <span> /</span>
        </li>
        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          console.log(value)
          return (
            <li key={to}>
              {isLast ? (
                <span className="text-eliteGold">{value}</span>
              ) : (
                <>
                  <Link to={to} className="text-gray-500 hover:underline">
                    {value}
                  </Link>
                  <span> /</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

