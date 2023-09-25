import { useState } from "react";
import { PlatformStatisticsComponent } from "./PlatformStatistics";
import { GenreStatisticsComponent } from "./GenreStatistics";

export const StatisticsViews = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <div>
      <h2>Statistics</h2>
      <select value={selectedComponent} onChange={handleChange}>
        <option value="">Select statistics</option>
        <option value="platform">Games per platform</option>
        <option value="genre">Games per genre</option>
      </select>
      {selectedComponent === "platform" && <PlatformStatisticsComponent />}
      {selectedComponent === "genre" && <GenreStatisticsComponent />}
    </div>
  );
};