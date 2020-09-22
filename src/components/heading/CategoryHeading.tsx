import React from 'react'
import { useRecoilValue } from 'recoil'
import { singleCategoryState } from '../../global-state/categoriesState'
import Heading from './Heading'

const CategoryHeading = ({ category_id, ...other }: any) => {
    const singleCategory = useRecoilValue(singleCategoryState(category_id))
    return <Heading {...other}>{singleCategory.name}</Heading>
}

export default CategoryHeading
