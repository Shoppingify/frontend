import React from 'react'

// Libs
import {
    AiFillGithub,
    AiFillGoogleCircle,
    AiFillTwitterCircle,
} from 'react-icons/ai'
import { RiFacebookCircleFill } from 'react-icons/ri'

// Components
import Button from './Button'

const SocialIcons = () => {
    const showAlert = () => {
        alert(
            "Try Github instead ;). Didn't implemented other social network yet ;)"
        )
    }
    return (
        <div className="flex justify-center mt-4">
            <Button onClick={showAlert}>
                <AiFillGoogleCircle className="text-4xl text-gray hover:text-primary transition-colors duration-300 cursor-pointer mx-2" />
            </Button>
            <Button onClick={showAlert}>
                <RiFacebookCircleFill className="text-4xl text-gray hover:text-primary transition-colors duration-300 cursor-pointer mx-2" />
            </Button>
            <Button onClick={showAlert}>
                <AiFillTwitterCircle className="text-4xl text-gray hover:text-primary transition-colors duration-300 cursor-pointer mx-2" />
            </Button>
            <Button
                onClick={() => {
                    // This might be a bit hack-y, especially for accessibility, put on the backlog TODO
                    window.location.href =
                        'https://github.com/login/oauth/authorize?client_id=85a1ad6f92c29953f88a'
                }}
            >
                <AiFillGithub className="text-4xl text-gray hover:text-primary transition-colors duration-300 cursor-pointer mx-2" />
            </Button>
        </div>
    )
}

export default SocialIcons
