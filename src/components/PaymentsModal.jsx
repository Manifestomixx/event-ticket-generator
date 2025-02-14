import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import PaystackPop from '@paystack/inline-js';
import { IoClose } from 'react-icons/io5';



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);



const PaymentsModal = ({isOpen, onClose}) => {

    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const stripePriceIds = {
        VIP: "price_1QsU3wAggmHy44kPIsqekC4d",
        VVIP: "price_1QsU8GAggmHy44kPOzX1yRCl"
    };

    useEffect(() => {
        console.log("Modal Open State:", isOpen);
        if (isOpen) {
            const savedTicket = localStorage.getItem("selectedTicket");
            if (savedTicket) {
                setSelectedTicket(JSON.parse(savedTicket));
            }
        }
    }, [isOpen]);

    const handleStripePayment = async () => {
        if (!selectedTicket || !selectedTicket.type) {
            alert("Please select a ticket first.");
            return;
        }
    
        const stripe = await stripePromise;
        const priceId = stripePriceIds[selectedTicket.type];  // Ensure type exists
        if (!priceId) {
            alert("Invalid ticket selection.");
            return;
        }
    
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: priceId, quantity: ticketQuantity }],
            mode: "payment",
            successUrl: "http://localhost:5173/ticket",
            cancelUrl: "http://localhost:5173/",
        });
    
        if (error) console.error("Stripe Checkout Error:", error);
    };

    const handlePaystackPayment = () => {
        if (!selectedTicket || !selectedTicket.price) {
            alert("Please select a ticket first.");
            return;
        }
    
        const priceInKobo = parseInt(selectedTicket.price.replace(/[^0-9]/g, ""), 10) * 100;
        const email = localStorage.getItem("attendeeEmail") || "manifestomixx@gmail.com";
    
        if (!email) {
            alert("A valid email is required for payment.");
            return;
        }
    
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
            amount: priceInKobo,
            email: email,
            currency: "NGN",
            reference: `TXN_${new Date().getTime()}`,
            label: "Techember Fest 2025 Ticket",
            onSuccess: (response) => {
                alert(`Payment successful! Transaction ID: ${response.reference}`);
                onClose();
            },
            onCancel: () => {
                alert("Payment was canceled.");
            }
        });
    
    };

    if (!isOpen) return null;

  return (
    <>
    <main className='fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent bg-opacity-50 font-spaceGrotesk z-20'>
    <div className='relative flex flex-col justify-center items-center border border-[#0E464F] bg-[#08252B] m-4 p-8 rounded-lg shadow-lg max-w-md w-full space-y-5 roboto'>
            <button className="absolute top-3 right-3 text-xl text-[#24A0B5] hover:text-red-600" onClick={onClose}>
                <IoClose />
            </button>
        <h1 className='text-2xl'>Select Payment Method</h1>
        <div className='md:flex justify-between w-full space-y-3 md:space-y-0 md:space-x-5 mt-7'>
            <button className='border border-[#24A0B5] text-[#24A0B5] p-3 w-full md:w-1/2 rounded-2xl cursor-pointer' onClick={handlePaystackPayment}>Pay with Paystack</button>
            <button className='bg-[#24A0B5] text-white p-3.5 w-full md:w-1/2 rounded-2xl cursor-pointer' onClick={handleStripePayment}> Pay with Stripe</button>
        </div>
    </div>
    </main>
    </>
  )
}

export default PaymentsModal