import {useTranslation} from "react-i18next";
import {Button, Form, Input, NumberInput, Select, SelectItem} from "@heroui/react";
import {Bank} from "../../../entities/bank.ts";
import * as React from "react";
import axios from "axios";

const API_URL = 'http://' + window.location.host + '/api/v1/';

const cardTypes = [
    {key: "DEBIT", value: "Дебетовая"},
    {key: "CREDIT", value: "Кредит"}
]

interface CardTabContentProps {
    banks: Bank[];
    onClose: () => void;
    updatePage: () => void;
}

const CardTabContent = (props: CardTabContentProps) => {
    const { t } = useTranslation();

    const [number, setNumber] = React.useState("");
    const [initialBalance, setInitialBalance] = React.useState(0);
    const [cardType, setCardType] = React.useState(new Set([]));
    const [bank, setBank] = React.useState(new Set([]));
    const [cvv, setCvv] = React.useState("");
    const [expirationDate, setExpirationDate] = React.useState("");
    const [holder, setHolder] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        axios.post(API_URL + "bills/add/card", {
                number, initialBalance, cardType: cardType.values().next().value, bank: bank.values().next().value, cvv, expirationDate, holder
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
                <Select placeholder={t("SelectCardType")} label={t("CardType")} selectedKeys={cardType} onSelectionChange={setCardType} isRequired={true}>
                    {cardTypes.map((cardType) => (
                        <SelectItem key={cardType.key}>{cardType.value}</SelectItem>
                    ))}
                </Select>
                <Select placeholder={t("SelectBank")} label={t("Bank")} selectedKeys={bank} onSelectionChange={setBank} isRequired={true}>
                    {props.banks.map((bank) => (
                        <SelectItem key={bank.id}>{bank.name}</SelectItem>
                    ))}
                </Select>

                <NumberInput placeholder={t("Balance")} label={t("Balance")} value={initialBalance} onValueChange={setInitialBalance} isRequired={true} hideStepper={true} />

                <Input placeholder={t("BillHolder")} label={t("BillHolder")} value={holder} onValueChange={setHolder} isRequired={true} />

                <Input
                       placeholder={t("CardNumber")}
                       label={t("CardNumber")}
                       value={number}
                       onValueChange={setNumber}
                       isRequired={true}
                       maxLength={16} minLength={16} />

                <div className={"flex gap-2 w-full"}>
                    <Input value={expirationDate} onValueChange={setExpirationDate} placeholder={"00/00"} label={t("EndDate")} isRequired={true}  />

                    <Input value={cvv} onValueChange={setCvv} placeholder={"CVV"} label={"CVV"} isRequired={true} maxLength={3} minLength={3} />
                </div>

                <Button isLoading={isLoading} className={"self-stretch mt-8"} type={"submit"} color={"primary"}>{t("Save")}</Button>
            </Form>
        </div>
    );
};

export default CardTabContent;