import Trip from "./Trip";
import TripProvider from "./Trip-context/Trip-context";

const Trips = () => {
  return (
    <TripProvider tripid={0}>
      <Trip />
    </TripProvider>
  );
};

export default Trips;
