import {useTranslation} from "react-i18next";
import {Button, Form, Input, NumberInput, Select, SelectItem} from "@heroui/react";

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

const BillTabContent = () => {
    const { t } = useTranslation();

    return (
        <div className={"flex flex-col gap-2"}>
            <Form>
                <Input placeholder={t("Name")} label={t("Name")} isRequired={true}  />

                <NumberInput placeholder={t("BillNumber")}
                             label={t("BillNumber")}
                             isRequired={true}
                             hideStepper={true}
                             minLength={20}
                             maxLength={20}
                             description={t("BillNumberDescription")}
                             errorMessage={t("BillNumberDescription")}/>

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

                <NumberInput placeholder={t("Rate")} label={t("Rate")} isRequired={true} hideStepper={true} />

                <Input placeholder={t("BillHolder")} label={t("BillHolder")} isRequired={true} />

                <Button className={"self-stretch mt-8"} type={"submit"} color={"primary"}>{t("Save")}</Button>
            </Form>
        </div>
    );
};

export default BillTabContent;