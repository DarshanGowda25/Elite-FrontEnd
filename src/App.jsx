import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import UserLogin from './User/UserLogin';
import UserSignUp from './User/UserSignUp';
import UserWrapper from './User/UserWrapper';
import Home from './User/Home';
import Fitness from './User/Fitness';
import Store from './User/Store';
import Consultancy from './User/Consultancy';
import ElitePlus from './User/ElitePlus';
import ElitePro from './User/ElitePro';
import Elite from './User/Elite';
import Buy from './User/Buy';
import UserProfile from './User/UserProfile';
import ProfileOrders from './User/ProfileOrders';
import ProfileConsultancy from './User/ProfileConsultancy';
import ProfileMemberships from './User/ProfileMemberships';
import ProfileItems from './User/ProfileItems';
import PasswordRest from './User/PasswordRest';
import BookAppointment from './User/BookAppointment';
import StoreHome from './Store/StoreHome';
import Category from './Store/Category';
import WishList from './Store/WishList';
import Product from './Store/Product';
import Cart, { Order } from './Store/Cart';
import AddAddress from './Store/AddAddress';
import PaymentPage from './Store/PaymentPage';
import Orders from './Store/Orders';
import AdminLogin from './Admin/AdminLogin';
import AdminDashBoard from './Admin/AdminDashBoard';
import AdminNav from './Admin/AdminNav';
import AdminWrapper from './Admin/AdminWrapper';
import Products from './Admin/Products';
import Memberships from './Admin/Memberships';
import Queries from './Admin/Queries';
import AllOrders from './Admin/AllOrders';



const queryClient = new QueryClient();

function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/adminLogin' element={<AdminLogin/>}/>
          <Route path='/admin' element={<AdminWrapper/>}>
            <Route index element={<AdminDashBoard/>}/>
            <Route path='products' element={<Products/>}/>
            <Route  path='memberships' element={<Memberships/>}/>
            <Route path='queries' element={<Queries/>}/>
            <Route path='orders' element={<AllOrders/>}/>

          </Route>



          <Route path="/" element={<UserWrapper />}>
          <Route index element={<Home/>} />
          <Route path="/signUp" element={<UserSignUp />} />
          <Route path="/signIn" element={<UserLogin />} />
        
          <Route path='/fitness' element={<Fitness/>}>
              <Route index element={<Elite/>}/>
              <Route path='elitePro' element={<ElitePro/>}/>
              <Route path='elitePlus' element={<ElitePlus/>}/>
              <Route path='buy' element={<Buy/>}/>   
          </Route>

          <Route path='/consultancy' element={<Consultancy/>} />
            <Route path='/appointment' element={<BookAppointment/>}/>
            
          <Route path='/store' element={<Store/>}>
            <Route index element={<StoreHome/>} />
            <Route path='category' element={<Category/>} />
            <Route path='wishlist' element={<WishList/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='addAddress' element={<AddAddress/>}/>
            <Route path='payment' element={<PaymentPage/>}/>
            <Route path='orders' element={<Orders/>}/>
          </Route>

          <Route path='/profile' element={<ProfileItems/>}>
              <Route index element={<UserProfile/>}/>
              <Route path='profileOrders' element={<ProfileOrders/>}/>
              <Route path='profileConsultancy' element={<ProfileConsultancy/>} />
              <Route path='profileMembership' element={<ProfileMemberships/>} />
              <Route path='passwordRest' element={<PasswordRest/>} />
          </Route>
          

          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
   

   
  );
}

export default App;
