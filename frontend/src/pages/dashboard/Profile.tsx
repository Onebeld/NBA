import * as React from "react";
import {useTranslation} from "react-i18next";
import ProfileForm from "../../components/profile/ProfileForm.tsx";
import DarkThemeChanger from "../../components/profile/DarkThemeChanger.tsx";
import {
    Accordion,
    AccordionItem,
    Avatar,
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@heroui/react";
import {useAuth} from "../../contexts/AuthContext.tsx";

const ProfileSettingsSvg: React.FC = () => {
    return (
        <svg className={"fill-primary"} width="32" height="32" viewBox="0 0 32 32" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M16 29.3467C23.3638 29.3467 29.3334 23.3771 29.3334 16.0133C29.3334 8.64953 23.3638 2.67999 16 2.67999C8.63622 2.67999 2.66669 8.64953 2.66669 16.0133C2.66669 23.3771 8.63622 29.3467 16 29.3467Z"/>
            <path d="M16 9.25336C13.24 9.25336 11 11.4934 11 14.2534C11 16.96 13.12 19.16 15.9333 19.24C15.9733 19.24 16.0267 19.24 16.0533 19.24C16.08 19.24 16.12 19.24 16.1467 19.24C16.16 19.24 16.1733 19.24 16.1733 19.24C18.8667 19.1467 20.9867 16.96 21 14.2534C21 11.4934 18.76 9.25336 16 9.25336Z"/>
            <path d="M25.04 25.8133C22.6667 28 19.4934 29.3467 16 29.3467C12.5067 29.3467 9.33336 28 6.96002 25.8133C7.28002 24.6 8.14669 23.4933 9.41336 22.64C13.0534 20.2133 18.9734 20.2133 22.5867 22.64C23.8667 23.4933 24.72 24.6 25.04 25.8133Z"/>
        </svg>
    );
};

const PersonalisationSvg: React.FC = () => {
    return (
        <svg className={"fill-primary"} width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M18.67 2H16.77C14.59 2 13.44 3.15 13.44 5.33V7.23C13.44 9.41 14.59 10.56 16.77 10.56H18.67C20.85 10.56 22 9.41 22 7.23V5.33C22 3.15 20.85 2 18.67 2Z"/>
            <path opacity="0.4" d="M7.24 13.43H5.34C3.15 13.43 2 14.58 2 16.76V18.66C2 20.85 3.15 22 5.33 22H7.23C9.41 22 10.56 20.85 10.56 18.67V16.77C10.57 14.58 9.42 13.43 7.24 13.43Z"/>
            <path d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z"/>
            <path d="M17.71 22C20.0793 22 22 20.0793 22 17.71C22 15.3407 20.0793 13.42 17.71 13.42C15.3407 13.42 13.42 15.3407 13.42 17.71C13.42 20.0793 15.3407 22 17.71 22Z"/>
        </svg>
    );
};

const LogoutSvg: React.FC = () => {
    return (
        <svg className={"fill-danger"} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9498 25.8203C16.1306 25.8203 16.3918 25.75 16.6529 25.6194C22.4085 22.6562 24.317 21.0993 24.317 17.4933V10.0301C24.317 8.84487 23.8549 8.41295 22.8605 8.00112C21.7556 7.53906 18.0793 6.2433 17.0045 5.8817C16.673 5.78125 16.3014 5.71094 15.9498 5.71094C15.6083 5.71094 15.2366 5.78125 14.9052 5.8817C13.8203 6.22321 10.144 7.54911 9.04912 8.00112C8.0547 8.4029 7.59265 8.84487 7.59265 10.0301V17.4933C7.59265 21.0993 9.58149 22.5156 15.2567 25.6194C15.5179 25.76 15.779 25.8203 15.9498 25.8203ZM12.2132 19.2511V15.1931C12.2132 14.4799 12.5045 14.1083 13.0871 14.048V12.8828C13.0871 10.9643 14.2522 9.66853 15.9498 9.66853C17.6574 9.66853 18.8226 10.9643 18.8226 12.8828V14.048C19.4052 14.1083 19.6964 14.4799 19.6964 15.1931V19.2511C19.6964 20.0547 19.3348 20.4163 18.6016 20.4163H13.3081C12.5748 20.4163 12.2132 20.0547 12.2132 19.2511ZM14.3326 14.0279H17.577V12.7723C17.577 11.6272 16.9241 10.8739 15.9498 10.8739C14.9755 10.8739 14.3326 11.6373 14.3326 12.7723V14.0279Z"/>
        </svg>
    );
};

const Profile: React.FC = () => {
    const {t} = useTranslation();
    const {user, logout} = useAuth();

    const {isOpen, onOpen, onClose} = useDisclosure();

    if (!user) {
        return null;
    }

    const logOutMessage = () => {
        onOpen();
    };

    const logOut = () => {
        onClose();

        logout();
    };

    return (
        <>
            <div className={"flex-col"}>
                <h1 className={"dashboard-title"}>{t("Profile")}</h1>

                <Avatar className={"w-[220px] h-[220px] m-5 justify-self-center"}/>

                <p id={"profile-name"} className={"text-center text-[20px] font-bold text-primary"}>{user.firstName} {user.lastName}</p>
                <p className={"text-center text-[18px] text-primary-300"}>@<span id={"profile-username"}>{user.username}</span></p>

                <div className={"max-w-[720px] w-[100%] justify-self-center"} style={{marginTop: "60px"}}>
                    <Accordion className={"self-center"} showDivider={false}>
                        <AccordionItem title={t("ProfileSetting")}
                                       startContent={<ProfileSettingsSvg/>}>
                            <ProfileForm/>
                        </AccordionItem>
                        <AccordionItem title={t("Customization")}
                                       startContent={<PersonalisationSvg/>}>
                            <DarkThemeChanger/>
                        </AccordionItem>
                    </Accordion>

                    <Button fullWidth={true}
                            style={{marginTop: "50px"}}
                            className={"justify-start px-1"}
                            variant={"light"}
                            color={"danger"}
                            onPress={logOutMessage}
                            startContent={<LogoutSvg/>}>
                        {t("LogOut")}
                    </Button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>{t("LogOutMessage")}</ModalHeader>
                            <ModalFooter>
                                <Button color={"danger"} variant={"light"} onPress={logOut}>
                                    {t("Yes")}
                                </Button>
                                <Button color={"primary"} onPress={onClose}>
                                    {t("No")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Profile;