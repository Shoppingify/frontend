import React from 'react'

// Assets
import LogoSVG from '../../assets/logo.svg'
import Button from '../button/Button'

const UserMenu = () => {
    const handleLogout = () => {
        // Remove token
        localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <div className="group relative flex justify-center w-full">
            <LogoSVG />
            <div
                style={{ left: '100%' }}
                className="pl-4 group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none opacity-0 transform translate-x-40 absolute transition-transform duration-200"
            >
                <div className="p-4 bg-white">
                    <Button modifier="primary" onClick={handleLogout}>
                        Log out
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserMenu
