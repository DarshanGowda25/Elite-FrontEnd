import {LogIn, MapPin, Menu } from 'lucide-react'
import React, {useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

function NavBar() {

     const location = useLocation();
     const navigate = useNavigate();

    


    const [isHamburger,setHamburger] = useState(false);

    const handleProfile = ()=>{
        const token = localStorage.getItem('token');
        if(token){
            navigate('/profile')
        }else{
            navigate('/signIn');
        }
    }

   
    

  
    
    const navLinkClass = 
    `p-7 ${['/', '/signIn', '/signUp', '/fitness', '/fitness/elitePro', '/fitness/elitePlus'].includes(location.pathname) 
    ? "!border-b-0" : "!border-b-2"} 
    border-transparent text-white cursor-pointer hover:text-eliteGold hover:border-eliteGold transition-all duration-300`;
    const activeClass = `!border-eliteGold !text-eliteGold `;

    const navItems = [
        {   
            title : "Home",
            link  :  "/"

        },
        {
            title : "Fitness",
            link  :  "/fitness"
        },
        {
            title : "Consultancy",
            link : "/consultancy"

        },
        {
            title : "Store",
            link : "/store"

        }
    ]
  console.log(location.pathname)
  return (
    <section className={`fixed top-0 left-0 z-50 w-full m-0     
    `}>
    <nav className={`w-full h-[80px] flex justify-center items-center transition-all duration-300 
    ${['/', '/signIn', '/signUp', '/fitness', '/fitness/elitePro', '/fitness/elitePlus'].includes(location.pathname) 
    ? 'bg-transparent backdrop-blur-3xl' : 'bg-eliteBlack'}
    ${location.pathname.startsWith('/store') ? 'sm:hidden' : 'flex'}

    `}>

        <div className='relative h-full w-full'>
            <img src="/Image/logo.png" className="h-[89px] w-[89px] absolute left-5" />
        </div>

   <button className='text-3xl md:hidden focus:outline-none mr-5 text-white'
   onClick={()=>setHamburger(!isHamburger)}
   >
    <Menu/>
   </button>

   
    <ul className={`${isHamburger ? 'flex' : 'hidden'}
    flex flex-col items-center absolute top-20 left-0 w-full text-center z-50 !backdrop-blur-3xl  md:!backdrop-blur-none bg-black/96 md:bg-black/0
    md:w-auto md:flex md:flex-row md:justify-center md:items-center md:gap-[4px] md:text-white md:absolute md:uppercase md:font-bold
    md:top-0 md:space-y-0 md:p-0 md:left-[475px] md:m-0 md:h-[78px]
     ${location.pathname === '/store' || location.pathname === '/fitness' ? "top-30":"top-20"}  
    `} >
        {navItems.map((item,idx)=>(
                <NavLink key={idx} to={item.link} className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : ''} h-[50px] md:h-auto w-[40%] `}
                onClick={()=>setHamburger(!isHamburger)}>
                    {item.title}
                </NavLink>
        ))}
         <li className="md:hidden p-2 rounded-lg  mx-auto text-white mt-3"
         onClick={()=>setHamburger(!isHamburger)}
          ><Link to='/signIn'className='flex gap-2 h-full w-full'> <p>Sign In</p> 
         <LogIn className="w-5 h-5 text-white ml-2 mt-0.5"/></Link></li>
    </ul>
    
    
        
      


    <ul className='hidden lg:flex justify-center items-center gap-8 text-white absolute right-10 uppercase'>
        <li className={`flex text-[0.9rem] p-2 rounded-lg mt-1 gap-2 border-2 border-eliteGold text-eliteGold `}>Banglore 
            <MapPin className={`w-5 h-5 ml-2 mb-0.5  text-eliteGold`} />
        </li>

        <li onClick={handleProfile} className='cursor-pointer'>
        {localStorage.getItem('token') ?
        (<RiAccountCircleFill className='text-4xl text-eliteGold cursor-pointer' />):(<FaRegUser className='text-2xl text-eliteGold cursor-pointer'/>)
        }
       </li>



        <li className={`p-2 rounded-lg hover:bg-eliteGold mt-1
        ${['/', '/signIn', '/signUp', '/fitness', '/fitness/elitePro', '/fitness/elitePlus'].includes(location.pathname) 
        ? "bg-eliteGold" : "bg-transparent "}`} >
            <Link to='/signIn'className='flex gap-2 hover:gap-3 transition-all duration-300 h-full w-full'> <p>Sign In</p> 
            <LogIn className="w-5 h-5 text-white ml-2 mt-0.5"/></Link></li>
    </ul>

    </nav>
    
    </section>

  )
}

export default NavBar