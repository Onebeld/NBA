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
                content1: "#e7edff",
                background: "#FDFDFD",
                foreground: "#000000",
                overlay: "#ffffff"
            }
        },
        "dark": {
            colors: {
                primary:  {
                    "200": "#9dabc5",
                    "300": "#6a7b9e",
                    "foreground": "#fff",
                    "DEFAULT": "#154297"
                },
                content1: "#1c1c1c",
                background: "#000000",
                foreground: "#ffffff",
                overlay: "#ffffff"
            }
        }
    }
});