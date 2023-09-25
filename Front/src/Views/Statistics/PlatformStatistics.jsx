import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupportedPlatformStatistics, getSupportedPlatforms } from "../../Redux/gameActions";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from "victory";

export const PlatformStatisticsComponent = () => {
    const dispatch = useDispatch();
    const platformStatisticsData = useSelector((state) => state.supportedPlatform.supportedPlatformStatistics);
    
    useEffect(() => {
      dispatch(getSupportedPlatforms());
      dispatch(getSupportedPlatformStatistics());
    }, []);
  
    if (!platformStatisticsData) {
      return <div>Cargando...</div>;
    }
  
    const chartData = platformStatisticsData.map((entry) => ({
      platform: entry.name,
      count: parseInt(entry.count, 10),
    }));
  
    return (
      <div>
        <h2>Game Platforms</h2>
        <VictoryChart
          domainPadding={20}
          width={500}
          height={250}
          animate={{ duration: 1000 }} // Agrega animación a las barras
        >
          <VictoryAxis

            tickValues={chartData.map((entry) => entry.platform)}
            tickFormat={(tick) => tick}
            style={{
              tickLabels: { angle: -45, textAnchor: "end", fill: "green" },
              axis: { stroke: "white"}
            }}
          />
          <VictoryAxis

            dependentAxis
            tickFormat={(tick) => tick}
            style={{
                tickLabels: { fill: "green" },
                axis: { stroke: "white" },
              }}
          />
          <VictoryBar
            data={chartData}
            x="platform"
            y="count"
            labels={({ datum }) => `${datum.platform}: ${datum.count}`}
            style={{
              data: { fill: "blue" },
            }}
            labelComponent={
              <VictoryTooltip
                cornerRadius={3}
                flyoutStyle={{ fill: "white" }}
              />
            }
          />
        </VictoryChart>
      </div>
    );
  };
  