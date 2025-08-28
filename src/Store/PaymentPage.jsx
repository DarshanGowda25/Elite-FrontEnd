import React, { useState } from "react";
import { Order } from "./Cart";
import Stepper from "./Stepper";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getErrorMsg, serverUrlAPI } from "../Utils/info";
import { axiosInstance } from "../Utils/axioInstance";
import SuccessLoader from "../UI_Components/SuccessLoader";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [paymentMode, setPaymentMode] = useState("");
  const [showSuccessLoader, setShowSuccessLoader] = useState(false);

  const { orderSummary, ProductsDetails, addressDetails, source } =
    location.state || {};
  const {
    addressType,
    name,
    phone,
    address,
    town,
    pincode,
    district,
    state,
    addressId,
  } = addressDetails || {};

  const currentPage = "Payment";

  /** ---------------- COD ORDER PLACEMENT ---------------- */
  const OrderProduct = async () => {
    const response = await axiosInstance.post(`${serverUrlAPI}orders/order`, {
      paymentMode,
      source,
      addressId,
      cartProductDetails: ProductsDetails.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
    });
    return response.data;
  };

  const orderProductMutation = useMutation({
    mutationKey: ["orderProduct"],
    mutationFn: OrderProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      setShowSuccessLoader(true);
      toast.success(data.status || "Order Placed!");
    },
    onError: (error) => {
      toast.error(getErrorMsg(error));
    },
  });

  /** ---------------- RAZORPAY ---------------- */
  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async () => {
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Failed to load Razorpay SDK");
      return;
    }

    try {
      // Step 1: Create Razorpay order from backend
      const createOrderResp = await axiosInstance.post(
        `${serverUrlAPI}orders/RazorPay`,
        {
          amount: orderSummary.totalAmount * 100, // in paise
          currency: "INR",
        }
      );

      const { orderId, amount, currency, key } = createOrderResp.data;

      // Step 2: open Razorpay checkout
      const options = {
        key,
        amount,
        currency,
        name: "Elite",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await axiosInstance.post(
              `${serverUrlAPI}orders/verifyRazorPay`,
              response
            );

            if (verifyRes.data.success) {
              toast.success("Payment Verified & Successful!");
              setShowSuccessLoader(true);
              orderProductMutation.mutate();
              
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (error) {
            toast.error(getErrorMsg(error));
          }
        }
        ,
        prefill: {
          name,
          email: "test@example.com",
          contact: phone,
        },
        theme: { color: "#3399cc" },
        
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(getErrorMsg(error));
    }
  };

  return (
    <div
      className={`max-w-screen h-screen lg:max-w-[1800px] overflow-x-hidden overflow-y-auto scrollbar-hidden  
        flex flex-col items-center md:flex-row md:items-center relative`}
    >
      {/* Success Loader */}
      {showSuccessLoader && (
        <div className="h-full w-full bg-white z-48 place-content-center">
          <SuccessLoader />
        </div>
      )}

      {/* Order Summary (desktop) */}
      <section className="hidden md:flex flex-col w-[30%] h-[500px] py-10 px-5 absolute top-30 left-15">
        <Order orderSummary={orderSummary} />
      </section>

      {/* Payment Section */}
      <section
        className="h-auto md:h-screen  w-[95%] md:w-[65%] flex flex-col items-center   
        md:overflow-y-auto scrollbar-hidden absolute right-0 gap-5"
      >
        {/* Stepper */}
        <div className="w-[95%] mt-[170px] md:mt-30">
          <Stepper Page={currentPage} className="mx-auto" />
        </div>

        {/* Address */}
        <h1 className="font-bold uppercase text-sm relative top-6 right-25 md:top-6 md:right-75">
          Shipping Address
        </h1>
        <div className="w-[95%] md:w-[75%] p-4 text-sm rounded-md shadow-[0_0_20px_rgba(75,85,99,0.3)] mt-4 mb-2 relative cursor-pointer">
          <h1 className="font-bold uppercase text-xs">{addressType}</h1>
          <div className="flex text-gray-600 gap-5 mt-2">
            <p>{name}</p>
            <p>{phone}</p>
          </div>
          <p className="text-gray-600">{address},</p>
          <p className="text-gray-600">{town}</p>
          <div className="flex text-gray-600">
            <p className="uppercase">{district}</p>
            <p className="ml-2">-{pincode}</p>
          </div>
        </div>

        {/* Payment Mode */}
        <h1 className="w-[75%] text-left ml-3 uppercase font-bold text-sm">
          Payment Mode
        </h1>
        <div className="w-[75%] flex flex-row gap-2 border-b-1 border-gray-400 pb-5">
          <span
            className={`px-6 py-3 place-content-center cursor-pointer ${
              paymentMode === "RAZORPAY"
                ? "bg-gray-700 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setPaymentMode("RAZORPAY")}
          >
            Razorpay
          </span>
          <span
            className={`px-6 py-3 place-content-center cursor-pointer ${
              paymentMode === "COD"
                ? "bg-gray-700 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setPaymentMode("COD")}
          >
            COD
          </span>
        </div>

        {/* Buttons */}
        <div className="w-full md:w-[75%] flex flex-row gap-3 justify-center">
          <button
            className="w-[35%] text-sm bg-gray-300 text-black p-2 md:p-3 cursor-pointer"
            onClick={() => {
              navigate("/store");
            }}
          >
            Cancel
          </button>
          <button
            className={`w-[35%] text-sm text-white p-2 md:p-3 ${
              paymentMode === "" || orderProductMutation.isPending
                ? "bg-gray-700 cursor-not-allowed"
                : "cursor-pointer bg-eliteGray"
            }`}
            onClick={() => {
              if (paymentMode === "COD") {
                orderProductMutation.mutate();
              } else if (paymentMode === "RAZORPAY") {
                handleRazorpay();
              }
            }}
            disabled={paymentMode === "" || orderProductMutation.isPending}
          >
            Confirm Order
          </button>
        </div>

        {/* Order Summary (mobile) */}
        <section className="md:hidden w-[95%] h-[500px] py-5 px-5 mt-15">
          <Order orderSummary={orderSummary} />
        </section>
      </section>
    </div>
  );
}

export default PaymentPage;
