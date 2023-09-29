import { useSelector, useDispatch} from "react-redux";
import { useTable } from "react-table";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";

export const TotalSalesComponent = () => {
    const dispatch = useDispatch();
    const totalSalesData = useSelector((state) => state.payments.totalSales);
    
    
  return (
    <div className="login-box">
      <h2>Total Sales</h2>
      <VictoryChart domainPadding={20} width={400} height={250}>
        <VictoryAxis
          tickValues={["Total Sales (USD)"]}
          tickFormat={(tick) => tick}
          style={{
            tickLabels: { angle: 0, textAnchor: "end", fill: "white" },
            axis: {stroke: "gray"}
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => tick}
          style={{
            tickLabels: { fill: "white" },
            axis: {stroke: "gray"}
          }}
        />
        <VictoryBar
          data={[
            { x: "Total Sales (USD)", y: totalSalesData.totalRevenue },
          ]}
          x="x"
          y="y"
          
          labels={({ datum }) => `$${datum.y.toFixed(2)}`}
          labelComponent={<VictoryLabel dy={-10} style={{fill: "#00ff8c"}} />}
          style={{
            data: { fill: "#ba1f65" },
          }}
        />
      </VictoryChart>
    </div>
  );
};