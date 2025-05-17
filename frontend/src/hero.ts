import { heroui } from "@heroui/react";

export default heroui({
    defaultTheme: "light",
    themes: {
        "light": {
            colors: {
                primary:  {
                    "200": "#8994a9",
                    "300": "#5e6c89",
                    "foreground": "#fff",
                    "DEFAULT": "#071d49"
                },
                content1: "#CDD3E3",
                background: "#FDFDFD",
                foreground: "#000000",
                overlay: "#ffffff"
            }
        },
        "dark": {
            colors: {

            }
        }
    }
});