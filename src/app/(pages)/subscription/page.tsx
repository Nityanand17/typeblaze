"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import useAuthStore from "@/store/useStore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, Loader2 } from "lucide-react";

export default function SubscriptionPage() {
  const [productId, setProductId] = useState("subscription");
  const [varient, setVarient] = useState("lifetime");
  const { isAuthenticated } = useAuthStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckOut = async () => {
    try {
      setIsLoading(true);

      // Step 1: Create order on the backend
      const res = await axios.post("/api/orders", { productId, varient });

      if (!res.data.razorpayOrder || !res.data.razorpayOrder.id) {
        alert("Failed to create Razorpay order. Please try again.");
        setIsLoading(false);
        return;
      }

      const { razorpayOrder, order } = res.data;

      // Step 2: Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Ensure it's set in .env.local
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "TypeBlaze",
        description: "Lifetime Subscription",
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          try {
            const verificationRes = await axios.post("/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationRes.data.success) {
              alert("Payment Successful! Subscription Activated.");
              window.location.reload();
            } else {
              alert("Payment Verification Failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("An error occurred during payment verification. Please try again.");
          }
        },
        prefill: {
          name: "Nityanand Yadav",
          email: "nityanandyadav2324@gmail.com",
          contact: "6203439160",
        },
        theme: { color: "#3399cc" },
      };

      // Step 3: Open Razorpay checkout
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Order Creation Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Join TypeBlaze
        </h1>
        <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-500">
              Lifetime Access
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              Unlock all features forever
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-5xl font-bold text-gray-800 dark:text-gray-100">INR 9</span>
              <span className="text-gray-600 dark:text-gray-300"> / one-time</span>
            </div>
            <ul className="mt-6 space-y-2">
              {[
                "Unlimited typing tests",
                "Advanced statistics",
                "Custom test creation",
                "Ad-free experience",
                "Priority support",
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {isAuthenticated ? (
              <Button
                onClick={handleCheckOut}
                className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Get Lifetime Access"}
              </Button>
            ) : (
              <TooltipProvider>
                <Tooltip open={isHovered}>
                  <TooltipTrigger asChild>
                    <div
                      className="w-full"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <Button disabled className="w-full rounded-lg bg-blue-500 text-white font-bold py-2 px-4 cursor-not-allowed">
                        Get Lifetime Access
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <div className="flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>Please log in first to proceed</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
