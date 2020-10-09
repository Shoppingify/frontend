// Libs
import { isMobile } from 'react-device-detect'

// Global state
import { useSetRecoilState } from 'recoil'
import { sidebarMobileShowState } from '../global-state/sidebarState'

const useSidebarShow = () => {
    const setSidebarShow = useSetRecoilState(sidebarMobileShowState)
    return (direction?: 'Left' | 'Right') => {
        let localDirection = direction
        if (!localDirection) {
            localDirection = 'Left'
        }
        if (isMobile) {
            setSidebarShow((current: boolean) => {
                if (current && localDirection === 'Right') {
                    return false
                }

                if (!current && localDirection === 'Left') {
                    return true
                }

                if (localDirection === 'Right') {
                    return false
                }

                return true
            })
        }
    }
}

export default useSidebarShow
