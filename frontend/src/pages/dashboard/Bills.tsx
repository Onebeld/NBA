import * as React from "react";
import {useTranslation} from "react-i18next";
import CurrencyCard from "../../components/CurrencyCard.tsx";
import {Button, CircularProgress, Tooltip, useDisclosure} from "@heroui/react";
import AddBillWindow from "../../components/bills/AddBillWindow/AddBillWindow.tsx";
import axios from "axios";
import {useEffect} from "react";
import {BillResponse} from "../../services/bill.service.ts";
import BillItem from "../../components/bills/BillItem.tsx";
import CardItem from "../../components/bills/CardItem.tsx";
import Loading from "../../components/Loading.tsx";

const API_URL = 'http://' + window.location.host + '/api/v1/';

const AddSvg = () => (
    <svg width="17" height="17" className={"fill-primary"} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8.5C0 9.00485 0.422424 9.41697 0.91697 9.41697H7.58303V16.083C7.58303 16.5776 7.99515 17 8.5 17C9.00485 17 9.42727 16.5776 9.42727 16.083V9.41697H16.083C16.5776 9.41697 17 9.00485 17 8.5C17 7.99515 16.5776 7.57273 16.083 7.57273H9.42727V0.91697C9.42727 0.422424 9.00485 0 8.5 0C7.99515 0 7.58303 0.422424 7.58303 0.91697V7.57273H0.91697C0.422424 7.57273 0 7.99515 0 8.5Z" />
    </svg>
);

const Bills: React.FC = () => {
    const {t} = useTranslation();

    const [selectedTab, setSelectedTab] = React.useState("bill");
    const [billResponse, setBillResponse] = React.useState<BillResponse>();
    const [loading, setLoading] = React.useState(true);

    const {isOpen, onOpen, onClose} = useDisclosure();

    const updatePage = () => {
        getBills();
    }

    const getBills = async () => {
        setLoading(true);
        axios.get(API_URL + "bills")
            .then((res) => {
                setLoading(false);
                console.log(res.data);
                setBillResponse(res.data);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
                return null;
            })
    };

    useEffect(() => {
        getBills();
    }, []);

    const openBillWindow = () => {
        setSelectedTab("bill");

        onOpen();
    };

    const openCardWindow = () => {
        setSelectedTab("card");

        onOpen();
    };

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className={"flex-col"}>
                <h1 className={"dashboard-title"}>{t("Bills")}</h1>

                <div className={"flex gap-5 justify-center items-center mt-20"}>
                    <CurrencyCard title={t("Bills")} value={billResponse?.billsBalance} currency={billResponse?.currency} isSmall={true}/>
                    <CurrencyCard title={t("TotalBalance")} value={billResponse?.balance} currency={billResponse?.currency}/>
                    <CurrencyCard title={t("Cards")} value={billResponse?.cardsBalance} currency={billResponse?.currency} isSmall={true}/>
                </div>

                <div className={"flex gap-5 mt-20 min-h-[400px]"}>
                    {/*Bills*/}
                    <div className={"flex-auto h-full"}>
                        <div className={"flex justify-between"}>
                            <h1 className={"text-[24px] font-bold text-primary"}>{t("Bills")}</h1>

                            <Tooltip content={t("AddBill")}>
                                <Button isIconOnly={true} variant={"light"} onPress={openBillWindow}>
                                    <AddSvg/>
                                </Button>
                            </Tooltip>
                        </div>
                        <div className={"flex flex-col gap-3 min-h-[300px] mt-5"}>
                            {billResponse?.bills.map((bill) => (
                                <BillItem name={bill.name} number={bill.number} amount={bill.amount} currency={bill.currency} bank={bill.bank} rate={bill.rate} />
                            ))}
                        </div>
                    </div>

                    {/*Separator*/}
                    <div className={"w-[3px] bg-primary-300 rounded-full"}/>

                    {/*Cards*/}
                    <div className={"flex-auto"}>
                        <div className={"flex justify-between"}>
                            <h1 className={"text-[24px] font-bold text-primary"}>{t("Cards")}</h1>

                            <Tooltip content={t("AddCard")}>
                                <Button isIconOnly={true} variant={"light"} onPress={openCardWindow}>
                                    <AddSvg/>
                                </Button>
                            </Tooltip>
                        </div>
                        <div className={"flex flex-col gap-3 min-h-[300px] mt-5"}>
                            {billResponse?.cards.map((card) => (
                                <CardItem cardType={card.cardType} number={card.number} amount={card.amount} currency={card.currency} bank={card.bank} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AddBillWindow updatePage={updatePage} isOpen={isOpen} onClose={onClose} selected={selectedTab}/>
        </>
    );
}

export default Bills;