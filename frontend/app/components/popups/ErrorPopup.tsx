const ErrorPopup = ({message}:{message: string}) =>{
    return (
        <div className="bg-black p-6 fixed z-[100] w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu rounded">{message}</div>
    )
}

export default ErrorPopup