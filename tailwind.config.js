module.exports = {
    purge: {
        enabled: false,
        content: ['./src/**/*.jsx', './src/**/*.tsx'],
    },
    variants: {
        margin: ['responsive', 'hover', 'focus'],
        opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    theme: {
        colors: {
            primary: '#F9A109',
            'primary-light': '#FFF0DE',
            secondary: '#56CCF2',
            danger: '#EB5757',
            success: '#32CD33',
            white: '#fff',
            black: '#000000',
            gray: '#454545',
            'gray-light': '#c1c1c4',
            'gray-medium-light': '#F2F2F2;',
            'gray-extra-light': '#FAFAFE',
            'gray-input': '#BDBDBD',
            purple: '#80485B',
        },
        fontFamily: {
            body: ['Quicksand', 'sans-serif'],
        },
        extend: {
            borderRadius: {
                24: '24px',
                12: '12px',
            },
            width: {
                sidebar: '410px',
                '1/8': '12.5%',
                '7/8': '87.5%',
            },
        },
    },
}
