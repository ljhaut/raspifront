import { FC, useEffect, useState } from "react";
import BasePage from "./BasePage";
import { useGetElecSpotToday } from "../hooks/useElecPriceGql";

const HomePage: FC = () => {
  const today = "20231012";
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

  console.log(elecPricesToday.error);
  console.log(elecPricesToday.loading);
  console.log(elecPricesToday.data);

  return <BasePage>{graphData}</BasePage>;
};

export default HomePage;
