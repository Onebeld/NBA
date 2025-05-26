import {Switch} from "@heroui/react";
import * as React from "react";
import {useTranslation} from "react-i18next";

const DarkThemeChanger = () => {
    const { t } = useTranslation();

    const [isDarkTheme, setIsDarkTheme] = React.useState(() => {
        const theme = localStorage.getItem("theme");

        return theme === "dark";
    });

    React.useEffect(() => {
        const root = document.documentElement;

        if (isDarkTheme) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkTheme]);

    return (
        <div className={"flex"} style={{paddingLeft: "37px"}}>
            <p className={"flex-auto"}>{t("Customization.EnableDarkTheme")}</p>
            <Switch isSelected={isDarkTheme} onValueChange={setIsDarkTheme} />
        </div>
    );
}

export default DarkThemeChanger;