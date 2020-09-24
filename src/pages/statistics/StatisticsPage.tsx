import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import client from '../../api/client'
import Button from '../../components/button/Button'
import Heading from '../../components/heading/Heading'
import BasicLoader from '../../components/loader/BasicLoader'
import StatsChart from '../../components/stats/StatsChart'
import StatsListing from '../../components/stats/StatsListing'
import { statisticsState } from '../../global-state/statisticsState'

/**
 * Simple statistics page component
 */
const StatisticsPage: React.FC = () => {
    const [stats, setStats] = useRecoilState(statisticsState)
    const [interval, setTimeInterval] = useState('month')
    const [loading, setLoading] = useState(true)
    const [noStats, setNoStats] = useState(false)

    const fetchStats = useCallback(async () => {
        try {
            const res = await client.get('stats')
            console.log('res', res.status)
            console.log('response', res.data.data)
            if (res.status !== 204) {
                setStats(res.data.data)
            } else {
                setNoStats(true)
            }
        } catch (e) {
            console.log('Error while fetching stats', e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="w-full h-screen">
                <BasicLoader />
            </div>
        )
    }

    if (!loading && noStats) {
        return (
            <div className="flex w-full justify-center pt-10">
                <Heading level={3} className="font-bold">
                    No statistics to display!
                </Heading>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6">
            {/* Switch */}
            <div className="flex justify-end mb-8">
                <Button
                    onClick={() => setTimeInterval('month')}
                    modifier={interval === 'month' ? 'primary' : ''}
                    className={`mx-2 ${
                        interval === 'month' ? '' : 'text-black'
                    }`}
                >
                    Month
                </Button>
                <Button
                    onClick={() => setTimeInterval('year')}
                    modifier={interval === 'year' ? 'primary' : ''}
                    className={`mx-2 ${
                        interval === 'year' ? '' : 'text-black'
                    }`}
                >
                    Year
                </Button>
            </div>
            <div className="flex mb-10">
                {/* Items */}
                <StatsListing
                    data={
                        interval === 'month'
                            ? stats.month.itemsByMonth
                            : stats.year.itemsByYear
                    }
                    title="Top Items"
                />
                {/* Categories */}
                <StatsListing
                    data={
                        interval === 'month'
                            ? stats.month.categoriesByMonth
                            : stats.year.categoriesByYear
                    }
                    title="Top Categories"
                />
            </div>
            {/* Graph */}
            <div className="flex justify-center items-center">
                <StatsChart
                    data={
                        interval === 'month'
                            ? stats.month.quantityByDay
                            : stats.year.quantityByMonth
                    }
                    title={
                        interval === 'month'
                            ? 'Monthly Summary'
                            : 'Yearly Summary'
                    }
                    interval={interval}
                />
            </div>
        </div>
    )
}

export default StatisticsPage
