import { useSetRecoilState } from 'recoil'
import client from '../api/client'
import { statisticsState } from '../global-state/statisticsState'

const useFetchStats = () => {
    const setStatsState = useSetRecoilState(statisticsState)

    return async () => {
        setStatsState((current) => ({ ...current, loading: true }))

        try {
            const res = await client.get('stats')
            console.log('res', res.status)
            console.log('response', res.data.data)
            if (res.status !== 204) {
                setStatsState((_) => ({
                    stats: res.data.data,
                    loading: false,
                    noStats: false,
                }))
            } else {
                setStatsState((_) => ({
                    stats: res.data.data,
                    loading: false,
                    noStats: true,
                }))
            }
        } catch (e) {
            setStatsState((current) => ({ ...current, loading: false }))
            console.log('Error while fetching stats', e)
        }
    }
}

export default useFetchStats
