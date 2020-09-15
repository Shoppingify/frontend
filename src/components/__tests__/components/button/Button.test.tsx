import React from 'react'
import Button from '../../../button/Button'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'

import { render, cleanup, fireEvent } from '@testing-library/react'

it('Make sure btn component renders, modifier works correctly and onClick works', () => {
    const onClick = jest.fn()
    const modifiers = ['primary', 'secondary', 'danger', 'white']

    modifiers.forEach((modifier: string) => {
        const { getByTestId } = render(
            <Button modifier={modifier} onClick={onClick} />
        )

        const element = getByTestId('button-component')

        expect(element).toHaveClass(`bg-${modifier}`)
        fireEvent.click(element)
        expect(onClick).toHaveBeenCalled()
        cleanup()
    })

    // Handle invalid modifier
    const { getByTestId } = render(
        <Button modifier="invalid" onClick={onClick} />
    )
})
