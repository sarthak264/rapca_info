import { AxiosClient } from "./baseApi";

export const PaymentService = {
  makePayment(data: any) {
    return AxiosClient.post("/payment/addnewcardPA", data);
  },
  checkPaymentStatus() {
    return AxiosClient.get("/payment/storecard");
  },
  oneClickPayment(data: any) {
    return AxiosClient.post("/payment/recurpayment", data);
  },
};
