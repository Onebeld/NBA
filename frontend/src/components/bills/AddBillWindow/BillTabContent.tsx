import {useTranslation} from "react-i18next";
import {Button, Form, Input, NumberInput, Select, SelectItem} from "@heroui/react";
import * as React from "react";
import {Bank} from "../../../entities/bank.ts";
import axios from "axios";

const API_URL = 'http://' + window.location.host + '/api/v1/';

interface BillTabContentProps {
    banks: Bank[];
    onClose: () => void;
    updatePage: () => void;
}

const BillTabContent = (props: BillTabContentProps) => {
    const { t } = useTranslation();

    const [name, setName] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [bank, setBank] = React.useState(new Set([]));
    const [initialBalance, setInitialBalance] = React.useState(0);
    const [rate, setRate] = React.useState(0);
    const [holder, setHolder] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        axios.post(API_URL + "bills/add/bill", {
            name, number, bank: bank.values().next().value, initialBalance, rate, holder
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            .then(() => {
                setIsLoading(false);
                props.onClose();

                props.updatePage();
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }

    return (
        <div className={"flex flex-col gap-2"}>
            <Form onSubmit={handleSubmit}>
                <Input placeholder={t("Name")} label={t("Name")} value={name} onValueChange={setName} isRequired={true}  />

                <Input placeholder={t("BillNumber")}
                             label={t("BillNumber")}
                             isRequired={true}
                             value={number}
                             onValueChange={setNumber}
                             minLength={20}
                             maxLength={20}
                             description={t("BillNumberDescription")}
                             errorMessage={t("BillNumberDescription")}/>

                <Select placeholder={t("SelectBank")} label={t("Bank")} selectedKeys={bank} onSelectionChange={setBank} isRequired={true}>
                    {props.banks.map((bank) => (
                        <SelectItem key={bank.id}>{bank.name}</SelectItem>
                    ))}
                </Select>

                <NumberInput placeholder={t("Balance")} label={t("Balance")} value={initialBalance} onValueChange={setInitialBalance} isRequired={true} hideStepper={true} />

                <NumberInput placeholder={t("Rate")} label={t("Rate")} value={rate} onValueChange={setRate} isRequired={true} hideStepper={true} />

                <Input placeholder={t("BillHolder")} label={t("BillHolder")} value={holder} onValueChange={setHolder} isRequired={true} />

                <Button isLoading={isLoading} className={"self-stretch mt-8"} type={"submit"} color={"primary"}>{t("Save")}</Button>
            </Form>
        </div>
    );
};

export default BillTabContent;