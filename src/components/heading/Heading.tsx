import React from 'react'

interface PropTypes extends React.HTMLProps<HTMLHeadingElement> {
    level: number
}

// Default styling for headings
const headingStyles: { [key: number]: string } = {
    1: 'text-4xl',
    2: 'text-2xl',
    3: 'text-sm'
}

const Heading: React.FC<PropTypes> = ({ level, ...rest}) => {
    const Tag = 'h' + level

    const headingProps = {
        ...rest,
        className: headingStyles[level] + ' ' + rest.className
    }

    return (
        <Tag {...headingProps}>
            {
                rest.children
            }
        </Tag>
    )
}

export default Heading
