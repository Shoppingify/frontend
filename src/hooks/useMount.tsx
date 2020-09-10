/* IMPORT */

import { useEffect, useRef, RefObject } from 'react'

/* USE MOUNTED */

const useMounted = (): RefObject<boolean> => {
    const mounted = useRef(false)

    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    return mounted
}

/* EXPORT */

export default useMounted
