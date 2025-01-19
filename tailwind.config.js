import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                // display: ['Badeen Display', 'system-ui', 'ui-serif'],
                sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
                mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
                logo: ['"Montserrat Alternates"', 'system-ui'],
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
                background: 'rgb(var(--bg-color))',
                foreground: 'rgb(var(--main-color))',
                main: 'rgb(var(--main-color))',
                caret: 'rgb(var(--caret-color))',

                sub: 'rgb(var(--sub-color))',
                'sub-alt': 'rgb(var(--sub-alt-color))',

                text: 'rgb(var(--text-color))',

                error: 'rgb(var(--error-color))',
                'error-extra': 'rgb(var(--error-extra-color))',

                'colorful-error': 'rgb(var(--colorful-error-color))',
                'colorful-error-extra':
                    'rgb(var(--colorful-error-extra-color))',

                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
