import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenreStatistics } from "../../Redux/gameActions";
import { VictoryPie, VictoryLegend, VictoryTooltip } from "victory";

const GenreStatisticsComponent = () => {
    const dispatch = useDispatch();
    const genreStatistics = useSelector((state) => state.genre.genreStatistics);
    
    console.log(genreStatistics);
    useEffect(() => {
        dispatch(getGenreStatistics());
      }, [dispatch]);

const chartData = genreStatistics.map((entry) => ({
    x: entry.name,
    y: parseInt(entry.count, 10), // Convierte 'count' a número
    label: `${entry.name}: ${entry.count}`,
}));

return (
    <div>
        <h2>Game Genres</h2>
        <div style={{ display: "flex" }}>
            <div style={{ width: "60%" }}>
                <VictoryPie
                    data={chartData}
                    colorScale={["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED", "#8E5EA2"]}
                    labelComponent={<VictoryTooltip />}
                />
            </div>
            <div style={{ width: "50%" }}>
                <VictoryLegend
                    data={chartData.map((entry) => ({ name: entry.x }))}
                    colorScale={["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED", "#8E5EA2"]}
                />
            </div>
        </div>
    </div>
);

   };

export default GenreStatisticsComponent;