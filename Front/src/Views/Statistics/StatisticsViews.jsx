import { useState } from "react";
import { PlatformStatisticsComponent } from "./PlatformStatistics";
import { GenreStatisticsComponent } from "./GenreStatistics";

export const StatisticsViews = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <div className="p-5">
      <h2>Statistics</h2>
      <select className="form-select bg-opacity-25 bg-black text-white-50 my-3 col-md-4 col-sm-6" value={selectedComponent} onChange={handleChange}>
        <option value="">Select statistics</option>
        <option value="platform">Games per platform</option>
        <option value="genre">Games per genre</option>
      </select>
      {selectedComponent === "platform" && <PlatformStatisticsComponent />}
      {selectedComponent === "genre" && <GenreStatisticsComponent />}
    </div>
  );
};