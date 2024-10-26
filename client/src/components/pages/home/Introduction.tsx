function Introduction() {
    return (
        <div
            className='flex flex-col gap-4 p-12 xl:p-16 m-12 text-center ring-2 ring-neutral-400 overflow-hidden/ overflow-clip h-fit relative rounded-md'>
            <div className='bg-noise'/>
            <span className='text-4xl md:text-7xl py-2 md:p-2 xl:p-4'>Advancing creativity <br /> with artificial intelligence.</span>
            <span className='text-sm md:text-base'>Interdimentional Comedy is an applied AI research company building the next era of art, <br /> entertainment and human creativity.</span>
            <div className="hover:animate-pulse hover:brightness-90 duration-500 font-semibold text-sm md:text-base md:py-2 px-4 cursor-pointer text-indigo-300 hover:text-indigo-400 transition-all hover:-translate-y-[2px]">
                Watch Demo
            </div>
        </div>
    )
}

export default Introduction
