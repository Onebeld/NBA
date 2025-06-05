import {
    Button,
    Form,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    NumberInput,
    Select,
    SelectItem
} from "@heroui/react";
import {useTranslation} from "react-i18next";
import * as React from "react";
import axios from "axios";
import {Organization} from "../entities/organization.ts";
import {TransactionTypeResponse} from "../entities/transaction.ts";
import {useEffect} from "react";
import {SelectBillsResponse} from "../entities/bills.ts";

const API_URL = 'http://' + window.location.host + '/api/v1/';

const operations = [
    {key: 0, value: "INCOME"},
    {key: 1, value: "EXPENSE"},
]

interface AddTransactionWindowProps {
    isOpen: boolean;
    onClose: () => void;
    updatePage: () => void;
}

const AddTransactionWindow = (props: AddTransactionWindowProps) => {
    const { t } = useTranslation();

    const [isOrganizationsLoading, setIsOrganizationsLoading] = React.useState(true);
    const [isTransactionTypesLoading, setIsTransactionTypesLoading] = React.useState(true);
    const [isBillsLoading, setIsBillsLoading] = React.useState(true);

    const [organizations, setOrganizations] = React.useState<Organization[]>([]);
    const [transactionTypes, setTransactionTypes] = React.useState<TransactionTypeResponse[]>([]);
    const [selectBillsResponse, setSelectBillsResponse] = React.useState<SelectBillsResponse | null>();

    const [billType, setBillType] = React.useState(new Set([]));

    const [amount, setAmount] = React.useState(0);
    const [organization, setOrganization] = React.useState(new Set([]));
    const [transactionType, setTransactionType] = React.useState(new Set([]));
    const [operation, setOperation] = React.useState(new Set([]));
    const [billId, setBillId] = React.useState(new Set([]));

    const [isLoading, setIsLoading] = React.useState(false);

    const getOrganizations = async () => {
        setIsOrganizationsLoading(true);

        axios.get(API_URL + "organization")
            .then((res) => {
                setIsOrganizationsLoading(false);
                setOrganizations(res.data);
            })
            .catch((err) => {
                console.error(err);
                return null;
            })
    };

    const getTransactionTypes = async () => {
        setIsTransactionTypesLoading(true);

        axios.get(API_URL + "transaction-type")
            .then((res) => {
                setIsTransactionTypesLoading(false);
                setTransactionTypes(res.data);
            })
            .catch((err) => {
                console.error(err);
                return null;
            })
    };

    const getSelectBills = async () => {
        setIsBillsLoading(true);

        axios.get(API_URL + "bills/all")
            .then((res) => {
                setIsBillsLoading(false);
                setSelectBillsResponse(res.data);
            })
            .catch((err) => {
                console.error(err);
                return null;
            })
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        axios.post(API_URL + "transactions/add", {
            amount,
            createdAt: Date.now(),
            organizationId: organization.values().next().value,
            billType: billType.values().next().value,
            cardId: billId.values().next().value,
            billId: billId.values().next().value,
            transactionTypeId: transactionType.values().next().value,
            operation: operation.values().next().value
        }, {
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
            })
    }

    useEffect(() => {
        getOrganizations();
        getTransactionTypes();
        getSelectBills();
    }, [])

    if (isOrganizationsLoading || isTransactionTypesLoading || isBillsLoading) {
        return ("");
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalContent>
                <ModalHeader>Добавить транзакцию</ModalHeader>

                <ModalBody>
                    <div className={"flex flex-col gap-2"}>
                        <Form onSubmit={handleSubmit}>
                            <Select label={"Операция"} placeholder={"Выберите операцию"} selectedKeys={operation} onSelectionChange={setOperation} isRequired={true}>
                                {operations.map((operation) => (
                                    <SelectItem key={operation.value}>{t(operation.value)}</SelectItem>
                                ))}
                            </Select>

                            <NumberInput placeholder={"Сумма"} label={"Сумма"} value={amount} onValueChange={setAmount} isRequired={true} hideStepper={true} />

                            <Select placeholder={"Организация"} label={"Организация"} selectedKeys={organization} onSelectionChange={setOrganization} isRequired={true}>
                                {organizations.map((organization) => (
                                    <SelectItem key={organization.id}>{organization.name}</SelectItem>
                                ))}
                            </Select>

                            <Select placeholder={"Выберите тип транзакции"} label={"Тип транзакции"} selectedKeys={transactionType} onSelectionChange={setTransactionType} isRequired={true}>
                                {transactionTypes.map((transactionType) => (
                                    <SelectItem key={transactionType.id}>{t(transactionType.name)}</SelectItem>
                                ))}
                            </Select>

                            <Select label={"Тип счета"} placeholder={"Выберите тип счета"} selectedKeys={billType} onSelectionChange={setBillType} isRequired={true}>
                                <SelectItem key={"BILL"}>{t("Bill")}</SelectItem>
                                <SelectItem key={"CARD"}>{t("Card")}</SelectItem>
                            </Select>

                            {selectBillsResponse && (
                                <Select label={"Счет"} placeholder={"Выберите счет"} selectedKeys={billId} onSelectionChange={setBillId} isRequired={true}>
                                    { billType.has("BILL") ?
                                        selectBillsResponse.bills.map((bill) => (
                                            <SelectItem key={bill.id}>{bill.name}</SelectItem>
                                        )) :
                                        selectBillsResponse.cards.map((card) => (
                                            <SelectItem key={card.id}>{card.bank}</SelectItem>
                                        ))
                                    }
                                </Select>
                            )}

                            <Button isLoading={isLoading} className={"self-stretch mt-8 mb-3"} type={"submit"} color={"primary"}>{t("Save")}</Button>
                        </Form>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddTransactionWindow;