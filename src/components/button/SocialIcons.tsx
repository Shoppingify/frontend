import React from 'react'
import {
    AiFillGithub,
    AiFillGoogleCircle,
    AiFillTwitterCircle,
} from 'react-icons/ai'
import { RiFacebookCircleFill } from 'react-icons/ri'

const SocialIcons = () => {
    const showAlert = () => {
        alert(
            "Try Github instead ;). Didn't implemented other social network yet ;)"
        )
    }
    return (
        <div className="flex justify-center mt-4">
            <div onClick={showAlert}>
                <AiFillGoogleCircle className="text-4xl text-gray hover:text-primary transition-colors duration-300 cursor-pointer mx-2" />
            </div>
            <div onClick={showAlert}>
                <RiFacebookCircleFill className="text-4xl text-gray hover:text-primary transition-colors duration-300 cursor-pointer mx-2" />
            </div>
            <div onClick={showAlert}>
                <AiFillTwitterCircle className="text-4xl text-gray hover:text-primary transition-colors duration-300 cursor-pointer mx-2" />
            </div>
            <a href="">
                <AiFillGithub className="text-4xl text-gray hover:text-primary transition-colors duration-300 cursor-pointer mx-2" />
            </a>
        </div>
    )
}

export default SocialIcons
