// import Navbar from "../../Navbar"
import { useState } from "react";
import MusicGenPage from "./MusicGenPage"
import LofiMix from "../videogen/LofiMix";
import Jukebox from "./Jukebox";

const tabList = ['Jukebox', 'Kid\'s Music', 'Lo-Fi Mix']

function KidsMusicPage() {
  const [activeTab, setActiveTab] = useState(tabList[0]);

  const renderComponent = () => {
    switch (activeTab) {
      // case tabList[0]:
      //   return <> {tabList[0]} </>;
      case tabList[0]:
        return <Jukebox />;
      case tabList[1]:
        return <MusicGenPage />;
      case tabList[2]:
        return <> <LofiMix /> </>;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-y-scroll w-full">
      {/* <Navbar /> */}
      {/* <MusicGenPage /> */}
      <div className="flex flex-col w-full relative">
        <div className="text-7xl pl-8 py-16" > {activeTab} </div>
        <div className="flex w-full justify-start sticky pt-16 lg:pt-0 top-0 py-4 bg-primary z-40">
          {tabList.map((tab) => (
            <button
              key={`key_${tab}`}
              className={`px-4 py-2 ${activeTab === tab ? 'border-white' : 'border-transparent hover:border-white/50'} transition-all duration-300 border-b-4 mx-2 rounded-sm`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full">
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default KidsMusicPage
