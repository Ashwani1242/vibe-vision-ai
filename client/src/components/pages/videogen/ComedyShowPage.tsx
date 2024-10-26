// import { useState } from "react";
// // import Navbar from "../../Navbar";
// import VideoGenDID from "./VideoGenDID";
// import VideoGenRunway from "./VideoGenRunway";
import VideoGenTavus from "./VideoGenTavus";
import ReelGen from "./ReelGen";
import { Route, Routes } from "react-router-dom";

function ComedyShowPage() {
    // const [activeTab, setActiveTab] = useState<string>('Reel');

    // const renderComponent = () => {
    //     switch (activeTab) {
    //         case 'Reel':
    //             return <ReelGen />;
    //         case 'DID':
    //             return <VideoGenDID />;
    //         case 'Tavus':
    //             return <VideoGenTavus />;
    //         case 'Runway':
    //             return <VideoGenRunway />;
    //         default:
    //             return null;
    //     }
    // };

    return (
        <>
            {/* <Navbar /> */}

            <Routes >
                <Route path="/l" element={<ReelGen />} />
                <Route path="/" element={<VideoGenTavus />} />
                {/* <Route path="/kids-music" element={<KidsMusicPage />} /> */}
                {/* <Route path="/pricing" element={<PricingPage />} /> */}
                {/* <Route path="/whats-new" element={<WhatsNewPage />} /> */}
            </Routes>
            {/* <div className="flex ">
                <div className="">
                    {renderComponent()}
                </div>

                <div className="flex flex-col justify-center mb-20">
                    <button
                        className={`px-4 py-2 ${activeTab === 'Reel' ? 'bg-gradient-to-br from-red-500 to-indigo-500 text-white' : 'bg-neutral-800'} mx-2 rounded-sm`}
                        onClick={() => setActiveTab('Reel')}>
                        Reel Gen
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'DID' ? 'bg-gradient-to-br from-red-500 to-indigo-500 text-white' : 'bg-neutral-800'} mx-2 rounded-sm`}
                        onClick={() => setActiveTab('DID')}>
                        D-ID API
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'Tavus' ? 'bg-gradient-to-br from-red-500 to-indigo-500 text-white' : 'bg-neutral-800'} mx-2 rounded-sm`}
                        onClick={() => setActiveTab('Tavus')}>
                        Tavus API
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'Runway' ? 'bg-gradient-to-br from-red-500 to-indigo-500 text-white' : 'bg-neutral-800'} mx-2 rounded-sm`}
                        onClick={() => setActiveTab('Runway')}>
                        Runway API
                    </button>
                </div>
            </div> */}
        </>
    );
}

export default ComedyShowPage;
