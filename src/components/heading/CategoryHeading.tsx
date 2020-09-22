import React from 'react'
import { useRecoilValue } from 'recoil'
import { singleCategoryState } from '../../global-state/categoriesState'
import Heading from './Heading'

const CategoryHeading = (props: any) => {
    const { category_id, ...other } = props
    const singleCategory = useRecoilValue(singleCategoryState(category_id))
    console.log('headingProps', other)
    return <Heading {...other}>{singleCategory.name}</Heading>
}

export default CategoryHeading
