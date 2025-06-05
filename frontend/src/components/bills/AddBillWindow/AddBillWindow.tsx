import {Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs} from "@heroui/react";
import * as React from "react";
import BillTabContent from "./BillTabContent.tsx";
import {useTranslation} from "react-i18next";
import CardTabContent from "./CardTabContent.tsx";

interface AddBillWindowProps {
    isOpen: boolean;
    onClose: () => void;
    selected?: string;
}

const AddBillWindow : React.FC<AddBillWindowProps> = (props: AddBillWindowProps) => {
    const [selected, setSelected] = React.useState(props.selected ?? "bill");

    const { t } = useTranslation();

    React.useEffect(() => {
        setSelected(props.selected ?? "bill");
    }, [props.selected]);



    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalContent>
                <ModalHeader>{t("AddBill")}</ModalHeader>

                <ModalBody>
                    <Tabs fullWidth={true} selectedKey={selected} onSelectionChange={(key) => setSelected(key.toString())}>
                        <Tab key={"bill"} title={t("Bill")}>
                            <BillTabContent />
                        </Tab>
                        <Tab key={"card"} title={t("Card")}>
                            <CardTabContent />
                        </Tab>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddBillWindow;