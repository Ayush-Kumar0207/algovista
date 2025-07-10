// import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from 'react-tooltip'
import "react-tooltip/dist/react-tooltip.css"; // Required for v5

type HeatmapData = {
  date: string;
  solved: number;
};

const Calendar = ({ data }: { data: HeatmapData[] }) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 120);
  const endDate = new Date();

  const values = data.map((entry) => ({
    date: entry.date,
    count: entry.solved,
  }));

  return (
    <div className="w-full overflow-x-auto">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-empty";
          if (value.count >= 4) return "color-github-4";
          if (value.count === 3) return "color-github-3";
          if (value.count === 2) return "color-github-2";
          return "color-github-1";
        }}
        tooltipDataAttrs={(value) =>
          ({
            "data-tip": `${(value as any)?.date ?? "No date"} – ${(value as any)?.count ?? 0} solved`,
          } as { [key: string]: string })
        }
        showWeekdayLabels
      />
      <Tooltip /> {/* ✅ Now TypeScript understands this as JSX */}
    </div>
  );
};

export default Calendar;
