import { useQuery } from "@apollo/client";
import { GET_ELEC_SPOT_TODAY } from "../graphQL/elecPriceQueries";

export function useGetElecSpotToday(queryoptions = {}) {
  const { loading, error, data } = useQuery(GET_ELEC_SPOT_TODAY, queryoptions);
  return { loading, error, data };
}
