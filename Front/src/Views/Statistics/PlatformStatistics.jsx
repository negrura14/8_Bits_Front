import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupportedPlatformStatistics, getSupportedPlatforms } from "../../Redux/gameActions";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from "victory";

export const PlatformStatisticsComponent = () => {
    const dispatch = useDispatch();
    const platformStatisticsData = useSelector((state) => state.supportedPlatform.supportedPlatformStatistics);
    const [animate, setAnimate] = useState(true)

    useEffect(() => {
      dispatch(getSupportedPlatforms());
      dispatch(getSupportedPlatformStatistics());
      setAnimate(true);
    }, []);
  
    if (!platformStatisticsData) {
      return <div>Cargando...</div>;
    }
  
    const chartData = platformStatisticsData.map((entry) => ({
      platform: entry.name,
      count: parseInt(entry.count, 10),
    }));
  
    return (
      <div className="login-box platStats">
        <h2>Game Platforms</h2>
        <VictoryChart
          domainPadding={20}
          width={500}
          height={250}
          // animate={animate ? { duration: 1000 } : false} // Agrega animación a las barras
        >
          <VictoryAxis
          
            tickValues={chartData.map((entry) => entry.platform)}
            tickFormat={(tick) => tick}
            style={{
              tickLabels: { angle: -45, textAnchor: "end", fill: "white", fontSize: 7},
              axis: { stroke: "grey"},
            }}
            
          />
          <VictoryAxis

            dependentAxis
            tickFormat={(tick) => tick}
            style={{
                tickLabels: { fill: "white" },
                axis: { stroke: "gray" },
              }}
          />
          <VictoryBar
            data={chartData}
            x="platform"
            y="count"
            labels={({ datum }) => `${datum.platform}: ${datum.count}`}
            style={{
              data: { fill: "#ba1f65" },
            }}
            labelComponent={
              <VictoryTooltip
                cornerRadius={3}
                flyoutStyle={{ fill: "#00ff8c" }}
              />
            }
          />
        </VictoryChart>
      </div>
    );
  };
  