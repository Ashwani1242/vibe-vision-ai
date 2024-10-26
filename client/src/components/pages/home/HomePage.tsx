// import Footer from "../../Footer";
// import Navbar from "../../Navbar";
// import Sidebar from "../../Sidebar";
// import ComedyShowPage from "../videogen/ComedyShowPage";
import Footer from "../../Footer";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
// import Introduction from "./Introduction";
// import PricingSection from "./PricingSection";

function HomePage() {
  return (
    <>
      <div className="flex flex-col w-full overflow-y-auto overflow-x-hidden">
        {/* <Sidebar />
        <ComedyShowPage /> */}
        <HeroSection />
        {/* <Introduction /> */}
        <GallerySection />
        {/* <PricingSection /> */}
        <Footer />
      </div>
      {/* <Navbar /> */}
    </>
  )
}

export default HomePage
