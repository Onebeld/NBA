import {Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs} from "@heroui/react";
import * as React from "react";
import BillTabContent from "./BillTabContent.tsx";
import {useTranslation} from "react-i18next";
import CardTabContent from "./CardTabContent.tsx";
import {useEffect} from "react";
import axios from "axios";

const API_URL = 'http://' + window.location.host + '/api/v1/';

interface AddBillWindowProps {
    isOpen: boolean;
    onClose: () => void;
    selected?: string;
    updatePage: () => void;
}

const AddBillWindow : React.FC<AddBillWindowProps> = (props: AddBillWindowProps) => {
    const [selected, setSelected] = React.useState(props.selected ?? "bill");

    const [banks, setBanks] = React.useState([]);
    const [isBanksLoading, setIsBanksLoading] = React.useState(true);

    const { t } = useTranslation();

    const getBanks = async () => {
        setIsBanksLoading(true);
        axios.get(API_URL + "bank")
            .then((res) => {
                setIsBanksLoading(false);
                setBanks(res.data);
            })
            .catch((err) => {
                console.error(err);
                return null;
            })
    };

    React.useEffect(() => {
        setSelected(props.selected ?? "bill");
    }, [props.selected]);

    useEffect(() => {
        getBanks();
    }, []);

    if (isBanksLoading) {
        return ("");
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalContent>
                <ModalHeader>{t("AddBill")}</ModalHeader>

                <ModalBody>
                    <Tabs fullWidth={true} selectedKey={selected} onSelectionChange={(key) => setSelected(key.toString())}>
                        <Tab key={"bill"} title={t("Bill")}>
                            <BillTabContent updatePage={props.updatePage} banks={banks} onClose={props.onClose} />
                        </Tab>
                        <Tab key={"card"} title={t("Card")}>
                            <CardTabContent updatePage={props.updatePage} banks={banks} onClose={props.onClose} />
                        </Tab>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddBillWindow;