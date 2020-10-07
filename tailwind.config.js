module.exports = {
    purge: {
        enabled: true,
        content: ['./src/**/*.jsx', './src/**/*.tsx'],
    },
    variants: {
        margin: ['responsive', 'hover', 'focus'],
        opacity: ['responsive', 'hover', 'focus', 'group-hover'],
        translate: ['responsive', 'hover', 'focus', 'group-hover'],
        pointerEvents: ['responsive', 'hover', 'focus', 'group-hover'],
        borderColor: ['focus'],
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
            'gray-progress': '#E0E0E0',
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
                'sidebar-mobile': 'calc(100vw - 4rem)',
                sidebar: '410px',
                '1/8': '12.5%',
                '7/8': '87.5%',
            },
            boxShadow: {
                item: '0px 2px 12px rgba(0, 0, 0, 0.05);',
            },
            spacing: {
                71: '17.75rem',
            },
        },
    },
}
