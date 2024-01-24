import { gql } from "@apollo/client";

export const GET_ELEC_SPOT_TODAY = gql`
  query getElecSpotToday($today: date!) {
    prices(where: { date: { _eq: $today } }, order_by: { interval: asc }) {
      price
      interval
      date
    }
  }
`;
