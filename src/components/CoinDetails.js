import { useParams } from "react-router-dom";

const CoinDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <p>Hey, how is it going {id} ?</p>
    </div>
  );
};

export default CoinDetails;
