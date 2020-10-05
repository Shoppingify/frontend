// Libs
import { isMobile } from 'react-device-detect'

// Global state
import { useSetRecoilState } from 'recoil'
import { sidebarMobileShowState } from '../global-state/sidebarState'

const useSidebarShow = () => {
    const setSidebarShow = useSetRecoilState(sidebarMobileShowState)
    return (direction = 'Left') => {
        if (isMobile) {
            setSidebarShow((current: boolean) => {
                if (current && direction === 'Right') {
                    return false
                }

                if (!current && direction === 'Left') {
                    return true
                }

                if (direction === 'Right') {
                    return false
                }

                return true
            })
        }
    }
}

export default useSidebarShow
