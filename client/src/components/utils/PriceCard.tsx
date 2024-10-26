import PrimaryButton from "./PrimaryButton"

interface props {
    planName?: string,
    planDiscription?: string,
    planPrice?: string,
    planDuration?: string,
    buttonLabel?: string
}

function PriceCard({ planName = "Free trial", planDiscription = "Best for students or starting out.", planPrice = "$0", planDuration = "per month", buttonLabel="Get Started" }: props) {
    return (
        <div className="flex flex-col z-20 bg-gradient-to-br from-sky-300/20 via-neutral-600/20 to-purple-600/20 ring-1 ring-white/40 hover:scale-105 cursor-pointer duration-300 transition-all backdrop-blur-sm rounded-md w-full">
            <div className="px-4 py-4 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2 className="text-md sm:text-xl font-bold tracking-tighter lg:text-2xl" > {planName} </h2>
                        <p className="mt-2 text-sm sm:text-base font-semibold text-gray-400 h-12"> {planDiscription} </p>
                    </div>
                    <div className="mt-2 md:mt-16">
                        <p>
                            <span className="text-3xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br bg-clip-text text-transparent from-indigo-500 to-sky-400"> {planPrice} </span>
                            <span className="text-xs sm:text-sm text-gray-400"> {planDuration} </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex px-6 pb-8 sm:px-8">
                <PrimaryButton label={buttonLabel} customClass="w-full text-sm sm:text-base" />
            </div>
        </div>

    )
}

export default PriceCard
