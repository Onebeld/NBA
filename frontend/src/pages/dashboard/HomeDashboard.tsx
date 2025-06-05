import * as React from "react";
import {useTranslation} from "react-i18next";
import CurrencyCard from "../../components/CurrencyCard.tsx";
import {CardType} from "../../enums/CyrrencyCardType.tsx";
import CardTips from "../../components/home/CardTips.tsx";
import Transaction from "../../components/Transaction.tsx";
import {Button, Tooltip, useDisclosure} from "@heroui/react";
import Loading from "../../components/Loading.tsx";
import {useEffect} from "react";
import {TransactionItem} from "../../entities/transaction.ts";
import AddTransactionWindow from "../../components/AddTransactionWindow.tsx";
import axios from "axios";
import {CardsInfoResponse} from "../../entities/cards.ts";

const API_URL = 'http://' + window.location.host + '/api/v1/';

const AddTransactionSvg = () => (
    <svg width="17" height="17" className={"fill-primary"} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8.5C0 9.00485 0.422424 9.41697 0.91697 9.41697H7.58303V16.083C7.58303 16.5776 7.99515 17 8.5 17C9.00485 17 9.42727 16.5776 9.42727 16.083V9.41697H16.083C16.5776 9.41697 17 9.00485 17 8.5C17 7.99515 16.5776 7.57273 16.083 7.57273H9.42727V0.91697C9.42727 0.422424 9.00485 0 8.5 0C7.99515 0 7.58303 0.422424 7.58303 0.91697V7.57273H0.91697C0.422424 7.57273 0 7.99515 0 8.5Z" />
    </svg>
);

const HomeDashboard: React.FC = () => {
    const { t } = useTranslation();

    const [isTransactionsLoading, setIsTransactionsLoading] = React.useState<boolean>(true);
    const [isCardLoading, setIsCardLoading] = React.useState<boolean>(true);

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [transactions, setTransactions] = React.useState<TransactionItem[]>([]);
    const [cardInfo, setCardInfo] = React.useState<CardsInfoResponse>();

    const getTransactions = async () => {
        setIsTransactionsLoading(true);

        axios.get(API_URL + "transactions")
            .then((res) => {
                setIsTransactionsLoading(false);
                setTransactions(res.data);
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }

    const getCardInfo = async () => {
        setIsCardLoading(false);

        axios.get(API_URL + "cards/info")
            .then((res) => {
                setIsCardLoading(false);
                setCardInfo(res.data);
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }

    const updatePage = () => {
        getTransactions();
        getCardInfo();
    }

    const openAddTransactionWindow = () => {
        onOpen();
    }

    useEffect(() => {
        updatePage();
    }, []);

    if (isTransactionsLoading || isCardLoading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <div className={"flex-col"}>
                <h1 className={"dashboard-title"}>{t("Home")}</h1>

                <div className={"flex gap-5 justify-center items-center mt-20"}>
                    <CurrencyCard isSmall={true} title={t("Expense")} value={cardInfo?.expense} currency={cardInfo?.currency} type={CardType.EXPENSE} />
                    <CurrencyCard title={t("Balance")} value={cardInfo?.balance} currency={cardInfo?.currency} />
                    <CurrencyCard isSmall={true} title={t("Income")} value={cardInfo?.income} currency={cardInfo?.currency} type={CardType.INCOME} />
                </div>

                <CardTips className={"mt-10"} />

                <div className={"mt-10 w-full max-w-[1200px] justify-self-center"}>
                    <div className={"flex justify-between mb-5"}>
                        <h1 className={"text-[24px] font-bold text-primary"}>{t("Transactions")}</h1>

                        <Tooltip content={t("AddTransaction")}>
                            <Button isIconOnly={true} variant={"light"} onPress={openAddTransactionWindow}>
                                <AddTransactionSvg />
                            </Button>
                        </Tooltip>
                    </div>

                    <div className={"flex flex-col gap-5"}>
                        {transactions.map((transaction) =>(
                            <Transaction imageUrl={transaction.organization.icon_url} name={transaction.organization.name} extra={t(transaction.transactionType)} dateTime={transaction.dateTime} value={transaction.amount} currency={transaction.currency} type={transaction.operation} />
                        ))}
                    </div>
                </div>
            </div>

            <AddTransactionWindow isOpen={isOpen} onClose={onClose} updatePage={updatePage} />
        </>

    );
};

export default HomeDashboard;