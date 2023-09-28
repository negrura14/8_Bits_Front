import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayments } from "../../Redux/paymentsActions";
import { PaymentTable } from "./PaymentTable";

export const PaymentStatisticsComponent = () => {
    const dispatch = useDispatch();
    const paymentStatistics = useSelector((state) => state.payments.paymentStatistics)



    const columns = [
        {
          Header: "Payment ID",
          accessor: "idPayment",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Quantity",
          accessor: "quentity",
        },
        {
          Header: "User",
          accessor: "user.email",
        },
        {
          Header: "Game",
          accessor: "game.name",
        },
      ];
    
      return (
        <div className="tablePay">
          <PaymentTable columns={columns} data={paymentStatistics} />
        </div>
      );
    
};