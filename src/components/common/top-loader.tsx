import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
  return (
    <NextTopLoader
      color="#159C47"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow={`0 0 10px #003313,0 0 5px #003313`}
    />
  );
};

export default TopLoader;
