import { apiSlice } from "./apiSlice";
import { ORDER_URL, VERIFY_URL } from "../constants";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: ORDER_URL,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        verifyOrder: builder.mutation({
            query: (data) => ({
                url: VERIFY_URL,
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-razorpay-signature': data.razorpay_signature,
                 },
                body: data,
                credentials: 'include'
            })
        }),
    })
})

export const { useCreateOrderMutation, useVerifyOrderMutation } = paymentApiSlice;