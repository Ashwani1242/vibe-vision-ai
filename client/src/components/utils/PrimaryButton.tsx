interface props {
    label: string,
    customClass?: string,
}

function PrimaryButton({ label, customClass = '' }: props) {
    return (
        <div
            className={` ${customClass} cursor-pointer text-center relative px-4 py-1 border-2 border-transparent hover:border-white bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% rounded-sm z-10 hover:bg-[length:100%] before:absolute before:-top-[3px] before:-bottom-[3px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-sm before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700`}>
            {label}
        </div>
    )
}

export default PrimaryButton
