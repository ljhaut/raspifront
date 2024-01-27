import { FC, useEffect, useState } from "react";
import { useGetElecSpotToday } from "../../hooks/useElecPriceGql";
import Base from "./Base";
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

const Home: FC = () => {
  const today = "20240125";
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
    <Base>
      <ResponsiveContainer aspect={1.7} width={"100%"}>
        <BarChart data={graphData} margin={{ left: 40, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="interval" />
          <YAxis label={{ value: "€/MWh", position: "insideLeft", dx: -40 }} />
          <Legend />
          <Bar dataKey="price" fill="#1e5355" legendType="none" />
          <Tooltip
            labelFormatter={(label) => {
              return `Klo: ${label}`;
            }}
            formatter={(value) => {
              return [value, "Hinta"];
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Base>
  );
};

export default Home;
