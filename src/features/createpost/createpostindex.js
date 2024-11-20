import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import ErrorText from '../../components/Typography/ErrorText'
import axios from 'axios'
import { baseuRL } from "../../app/api"

const Createpostindex = () => {

    const INITIAL_LOGIN_OBJ = {
        FreeText: "",
        Text: "",
        ImageURL: ""
    }

    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)
    const [errorMessage, setErrorMessage] = useState("")

    const updateFormValue = (updateType, value) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")
        console.log(loginObj);

        if (loginObj.FreeText.trim() === "") return setErrorMessage("Free Text is required! (use any value)")
        if (loginObj.ImageURL.trim() === "") return setErrorMessage("ImageURL is required! (use any value)")
        if (loginObj.Text.trim() === "") return setErrorMessage("Text is required! (use any value)")
        else {
            async function Helo() {
                const res = await axios.post(`${baseuRL}/api/componies/register`, loginObj);
                console.log(res.data);
                if (res.data) {
                    setErrorMessage("Saved")
                }
            }
            Helo();
        }
    }



    return (
        <>
            <TitleCard title={'Create Post'}>
                <form onSubmit={submitForm} className="my-2">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-xl  mt-4 font-bold tracking-tight">
                                Add Post
                            </h2>
                            <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2">
                                <div className="sm:col-span-1">
                                    <label htmlFor="image-url" className="block text-md font-medium leading-6">
                                        ImageURL
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="ImageURL"
                                            value={loginObj.ImageURL}
                                            onChange={(e) => updateFormValue('ImageURL', e.target.value)}
                                            className="block w-full p-1 px-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="text" className="block text-md font-medium leading-6">
                                        Text
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="Text"
                                            value={loginObj.Text}
                                            onChange={(e) => updateFormValue('Text', e.target.value)}
                                            className="block w-full p-1 px-2 border-0 rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="free-text" className="block text-md font-medium leading-6">
                                        Free Text
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="FreeText"
                                            value={loginObj.FreeText}
                                            onChange={(e) => updateFormValue('FreeText', e.target.value)}
                                            className="block w-full p-1 px-2 border-0 rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                    <div className="mt-6 flex items-center justify-between gap-x-6">
                        <button type="submit" className="rounded-md mr-3 cursor-pointer bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Add Post
                        </button>
                    </div>
                </form>
            </TitleCard>
        </>
    )
}

export default Createpostindex
