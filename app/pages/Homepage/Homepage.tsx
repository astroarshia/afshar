import Background from "@/src/UI/Background";
import Header from "@/src/UI/Header";
import FeaturedLaptops from "@/src/UI/Store/FeaturedLaptops";

export default function Homepage() {
  return (
    <>
      <Background />
      <Header />

      <main>
        <FeaturedLaptops />
      </main>

      {/* <Footer /> */}
    </>
  );
}
