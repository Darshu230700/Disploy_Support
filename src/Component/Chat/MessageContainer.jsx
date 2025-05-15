import React from 'react'

const MessageContainer = ({ handleFileChange, hiddenFileInput, setMessage, sendMessage, message, handleClick, fileType, previewUrl }) => {
    return (
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex gap-2">
                <button
                    type="button"
                    className="inline-flex items-center mt-1 justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                    onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                    </svg>
                    <input
                        type="file"
                        id="upload-button"
                        style={{ display: "none" }}
                        ref={hiddenFileInput}
                         accept="image/*"
                        onChange={(e) => handleFileChange(e)}
                    />
                </button>
                {fileType === 'image' ? <>
                    <div style={{display:"flex"}}>
                        <img src={previewUrl} alt='' width={50} />
                        <button disabled={!fileType} type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer" onClick={(e) => { e.preventDefault(); sendMessage(fileType); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </> : <>
                    <div className="w-full flex rounded-full items-center gap-2 border border-black px-3 bg-gray-200">
                        <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-900 py-0 px-2 placeholder-gray-600 bg-gray-200 rounded-md" onChange={(e) => setMessage(e.target.value)} value={message} onKeyPress={(e) => e.code === "Enter" ? sendMessage(message) : null} />
                        <button disabled={!message} type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cursor-pointer" onClick={(e) => { e.preventDefault(); sendMessage(message); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default MessageContainer