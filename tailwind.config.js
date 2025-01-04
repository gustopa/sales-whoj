import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default ({
    darkMode: ["class"],
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js"
        
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Figtree',
                    ...defaultTheme.fontFamily.sans
                ]
    		},
    	}
    },
    plugins: [require("tailwindcss-animate")],
});



