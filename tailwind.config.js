module.exports = {
    purge: {
        enabled: false,
        content: ['./src/**/*.jsx', './src/**/*.tsx'],
    },
    variants: {
        margin: ['responsive', 'hover', 'focus'],
    },
    theme: {
        colors: {
            primary: '#F9A109',
            'primary-light': '#FFF0DE',
            secondary: '#56CCF2',
            danger: '#EB5757',
            white: '#fff',
            black: '#000000',
            gray: '#454545',
            'gray-light': '#c1c1c4',
            'gray-extra-light': '#FAFAFE',
        },
        fontFamily: {
            body: ['Quicksand', 'sans-serif'],
        },
        extend: {
            borderRadius: {
                24: '24px',
                12: '12px',
            },
        },
    },
}
