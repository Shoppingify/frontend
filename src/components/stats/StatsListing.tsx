import React from 'react'
import Heading from '../heading/Heading'

interface StatsListingProps {
    data: any[]
    title: string
}
const StatsListing: React.FC<StatsListingProps> = ({
    data,
    title,
}: StatsListingProps) => {
    return (
        <div className="flex flex-col md:w-1/2 mx-4 mb-6 md:mb-0">
            <Heading className="mb-4 font-bold" level={3}>
                {title}
            </Heading>
            <ul>
                {data.map((item: any, index: number) => {
                    return (
                        <li key={index}>
                            <div className="flex justify-between">
                                <Heading
                                    className="font-medium mb-2 text-sm"
                                    level={4}
                                >
                                    {item.name}
                                </Heading>
                                <span className="font-medium text-sm">
                                    {item.quantity} %
                                </span>
                            </div>
                            <progress
                                className="w-full"
                                max="100"
                                value={item.quantity}
                            ></progress>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default StatsListing
