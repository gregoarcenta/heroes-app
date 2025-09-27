import { useParams } from "react-router";

const HeroPage = () => {
  const { slugId } = useParams();

  console.log({ slugId });
  return <div>HeroPage</div>;
};

export default HeroPage;
