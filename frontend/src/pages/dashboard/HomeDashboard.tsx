import * as React from "react";
import {useTranslation} from "react-i18next";
import CurrencyCard from "../../components/CurrencyCard.tsx";
import {CardType} from "../../enums/CyrrencyCardType.tsx";
import CardTips from "../../components/home/CardTips.tsx";
import Transaction from "../../components/Transaction.tsx";
import { TransactionType } from "../../enums/TransactionType.tsx";
import {Button, Tooltip} from "@heroui/react";

const AddTransactionSvg = () => (
    <svg width="17" height="17" className={"fill-primary"} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8.5C0 9.00485 0.422424 9.41697 0.91697 9.41697H7.58303V16.083C7.58303 16.5776 7.99515 17 8.5 17C9.00485 17 9.42727 16.5776 9.42727 16.083V9.41697H16.083C16.5776 9.41697 17 9.00485 17 8.5C17 7.99515 16.5776 7.57273 16.083 7.57273H9.42727V0.91697C9.42727 0.422424 9.00485 0 8.5 0C7.99515 0 7.58303 0.422424 7.58303 0.91697V7.57273H0.91697C0.422424 7.57273 0 7.99515 0 8.5Z" />
    </svg>
);

const HomeDashboard: React.FC = () => {
    const { t } = useTranslation();

    // const transactions: TransactionType[] =

    return (
        <div className={"flex-col"}>
            <h1 className={"dashboard-title"}>{t("Home")}</h1>

            <div className={"flex gap-5 justify-center items-center mt-20"}>
                <CurrencyCard isSmall={true} title={t("Expense")} value={1000} currency={"$"} type={CardType.EXPENSE} description={t("Last30Days")} />
                <CurrencyCard title={t("Balance")} value={1000} currency={"$"} />
                <CurrencyCard isSmall={true} title={t("Income")} value={1000} currency={"$"} type={CardType.INCOME} description={t("Last30Days")} />
            </div>

            <CardTips className={"mt-10"} />

            <div className={"mt-10 w-full max-w-[1200px] justify-self-center"}>
                <div className={"flex justify-between mb-5"}>
                    <h1 className={"text-[24px] font-bold text-primary"}>{t("Transactions")}</h1>

                    <Tooltip content={t("AddTransaction")}>
                        <Button isIconOnly={true} variant={"light"}>
                            <AddTransactionSvg />
                        </Button>
                    </Tooltip>
                </div>

                <Transaction imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Hf2kHpmHq5TL8VG-Vi6PTWcVckCa3hWVRg&s"} dateTime={"25.05.2023 13:00"} name={"Пятерочка"} extra={"Оплата товаров и услуг"} value={1000} currency={"$"} type={TransactionType.EXPENSE} />
            </div>
        </div>
    );
};

export default HomeDashboard;