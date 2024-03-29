import { FC, useEffect, useState } from "react";
import { useGetElecSpotToday } from "../../hooks/useElecPriceGql";
import BasePage from "./BasePage";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatISO, startOfDay } from "date-fns";

const HomePage: FC = () => {
  const currentTime = new Date();
  const today = formatISO(startOfDay(currentTime));
  const [graphData, setGraphData] = useState<any>("");
  const elecPricesToday = useGetElecSpotToday({
    variables: {
      today: today,
    },
  });

  useEffect(() => {
    if (elecPricesToday.data) {
      setGraphData(elecPricesToday.data.prices);
    }
  }, [elecPricesToday.data]);

  return (
    <BasePage>
      <div>{`Sähkön SPOT-hinta tänään ${currentTime.toLocaleDateString()}`}</div>
      <div className="chart">
        <ResponsiveContainer aspect={2.3} width={"100%"}>
          <BarChart data={graphData} margin={{ left: 40, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="interval" />
            <YAxis
              label={{ value: "€/MWh", position: "insideLeft", dx: -40 }}
            />
            <Tooltip
              labelFormatter={(label) => {
                return `Klo: ${label}`;
              }}
              formatter={(value) => {
                return [`${value} €/MWh`, "Hinta"];
              }}
            />
            <Bar dataKey="price" fill="#1e5355" legendType="none" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </BasePage>
  );
};

export default HomePage;
