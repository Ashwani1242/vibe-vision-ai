import { ReactTyped } from "react-typed";
import PriceCard from "../../utils/PriceCard";
import InteractiveDisplay from "../../background/IntercativeDisplay";

function PricingSection() {
  return (
    <div className="w-full h-fit px-8 py-32 flex justify-center items-center">
      <div className="group relative">
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-red-400 via-sky-400 via-60% to-violet-600 blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:bg-gradient-to-r"></div>

        <div className="w-full ring-1 ring-white/20 h-full rounded-3xl relative overflow-hidden md:max-h-[600px] max-w-[1200px] max-h-fit">
          <InteractiveDisplay />
          <div className="w-full h-full bg-neutral-950 bg-dots absolute md:hidden"></div>
          <div className="p-8 lg:p-20 flex flex-col items-center justify-center">
            <div className="text-md sm:text-2xl md:text-4xl font-semibold relative z-20 w-full h-20 mb-4 md:mb-16">
              {/* <span className="blur-md top-0 absolute text-nowrap left-0 w-full">
                Endless Inspirations, <br />
                <ReactTyped
                  strings={[`Just For You at Your Command.`]}
                  typeSpeed={50}
                  loop
                  backSpeed={20}
                  cursorChar="|"
                  showCursor={true}
                  backDelay={2000}
                />
              </span> */}
              <span className="top-0 absolute text-nowrap left-0">
                Endless Inspirations, <br />
                <ReactTyped
                  strings={[`Just For You at Your Command.`]}
                  typeSpeed={50}
                  loop
                  backSpeed={20}
                  cursorChar="|"
                  showCursor={true}
                  backDelay={2000}
                  className=""
                />
              </span>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-8 lg:gap-16">
              <PriceCard buttonLabel="Start free trial" />
              <PriceCard
                planName="Pro plan"
                planDiscription="Suitable for growing teams or small businesses."
                planPrice="$25"
              />
              <PriceCard
                planName="Enterprice plan"
                planDiscription="Suitable for large organizations."
                planPrice="$40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
