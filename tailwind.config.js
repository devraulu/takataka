import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Recursive Variable"', ...defaultTheme.fontFamily.sans],
                mono: ['"Recursive Variable"', ...defaultTheme.fontFamily.mono],
            },
            animation: {
                blink: 'blink 1s ease-out infinite',
            },
            keyframes: {
                blink: {
                    '0%': { opacity: 0 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
            },
            strokeWidth: {
                3: '3px',
                4: '4px',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                background: 'oklch(var(--bg-color))',
                foreground: 'oklch(var(--main-color))',
                main: 'oklch(var(--main-color))',
                caret: 'oklch(var(--caret-color))',

                sub: 'oklch(var(--sub-color))',
                'sub-alt': 'oklch(var(--sub-alt-color))',

                text: 'oklch(var(--text-color))',

                error: 'oklch(var(--error-color))',
                'error-extra': 'oklch(var(--error-extra-color))',

                'colorful-error': 'oklch(var(--colorful-error-color))',
                'colorful-error-extra':
                    'oklch(var(--colorful-error-extra-color))',

                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))',
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted))',
                    foreground: 'oklch(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent))',
                    foreground: 'oklch(var(--accent-foreground))',
                },
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring))',
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))',
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
