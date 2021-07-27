module.exports = {
    purge: {
        options: {
            // Whitelisting some classes to avoid purge
            safelist: [
                'md:row-span-1',
                'md:row-span-2',
                'md:row-span-3',
                'md:row-span-4',
                'md:row-span-5',
                'md:row-span-6',
                'md:row-span-7',
                'md:row-span-8',
                'md:row-span-9',
                'md:row-span-10',
                'md:row-span-11',
                'md:row-span-12',
                'md:row-span-13',
                'md:row-span-14',
                'md:row-span-15',
                'md:row-span-16',
                'md:row-span-17',
                'md:row-span-18',
                'md:row-span-19',
                'md:row-span-20',
            ],
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                // orange: '#ff774f',
                // black: '#222222',
                // lightBlack: '#010101',
                // grey: '#7c7c7c',
            },
            gridRow: () => {
                let ret = {}
                for (let i = 1; i <= 20; i++) {
                    ret[`span-${i}`] = `span ${i} / span ${i}`
                }
                return ret
            },
        },
        spacing: () => {
            let ret = {}
            for (let i = 0; i <= 1000; i += 4) {
                ret[i / 4] = `${i / 16}rem`
            }
            for (let i = 1008; i <= 2000; i += 16) {
                ret[i / 4] = `${i / 16}rem`
            }
            return ret
        },
        fontSize: () => {
            let ret = {}
            for (let i = 0; i <= 132; i += 2) {
                ret[i / 4] = `${i / 16}rem`
            }
            return ret
        },
        lineHeight: () => {
            let ret = {}
            for (let i = 10; i <= 20; i++) {
                ret[i] = `${i / 10}`
            }
            return ret
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
