









'use client';

interface RazorpayButtonProps {
  amount: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayButton = ({ amount }: RazorpayButtonProps) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    await loadRazorpayScript();

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // replace this with your Razorpay key
      amount: amount * 100, // in paise
      currency: 'INR',
      name: 'Ola Clone',
      description: 'Ride Payment',
      handler: function (response: any) {
        alert('Payment Successful! 🎉');
        console.log(response);
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#fbbf24',
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 hover:bg-green-700 text-green-950 px-6 py-2 rounded"
    >
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
