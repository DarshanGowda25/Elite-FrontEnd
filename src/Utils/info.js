import ElitePlus from "../User/ElitePlus";
import ElitePro from "../User/ElitePro";

export const serverUrl = import.meta.env.VITE_SERVER_URL;
export const serverUrlAPI = `${import.meta.env.VITE_SERVER_URL}api/`;



export const getErrorMsg = (error) => {
  const status = error?.response?.status;
  const message = error?.message;

  if (status === 401) {
    return "Unauthorized";
  }

  if (message === 'Network Error') {
    return "Network Error. Please check your internet connection or server.";
  }

  // Read backend's custom message
  const serverMessage = error?.response?.data?.message;

  if (serverMessage) {
    return serverMessage;
  }

  return "Something went wrong!";
};




export const eliteDetails = [
    {

    Image:"/Image/ElitePro.jpg",
    type:"",
    price:"535",
    p1:"Unlimited access to any center and group class",
    p2:"Free 399 amazon voucher",
    p3:"Access to particular center",
    p4:"100+ recorded videos",
    feature0:"",
    feature1:"all classes in gym",
    feature2:"100+ recorded videos",
    feature3:"online Group",
    feature4:"Classes all day"
    },{
        purchaseDetails : [
            {
               months : "12",
               price:"14999",
               discountPrice:"11999",
               monthlyCost : "(999/mo*)",
               p1:" Free 1month days Extension ",
               p2:" Extra ₹ 1500 off applied",
               p3:" 10 days membership pause",
               p4:" Access live home workouts",
               p5:" Free Membership transfer upto 15 days",
               p6:" Access to group any day"
             },
               {
               months : "6",
               price:"10999",
               discountPrice:"8999",
               monthlyCost : "(1499/mo*)",
               p1:" Free 15 days Extension ",
               p2:" Extra ₹ 350 off applied",
               p3:" 5 days membership pause",
               p4:" Access 100+ workout videos",
               p5:" Free Membership transfer upto 1 week",
               p6:" Access to group classes alternate days"
         
             },
             {
               months : "3",
               price:"7999",
               discountPrice:"4999",
               monthlyCost : "(1666/mo*)",
               p1:" Free 10 days Extension ",
               p2:" Extra ₹ 150 off applied",
               p3:" 5 days membership pause",
               p4:" Access 100+ workout videos",
               p5:" Free Membership transfer upto 15 days",
               p6:" Access to group classes alternate days"      
             }
           ]
    }
]


export const elitePlusDetails = [
     {
        Image:"/Image/ElitePlus.png",
        type:"Plus",
        price:"1367",
        p1:"Unlimited access to any center and group class",
        p2:"Free 1500 amazon voucher",
        p3:"Access to all elite plus and pro gyms",
        p4:"At home live workout",
        feature0:"300",
        feature1:"Elite & pro gyms",
        feature2:"Live Workout",
        feature3:"At Center Group",
        feature4:"Classes all day"
      },
      {
        purchaseDetails : [
            {
               months : "12",
               price:"19999",
               discountPrice:"15999",
               monthlyCost : "(1333/mo*)",
               p1:" Free 45 days Extension ",
               p2:" Extra ₹ 2500 off applied",
               p3:" 60 days membership pause",
               p4:" Unlimited Access to other centers",
               p5:" Free Membership transfer upto 90 days",
               p6:" 5 swimming sessions"
             },
               {
               months : "6",
               price:"14999",
               discountPrice:"11999",
               monthlyCost : "(1999/mo*)",
               p1:" Free 1.5 months Extension ",
               p2:" Extra ₹ 1350 off applied",
               p3:" 30 days membership pause",
               p4:" Access 120 sessions in other centers",
               p5:" Free Membership transfer upto 45 days",
               p6:" 2 swimming sessions"
         
             },
             {
               months : "3",
               price:"11999",
               discountPrice:"7999",
               monthlyCost : "(2666/mo*)",
               p1:" Free 1 month Extension ",
               p2:" Extra ₹ 900 off applied",
               p3:" 10 days membership pause",
               p4:" Access 90 sessions in other centers",
               p5:" Free Membership transfer upto 15 days",
               p6:" 100+ workout videos"      
             }
           ]
         
      }
]


export const eliteProDetails = [
    {
        Image:"/Image/Elite.jpeg",
        type:"Pro",
        price:"987",
        p1:"Unlimited Access to all pro gyms",
        p2:"At-home live workouts",
        p3:"Free 1500 amazon voucher",
        p4:"At home live workout",
        feature0:"110",
        feature1:"pro gyms",
        feature2:"Live Workout",
        feature3:"At Center Group",
        feature4:"Classes alternate days"
    
      },
      {
        purchaseDetails : [
            {
               months : "12",
               price:"17999",
               discountPrice:"12999",
               monthlyCost : "(1111/mo*)",
               p1:"Free 30 days Extension ",
               p2:" Extra ₹ 1500 off applied",
               p3:" 30 days membership pause",
               p4:" Access 90 sessions in other centers",
               p5:" Free Membership transfer upto 50 days",
               p6:" 3 swimming sessions"
             },
               {
               months : "6",
               price:"12999",
               discountPrice:"9999",
               monthlyCost : "(1555/mo*)",
               p1:" Free 15 days Extension ",
               p2:" Extra ₹ 1000 off applied",
               p3:" 15 days membership pause",
               p4:" Access 60 sessions in other centers",
               p5:" Free Membership transfer upto 30 days",
               p6:" 2 swimming sessions"
         
             },
             {
               months : "3",
               price:"8999",
               discountPrice:"6999",
               monthlyCost : "(2333/mo*)",
               p1:" Free 10 days Extension ",
               p2:" Extra ₹ 500 off applied",
               p3:" 10 days membership pause",
               p4:" Access 30 sessions in other centers",
               p5:" Free Membership transfer upto 15 days",
               p6:" 100+ workout videos"      
             }
           ]
         
      }

]