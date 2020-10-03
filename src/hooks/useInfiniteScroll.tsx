import { RefObject, useEffect, useState } from 'react'

export const useInfiniteScroll = (
    callback: Function,
    container: any,
    threshold: number = 1
) => {
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isExhausted, setIsExhausted] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            if (container && container.current) {
                if (
                    container.current.offsetHeight +
                        container.current.scrollTop +
                        threshold >=
                        container.current.scrollHeight &&
                    !isFetching
                ) {
                    setIsFetching(true)
                    callback()
                }
            }
        }
        if (container && container.current) {
            if (isExhausted)
                container.current.removeEventListener('scroll', handleScroll)
            else container.current.addEventListener('scroll', handleScroll)
        }
        return () => {
            if (container && container.current) {
                container.current.removeEventListener('scroll', handleScroll)
            }
        }
    }, [isFetching, isExhausted, callback])

    return [setIsFetching, isExhausted, setIsExhausted] as const
}
