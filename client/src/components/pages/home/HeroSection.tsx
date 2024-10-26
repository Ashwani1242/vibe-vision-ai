import { webData } from '../../../data/db'
import ImageCarousel from '../../utils/ImageCarousel'
// import PrimaryButton from '../../utils/PrimaryButton'

function HeroSection() {
    return (
        <div className='w-full h-full px-8 pt-16 flex flex-col justify-center items-center'>
            <ImageCarousel slides={webData.top} />

            {/* <div className='w-full max-w-[1920px] flex flex-col justify-center items-center mt-8'>
                <div className='w-[800px] h-20 focus-within:h-[140px] hover:scale-105 rounded-[16px] bg-gradient-to-r from-red-400 from-10% via-sky-400 to-pink-500 transition-all duration-500 px-1 pt-1 pb-2 relative'>
                    <textarea placeholder='What would you like to Generate?' className='w-full h-full rounded-xl resize-none p-4 pr-32 outline-none placeholder-gray-200' />
                    <div className='absolute top-5 right-5'>
                        <PrimaryButton label='Generate' />
                    </div>
                </div>
                <div className='bg-gradient-to-b from-sky-400 to-red-400 w-[3px] h-32' />
                <div className='w-full h-[60px] px-96'>
                    <div className='bg-gradient-to-bl from-red-400 from-30% via-sky-400 to-pink-500 p-1 rounded-[16px] w-full h-full'>
                        <div className='w-full h-full bg-neutral-900 rounded-[12px]'>

                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default HeroSection
