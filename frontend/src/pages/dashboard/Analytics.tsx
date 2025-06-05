import * as React from "react";
import {useTranslation} from "react-i18next";
import {Button, Tooltip, useDisclosure} from "@heroui/react";
import {Doughnut} from "react-chartjs-2";
import "chart.js/auto";
import AddTransactionWindow from "../../components/AddTransactionWindow.tsx";
import Loading from "../../components/Loading.tsx";
import axios from "axios";
import {useEffect, useRef} from "react";
import Transaction from "../../components/Transaction.tsx";
import {TransactionItem} from "../../entities/transaction.ts";
import {AnalyticResponse} from "../../entities/analytics.ts";

const API_URL = 'http://' + window.location.host + '/api/v1/';

const AddTransactionSvg = () => (
    <svg width="17" height="17" className={"fill-primary"} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8.5C0 9.00485 0.422424 9.41697 0.91697 9.41697H7.58303V16.083C7.58303 16.5776 7.99515 17 8.5 17C9.00485 17 9.42727 16.5776 9.42727 16.083V9.41697H16.083C16.5776 9.41697 17 9.00485 17 8.5C17 7.99515 16.5776 7.57273 16.083 7.57273H9.42727V0.91697C9.42727 0.422424 9.00485 0 8.5 0C7.99515 0 7.58303 0.422424 7.58303 0.91697V7.57273H0.91697C0.422424 7.57273 0 7.99515 0 8.5Z" />
    </svg>
);

/*const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 0,
        },
    ],
};*/

const Analytics: React.FC = () => {
    const { t } = useTranslation();

    const {isOpen, onOpen, onClose} = useDisclosure();

    const incomeDoughnut = useRef(null);
    const expenseDoughnut = useRef(null);

    const [transactions, setTransactions] = React.useState<TransactionItem[]>([]);
    const [analytic, setAnalytic] = React.useState<AnalyticResponse>();

    const [isTransactionsLoading, setIsTransactionsLoading] = React.useState(true);
    const [isAnalyticLoading, setIsAnalyticLoading] = React.useState(true);

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

    const getAnalytic = async () => {
        setIsAnalyticLoading(true);

        axios.get(API_URL + "analytics")
            .then((res) => {
                setIsAnalyticLoading(false);
                setAnalytic(res.data);
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }

    const updatePage = () => {
        getTransactions();
        getAnalytic();
    }

    const openAddTransactionWindow = () => {
        onOpen();
    }

    useEffect(() => {
        updatePage();
    }, []);

    if (isTransactionsLoading || isAnalyticLoading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <div className={"flex-col"}>
                <h1 className={"dashboard-title"}>{t("Analytics")}</h1>
            </div>

            <div className={"flex gap-5 justify-center items-center mt-20"}>
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-[18px] font-bold text-primary text-center"}>{t("Expense")}</h1>

                    <div className={"w-[100px] h-[3px] bg-primary self-center rounded-full"} />

                    <Doughnut ref={expenseDoughnut} className={"max-w-[250px] max-h-[250px]"} data={{
                        labels: analytic?.expense.labels.map((val) => t(val)),
                        datasets: [
                            {
                                label: 'Кол-во',
                                data: analytic?.expense.data,
                                borderWidth: 0,
                            },
                        ],
                    }} options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    }} />
                </div>


                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-[18px] font-bold text-primary text-center"}>{t("Income")}</h1>

                    <div className={"w-[100px] h-[3px] bg-primary self-center rounded-full"} />

                    <Doughnut ref={incomeDoughnut} className={"max-w-[250px] max-h-[250px]"} data={{
                        labels: analytic?.income.labels.map((val) => t(val)),
                        datasets: [
                            {
                                label: 'Кол-во',
                                data: analytic?.income.data,
                                borderWidth: 0,
                            },
                        ],
                    }} options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    }} />
                </div>
            </div>

            <div className={"flex gap-5 mt-20 min-h-[400px]"}>
                <div className={"flex-auto"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"text-[24px] font-bold text-primary"}>{t("Expense")}</h1>

                        <Tooltip content={t("AddBill")}>
                            <Button isIconOnly={true} variant={"light"} onPress={openAddTransactionWindow}>
                                <AddTransactionSvg />
                            </Button>
                        </Tooltip>
                    </div>

                    <div className={"flex flex-col gap-3"}>
                        {transactions.map((transaction) => (
                            transaction.operation === "EXPENSE" &&
                            <Transaction imageUrl={transaction.organization.icon_url} name={transaction.organization.name} extra={t(transaction.transactionType)} dateTime={transaction.dateTime} value={transaction.amount} currency={transaction.currency} type={transaction.operation} />
                        ))}
                    </div>
                </div>

                {/*Separator*/}
                <div className={"w-[3px] bg-primary-300 rounded-full"} />

                <div className={"flex-auto"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"text-[24px] font-bold text-primary"}>{t("Income")}</h1>

                        <Tooltip content={t("AddCard")}>
                            <Button isIconOnly={true} variant={"light"} onPress={openAddTransactionWindow}>
                                <AddTransactionSvg />
                            </Button>
                        </Tooltip>
                    </div>

                    <div className={"flex flex-col gap-3"}>
                        {transactions.map((transaction) => (
                            transaction.operation === "INCOME" &&
                            <Transaction imageUrl={transaction.organization.icon_url} name={transaction.organization.name} extra={t(transaction.transactionType)} dateTime={transaction.dateTime} value={transaction.amount} currency={transaction.currency} type={transaction.operation} />
                        ))}
                    </div>
                </div>
            </div>

            <AddTransactionWindow isOpen={isOpen} onClose={onClose} updatePage={updatePage} />
        </>
    );
};

export default Analytics;