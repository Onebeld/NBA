import * as React from "react";
import {useTranslation} from "react-i18next";
import {Accordion, AccordionItem, Avatar, Switch} from "@heroui/react";

const Profile: React.FC = () => {
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
        <div className={"flex-col"}>
            <h1 className={"dashboard-title"}>{t("Profile")}</h1>

            <Avatar className={"w-[220px] h-[220px] m-5 justify-self-center"} />

            <p className={"text-center text-[20px] font-bold text-primary"}>Иванов Иван Иванович</p>
            <p className={"text-center text-[18px] text-primary-300"}>@<span>ivanovivan</span></p>

            <div className={"max-w-[720px] w-[100%] justify-self-center"} style={{marginTop: "60px"}}>
                <Accordion className={"self-center"}>
                    <AccordionItem title={t("Customization")}
                                   startContent={
                                       <svg className={"fill-primary"} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path opacity="0.4" d="M18.67 2H16.77C14.59 2 13.44 3.15 13.44 5.33V7.23C13.44 9.41 14.59 10.56 16.77 10.56H18.67C20.85 10.56 22 9.41 22 7.23V5.33C22 3.15 20.85 2 18.67 2Z" />
                                           <path opacity="0.4" d="M7.24 13.43H5.34C3.15 13.43 2 14.58 2 16.76V18.66C2 20.85 3.15 22 5.33 22H7.23C9.41 22 10.56 20.85 10.56 18.67V16.77C10.57 14.58 9.42 13.43 7.24 13.43Z" />
                                           <path d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z" />
                                           <path d="M17.71 22C20.0793 22 22 20.0793 22 17.71C22 15.3407 20.0793 13.42 17.71 13.42C15.3407 13.42 13.42 15.3407 13.42 17.71C13.42 20.0793 15.3407 22 17.71 22Z" />
                                       </svg>
                                   }>
                        <div className={"flex"} style={{paddingLeft: "37px"}}>
                            <p className={"flex-auto"}>{t("EnableDarkTheme")}</p>
                            <Switch isSelected={isDarkTheme} onValueChange={setIsDarkTheme} />
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default Profile;