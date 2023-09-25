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

const sortedGenreStatistics = [...genreStatistics].sort((a, b) => parseInt(a.count, 10) - parseInt(b.count, 10));

const chartData = sortedGenreStatistics.map((entry) => ({
    x: entry.name,
    y: parseInt(entry.count, 10), // Convierte 'count' a número
    label: `${entry.name}: ${entry.count}`,
}));


return (
    <div className="stadistic">
        
        <h2 className="m-3">Game Genres</h2>
        <div className="mb-5 row" style={{ display: "flex" }}>
            <div className="col-md-6 col-sm-12">
                <VictoryPie
                    data={chartData}
                    colorScale={[ "#36A2EB","#943E41", "#178654", "#ba1f65", "#9216BA", "#8CBA32"]}
                    style={{data:{fillOpacity: 1, stroke: "#ffffff", strokeWidth: 0.5}}}
                    labelComponent={<VictoryTooltip />}

                />
            </div>
            <div className="col-md-6 col-sm-12">
                <VictoryLegend
                title="Legend"
                
  centerTitle
  style={{title: {fontSize: 30, fill: "white", margin:"20px" }}}
                    data={chartData.map((entry) => ({ name: entry.x, labels: { fill: "white" }   } ))}
                    colorScale={[ "#36A2EB","#943E41", "#178654", "#ba1f65", "#9216BA", "#8CBA32"]}
                />
            </div>
        </div>
    </div>
);

   };

export {GenreStatisticsComponent};