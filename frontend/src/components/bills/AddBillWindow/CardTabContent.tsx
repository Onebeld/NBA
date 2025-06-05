import {useTranslation} from "react-i18next";
import {Button, Form, Input, NumberInput, Select, SelectItem} from "@heroui/react";

const cardTypes = [
    {key: "debet", value: "Дебетовая"},
    {key: "credit", value: "Кредит"}
]

const banks = [
    {key: "sber", value: "Сбербанк"},
    {key: "vtb", value: "ВТБ"},
    {key: "tinkoff", value: "Тинькофф"},
    {key: "alfabank", value: "Альфа-банк"},
    {key: "raiffeisen", value: "Райффайзенбанк"},
    {key: "gazprombank", value: "Газпромбанк"}
]

const currencies = [
    {key: "rub", value: "Рубли"},
    {key: "usd", value: "Доллары"},
    {key: "eur", value: "Евро"}
]

const CardTabContent = () => {
    const { t } = useTranslation();

    return (
        <div className={"flex flex-col gap-2"}>
            <Form>
                <Select placeholder={t("SelectCardType")} label={t("CardType")} isRequired={true}>
                    {cardTypes.map((cardType) => (
                        <SelectItem key={cardType.key}>{cardType.value}</SelectItem>
                    ))}
                </Select>
                <Select placeholder={t("SelectBank")} label={t("Bank")} isRequired={true}>
                    {banks.map((bank) => (
                        <SelectItem key={bank.key}>{bank.value}</SelectItem>
                    ))}
                </Select>
                <Select placeholder={t("SelectCurrency")} label={t("Currency")} isRequired={true}>
                    {currencies.map((currency) => (
                        <SelectItem key={currency.key}>{currency.value}</SelectItem>
                    ))}
                </Select>

                <NumberInput placeholder={t("Balance")} label={t("Balance")} isRequired={true} hideStepper={true} />

                <Input placeholder={t("BillHolder")} label={t("BillHolder")} isRequired={true} />

                <NumberInput
                       placeholder={t("CardNumber")}
                       label={t("CardNumber")}
                       isRequired={true}
                       formatOptions={{
                           useGrouping: false
                       }}
                       maxLength={16} minLength={16} hideStepper={true} />

                <div className={"flex gap-2 w-full"}>
                    <Input placeholder={"00/00"} label={t("EndDate")} isRequired={true}  />

                    <NumberInput placeholder={"CVV"} label={"CVV"} isRequired={true} hideStepper={true} maxLength={3} minLength={3} />
                </div>

                <Button className={"self-stretch mt-8"} type={"submit"} color={"primary"}>{t("Save")}</Button>
            </Form>
        </div>
    );
};

export default CardTabContent;