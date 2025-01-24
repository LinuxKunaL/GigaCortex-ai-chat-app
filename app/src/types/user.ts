export type TUser = {
  _id?: string;
  avatar?: string;
  email?: string;
  name?: string;
  credits?: {
    balance: number;
    transactionHistory: {
      date: string;
      credit: number;
      amount: number;
      paymentId: string;
    }[];
  };
};
