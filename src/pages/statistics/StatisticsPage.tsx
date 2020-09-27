import React, { useState, useEffect } from 'react'

// Libs
import { useRecoilValue } from 'recoil'

// Components
import Button from '../../components/button/Button'
import Heading from '../../components/heading/Heading'
import BasicLoader from '../../components/loader/BasicLoader'
import StatsChart from '../../components/stats/StatsChart'
import StatsListing from '../../components/stats/StatsListing'

// State
import { statisticsState } from '../../global-state/statisticsState'
import useFetchStats from '../../hooks/useFetchStats'

/**
 * Simple statistics page component
 */
const StatisticsPage: React.FC = () => {
    const { loading, stats, noStats } = useRecoilValue(statisticsState)
    const [interval, setTimeInterval] = useState('month')

    // Hooks
    const fetchStats = useFetchStats()

    /**
     * Component mounted effect
     */
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
        <div className="h-full overflow-y-auto p-4 md:p-6">
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
            <div className="flex flex-col md:flex-row mb-10">
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
