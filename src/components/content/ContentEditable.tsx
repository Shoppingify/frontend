/**
 * SOURCE: https://github.com/lovasoa/react-contenteditable
 */
import * as React from 'react'

// Libs
import deepEqual from 'fast-deep-equal'

// Types
export type ContentEditableEvent = React.SyntheticEvent<any, Event> & {
    target: { value: string }
}
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R
type DivProps = Modify<
    JSX.IntrinsicElements['div'],
    { onChange: (event: ContentEditableEvent) => void }
>

export interface Props extends DivProps {
    html: string
    disabled?: boolean
    tagName?: string
    className?: string
    style?: Object
    innerRef?: React.RefObject<HTMLElement> | Function
    enterPressCallback?: any
    shouldFocus?: boolean
}

// Helper functions
const normalizeHtml = (str: string): string => {
    return (
        str &&
        str
            .replace(/&nbsp;|\u202F|\u00A0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
    )
}

const replaceCaret = (el: HTMLElement) => {
    // Place the caret at the end of the element
    const target = document.createTextNode('')
    el.appendChild(target)
    // do not move caret if element was not focused
    const isTargetFocused = document.activeElement === el
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
        var sel = window.getSelection()
        if (sel !== null) {
            var range = document.createRange()
            range.setStart(target, target.nodeValue.length)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
        }
        if (el instanceof HTMLElement) el.focus()
    }
}

/**
 * A simple component for an html element with editable contents.
 */
export default class ContentEditable extends React.Component<Props> {
    lastHtml: string = this.props.html
    el: any =
        typeof this.props.innerRef === 'function'
            ? { current: null }
            : React.createRef<HTMLElement>()

    getEl = () =>
        (this.props.innerRef && typeof this.props.innerRef !== 'function'
            ? this.props.innerRef
            : this.el
        ).current
    shouldComponentUpdate(nextProps: Props): boolean {
        const { props } = this
        const el = this.getEl()

        // We need not rerender if the change of props simply reflects the user's edits.
        // Rerendering in this case would make the cursor/caret jump

        // Rerender if there is no element yet... (somehow?)
        if (!el) return true

        // ...or if html really changed... (programmatically, not by user edit)
        if (normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)) {
            return true
        }

        // Handle additional properties
        return (
            props.disabled !== nextProps.disabled ||
            props.tagName !== nextProps.tagName ||
            props.className !== nextProps.className ||
            props.innerRef !== nextProps.innerRef ||
            !deepEqual(props.style, nextProps.style)
        )
    }

    componentDidUpdate() {
        const el = this.getEl()
        if (!el) return

        if (!this.props.disabled && this.props.shouldFocus) {
            el.focus()
        }

        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        if (this.props.html !== el.innerHTML) {
            el.innerHTML = this.props.html
        }

        this.lastHtml = this.props.html
        replaceCaret(el)
    }

    emitChange = (originalEvt: React.SyntheticEvent<any>) => {
        const el = this.getEl()
        if (!el) return

        //@ts-ignore
        if (originalEvt.keyCode === 13) {
            originalEvt.preventDefault()

            // Remove extra spaces and reset caret
            el.innerHTML = normalizeHtml(el.innerHTML)
            replaceCaret(el)

            if (this.props.enterPressCallback) {
                this.props.enterPressCallback()
            }
        }

        // Normalize html
        const html = normalizeHtml(el.innerHTML)

        // Handle passing of the html to parent
        if (this.props.onChange && html !== this.lastHtml) {
            // Clone event with Object.assign to avoid
            // "Cannot assign to read only property 'target' of object"
            const evt = Object.assign({}, originalEvt, {
                target: {
                    value: html,
                },
            })
            this.props.onChange(evt)
        }
        this.lastHtml = html
    }

    render() {
        const { tagName, html, innerRef, ...props } = this.props

        return React.createElement(
            tagName || 'div',
            {
                ref:
                    typeof innerRef === 'function'
                        ? (current: HTMLElement) => {
                              innerRef(current)
                              this.el.current = current
                          }
                        : innerRef || this.el,
                onInput: this.emitChange,
                onBlur: this.props.onBlur || this.emitChange,
                onKeyUp: this.props.onKeyUp || this.emitChange,
                onKeyDown: this.props.onKeyDown || this.emitChange,
                contentEditable: !this.props.disabled,
                dangerouslySetInnerHTML: { __html: normalizeHtml(html) },
                className: this.props.className,
                style: this.props.style,
            },
            this.props.children
        )
    }
}
