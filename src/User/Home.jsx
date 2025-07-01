import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, Facebook} from 'lucide-react'
import { RiMapPinFill } from "react-icons/ri"
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { LiaCopyrightSolid } from "react-icons/lia";
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import { getErrorMsg, serverUrl, serverUrlAPI } from '../Utils/info';
import toast from 'react-hot-toast';


function Home() {

  const navigate = useNavigate();

  //contact us
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    msg:""

  });

  const handleChange = (e)=>{
    const name = e.target.name;
    let value = e.target.value;
      if (name === 'phone') {
        value = value.replace(/[^0-9]/g, '');
      }
    setFormData({...formData,[name]:value})
  }
  


  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(formData)
    try{
      console.log(formData)
      const response =  await axios.post(`${serverUrl}api/contact/register`,formData);
      console.log(response.data.status)
      toast.success(response.data.status)
      setFormData({
        name:"",
        email:"",
        phone:"",
        msg:""
  
      })
    }
    catch(error){
      console.error('Error sending data:', error);
      toast.error(getErrorMsg(error))
      setFormData({
        name:"",
        email:"",
        phone:"",
        msg:""
  
      })
    }
  }

    //Redirect to fitness
    const handleClick = (page)=>{
      if(page==='Elite'){
        navigate('/fitness');
      }else if(page==='Elite Pro'){
        navigate('/fitness/elitePro')
      }else{
        navigate('/fitness/elitePlus')
      }
    }

    


  const cards = [
    {
      link: '/Image/HomeCard1.png',
      title: 'Train Every Muscle',
      text: "From zero to sculpted, we shape muscles, not excuses. Shape every muscle, sculpt every goal."
    },
    {
      link: '/Image/HomeCard2.png',
      title: 'Cardio Exercise',
      text: "Join us and watch your heart grow as strong as your body. Shape your heart, shape your life. Cardio is the key!"
    },
    {
      link: '/Image/HomeCard3.png',
      title: 'Weight Training',
      text: "Strength isn’t given, it’s earned. Join us and lift your potential. Your strength begins where your comfort ends."
    },
    {
      link: '/Image/HomeCard4.png',
      title: 'Many More',
      text: "Join us and discover the endless health benefits of strength and movement."
    }
  ]

  const review = [
    {
      name:"Gourav.S.S",
      image:"/Image/review1.jpg",
      description:"I've been going to this gym for a few years now and I'm genuinely impressed. The machines are modern and well-maintained, the place is always clean, and the trainers are knowledgeable and supportive."
    },
    {
      name:"Disha",
      image:"/Image/review2.jpg",
      description:"The trainers here are amazing — patient, professional, and truly passionate about fitness. They helped me improve my form and build a consistent routine. I’ve seen real progress since joining."
    },{
      name:"Arohi",
      image:"/Image/review3.jpg",
      description:"Overall a good gym - decent equipment, good crowd, and nice vibe. It can get a bit crowded during peak hours, and I wish they had more squat racks, but still worth it for the value."
    }
  ]

  const count=1;

  const memberships = [
    {
    image : "/Image/logo2.png",
    title : "Elite Plus",
    description : "Unlimited access to gym facilities in any gyms in city. Enjoy unlimited participation in group classes, tailored to all fitness levels."

  },{
    image : "/Image/logo2.png",
    title : "Elite Pro",
    description : "Unlimited access to gym facilities in pro gyms. Enjoy unlimited participation in group classes, tailored to all fitness levels."
  },{
  image : "/Image/logo2.png",
  title : "Elite",
  description : "Unlimited access to gym facilities in particular gym. Enjoy unlimited participation in group classes, tailored to all fitness levels."

  }
  
]


  return (
    <div className='max-w-screen h-screen lg:max-w-[1800px] bg-eliteBlack overflow-x-hidden overflow-auto scrollbar-hidden m-0 scroll-smooth'>


      {/* Hero Section */}
      <section id="Home" className='relative w-full h-full bg-cover bg-center' style={{ backgroundImage: "url('/Image/login.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 z-1"></div>

        <div className='w-full h-full flex flex-col justify-center items-center text-white relative z-2'>
          <h1 className='text-[25px] md:text-[40px] font-black'>Don't wait for motivation.</h1>
          <h1 className='text-[25px] md:text-[40px] font-extrabold'>Show up, lift up, level up.</h1>
          <h1 className='text-[25px] md:text-[40px] font-extrabold'>Join the gym</h1>
          <h1 className='text-[15px] md:text-[25px] text-gray-500'>your future self will thank you.</h1>

          <Link to='/signUp' className='mt-2 bg-eliteGold rounded-sm'>
            <button className='bg-eliteGold h-[50px] w-[150px] rounded-sm text-2xl flex justify-center items-center gap-2 hover:gap-3 transition-all duration-200 cursor-pointer'>
              Join <ChevronRight className="w-7 h-7 mt-1" />
            </button>
          </Link>
        </div>

        <div className='absolute bottom-0 w-full h-[25px] lg:h-[50px] z-[3] bg-gradient-to-b from-[#262626] to-[#141414] border-0'
          style={{
            clipPath: "ellipse(53% 100% at 50% 100%)",
            boxShadow: "inset 0 3px 0 rgba(212, 175, 55, 0.696)"
          }}
        ></div>
      </section>


      {/* About Section & Cards */}
      <div className='h-auto w-full bg-[#141414] pt-10 pb-10'>

        <section id="AboutUs" className='h-auto w-full place-content-center mb-30'>
          <div className='h-auto w-full flex flex-col justify-center items-center md:flex-row md:items-center mt-30 mb-25'>
            <img src="/Image/AboutUs.jpeg" className='h-[450px] w-[300px] md:w-[350px] ml:[300px] md:ml-[200px] rounded-md' />

            <div className='h-[450px] w-[90%] md:w-[35%] lg:ml-30 flex flex-col'>
              <h1 className='p-4 bg-[#e4c14f31] rounded-md text-[#ffca1d] w-[150px] text-center font-semibold text-2xl mt-5'>About Us</h1>
              <h1 className='text-white font-extrabold text-3xl md:text-5xl mt-4'>Welcome To Our <br />Gym</h1>
              <p className='text-white font-bold mt-10'>
                Our environment is built to inspire and empower. From early morning workouts to late-night grind sessions,
                our gym is more than just a place to train — it’s where goals are set, progress is made, and confidence is earned.
                <br />Join us, and let’s lift, sweat, and grow — together.
              </p>
            </div>
          </div>
        </section>


      {/* memberships cards*/}
      <section id="memberships" className='h-auto w-[full] bg-cover bg-center relative pt-24 pb-24' style={{ backgroundImage: "url('/Image/BG.jpg')" }}>
        <div className="absolute inset-0 bg-black/30 z-1"></div>
        <h1 className='absolute w-full top-0 text-3xl text-eliteGold font-extrabold mt-24   text-center'>Memberships</h1>
        <div className='w-[162px] h-[2px] bg-white absolute top-33 left-[670px]'></div>
        <div className='h-full w-[95%] md:w-[93%] mx-auto flex flex-nowrap justify-start items-center gap-3 overflow-x-auto scrollbar-hidden md:overflow-hidden scroll-smooth relative'>
       
        
          {memberships.map((item, idx) => (
          <MembershipCard key={idx} item={item} handleNavigate={handleClick}/>
          ))}
        </div>
      </section>
        

      {/* //Info display card */}
        <section className='h-full w-[90%] mx-auto flex justify-center items-center gap-10 flex-wrap pt-25 pb-25'>
          {cards.map((item, idx) => (
            <Card key={idx} items={item} />
          ))}
        </section>
      </div>
       

      {/* //review cards */}
      <section id="review" className='h-auto w-[full] bg-cover bg-center relative pt-25 pb-25' style={{ backgroundImage: "url('/Image/BG.jpg')" }}>
      
        <div className="absolute inset-0 bg-black/30 z-1"></div>
        <h1 className='absolute top-15 w-full text-center text-3xl text-white font-bold'>Reviews</h1>
        <div className='absolute top-25 left-[720px] w-[100px] h-[2px] bg-eliteGold '></div>
        


          <div className='h-full w-[90%] mx-auto flex justify-center items-center gap-25 fl flex-wrap relative'>

           
            {review.map((item,idx)=>(
                <ReviewCard key={idx} item={item}/>
            ))
            
          }
          </div>
      </section>

        
      {/* //Contact us */}
      <section id="contactUs" className='h-auto w-full bg-[#141414] flex pt-24 pb-24 px-5' >

          <form onSubmit={handleSubmit} className='h-auto md:w-[50%] w-[100%]  flex flex-col gap-10  text-white  pt-10 px-4 md:px-10'>
            <input
            type='text'
            placeholder='Enter Your Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='border-2 border-white w-[90%] p-1 md:p-2'
            />

            <input
            type='email'
            placeholder='Enter Your Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='border-2 border-white w-[90%] p-1 md:p-2'
            />

            <input
            type='text'
            placeholder='Enter Your Phone No'
            name='phone'
            minLength={10}
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
            required
            className='border-2 border-white w-[90%] p-1 md:p-2'
            />

            <textarea
            minLength={15}
            maxLength={250}
            name='msg'
            placeholder=' Enter Message'
            value={formData.msg}
            onChange={handleChange}
            
            required
            className='border-2 border-white  md:h-[115px] w-[90%] p-2'


            />

            <button
            type='submit'
            className='w-[150px] p-2 rounded-md bg-eliteGold border-0 cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-300'
            >
              Send Message <IoMdSend className='text-white  mt-1'/>
            </button>

            
             
          </form>


        {/* Google Map */}
      <div className="hidden  md:block w-[50%] mt-10  mr-10">
        <iframe
          className="w-full bg-amber-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31104.14990400011!2d77.51214282728404!3d12.970652711026233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3dd95efc3ae7%3A0xc90db791aedd9aad!2sVijayanagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1745737442513!5m2!1sen!2sin" 
          width="100%" 
          height="400"
          style={{ border: '0' }}
          
          ></iframe>
      </div>

      </section>

      {/* Footer */}
      <section className='h-[1000px] md:h-[500px] w-full bg-cover bg-center' style={{ backgroundImage: "url('/Image/FooterBG.jpg')" }}>
          <Footer/>
      </section>
    </div>
  )
}

export default Home

function Card({ items }) {
  const { title, link, text } = items
  return (
    <div className='h-[400px] w-[275px]  shadow-[0_0_25px_rgba(212,175,55,0.5)] md:shadow-none rounded-lg lg:hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] flex flex-col items-center px-6 mt-20'>
      <img src={link} className='h-[200px] w-[200px] mt-6' />
      <h1 className='text-center text-[#ffd859] text-2xl font-bold mb-4'>{title}</h1>
      <h1 className='text-center text-[#fde28a]'>{text}</h1>
    </div>
  )
}




function ReviewCard({item}){

  const {name,image,description} = item;
  return(

    <div className='h-[450px] w-[320px] bg-white border-2 border-white flex flex-col  rounded-xl overflow-hidden mt-10 z-2'>
      <div className='h-[200px] w-full overflow-hidden'>
        <img src={image} className='h-full w-full hover:scale-105 transition-all duration-500 cursor-pointer'></img>
      </div>
      <h1 className='text-3xl text-eliteGold font-bold mt-5 ml-4'>{name}</h1>
      <h1 className='text-gray-500 mx-5 mt-3'>{description}</h1>
    </div>
    
  )
}


function MembershipCard({item,handleNavigate}) {
  const { image, title, description } = item;
  return (
    <div className="h-auto md:h-[280px] min-w-[310px] md:min-w-[415px] bg-eliteBlack flex flex-col rounded-xl overflow-hidden mt-20 px-10 pb-10 md:pb-0 z-2 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] m-5 cursor-pointer"
    onClick={()=>handleNavigate(title)}>

      <img src={image} alt={title} className="h-[120px] w-[120px] mx-auto mt-[10px]" />
      <h1 className="mx-auto text-3xl text-eliteGold font-bold">{title}</h1>
      <p className="mt-2 text-center text-white">{description}</p>
    </div>
  );
}






export function Footer(){
  const location = useLocation();
  return(
    <>
    <div className='h-[95%] md:h-[90%] w-[95%] mx-auto pt-10 pb-5 flex flex-col items-center md:flex-row md:justify-center'>

    {/* Footer Left */}
    <div className='h-[85%] w-[95%] md:w-[45%] flex'>
      <div className='h-full w-[60%] px-2 md:px-4 overflow-hidden'>
        <article className='flex items-center mt-6'>
          <img src='/Image/logo.png' className='h-[75px] w-[75px]' />
          <h1 className='text-white text-4xl font-bold'> Elite</h1>
        </article>

        <h1 className='ml-5 text-gray-400'>Results speak louder than words – train where champions are made.</h1>
        <img src='/Image/FooterClock.png' className='h-[75px] w-[75px] mt-4' />
        <div className='relative bottom-[55px] left-[75px] md:left-[100px] text-sm'>
          <h1 className='text-white font-semibold'>Monday-Friday</h1>
          <h1 className='text-gray-400'>5:00AM-10:00PM</h1>
          <h1 className='text-white font-semibold mt-4'>Saturday-Sunday</h1>
          <h1 className='text-gray-400'>7:00AM-10:30AM</h1>
        </div>
      </div>

      {/* //section links */}
      <div className={`h-full w-[40%] flex flex-col items-center ml-5 md:ml-0
      ${location.pathname !== '/'?'hidden':'flex'}`}>
        <h1 className='mt-10 text-xl font-bold text-white'>Our Links</h1>
        <div className='h-[2px] w-[60px] bg-eliteGold'></div>
        <ul className='flex flex-col mt-6 text-gray-400 gap-2'>
          <li><a href='#Home' className='hover:text-eliteGold'>Home</a></li>
          <li><a href='#memberships' className='hover:text-eliteGold'>Memberships</a></li>
          <li><a href='#AboutUs' className='hover:text-eliteGold'>About Us</a></li>
          <li><a href='#contactUs' className='hover:text-eliteGold'>Contact Us</a></li>
          <li><a href='#review' className='hover:text-eliteGold'>Reviews</a></li>
        </ul>
      </div>
    </div>

    {/* Footer Right */}
    <div className='h-[85%] w-[95%] md:w-[45%] flex flex-col md:flex-row'>
      <div className='h-full w-[90%] md:w-[60%] pl-4 flex flex-col'>
        <h1 className='mt-10 text-xl font-bold text-white'>Contact Us</h1>
        <div className='h-[2px] w-[60px] bg-eliteGold'></div>

        {/* //Address */}
        <div className='flex mt-5 items-center text-gray-400'>
          <div className='bg-eliteGold p-2 rounded-full'>
            <RiMapPinFill className='text-white text-2xl' />
          </div>
          <h1 className='ml-10'>
            Vijayanagara near post office,<br />
            Mysore Road, Bengaluru.<br />
            PinCode-570002
          </h1>
        </div>

        {/* phone Contact */}
        <div className='flex mt-5 items-center text-gray-400'>
          <div className='bg-eliteGold p-2 rounded-full'>
              <FaPhoneAlt className='text-white text-2xl'  />
          </div>
     
          <div className='flex flex-col cursor-pointer'>
            <h1 className='ml-10 hover:text-eliteGold'>1800-121-3637</h1>
            <h1 className='ml-10  hover:text-eliteGold'>+91831059-2220</h1>
          </div>
         
        </div>

        {/* mail Contact */}
        <div className='flex mt-5 items-center text-gray-400'>
          <div className='bg-eliteGold p-2 rounded-full'>
          <IoMdMail className='text-white text-2xl'  />
          </div>

          <div className='flex flex-col cursor-pointer'>
            <h1 className='ml-10 hover:text-eliteGold'>info@EliteFitness.com</h1>
            <h1 className='ml-10 hover:text-eliteGold'>service@EliteFitness.com</h1>
            <h1 className='ml-10 hover:text-eliteGold'>elite@gmail.com</h1>
            </div>
        </div>

      </div>

      {/* social media account */}
      <div className='h-full w-[40%] px-4'>
        <h1 className='mt-10 text-xl font-bold text-white'>Our Social Media</h1>
        <div className='h-[2px] w-[130px] bg-eliteGold'></div>

        <div className='flex mt-6 gap-6 cursor-pointer'>
          <div className='bg-gray-500 hover:bg-eliteGold p-3 rounded-full place-content-center'>
              <MdFacebook className='text-white text-xl'/>
          </div>
          <div className='bg-gray-500 hover:bg-eliteGold p-3 rounded-full place-content-center'>
              <FaInstagram className='text-white text-xl'  />
          </div>
          <div className='bg-gray-500 hover:bg-eliteGold p-3 rounded-full place-content-center'>
              <FaTwitter className='text-white text-xl'  />
          </div>
        </div>
      </div>
    </div>

  </div>
        
  {/* copy Rights */}
  <div className='bg-[#141414] w-full h-[50px] flex justify-center items-center text-white'>
    <LiaCopyrightSolid className=' mr-2'/>  2023. All Rights Reserved By <p className='ml-2 text-eliteGold'>EliteFitness</p>

  </div>
  </>

  )
}
