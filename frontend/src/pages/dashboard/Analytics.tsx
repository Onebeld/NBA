import * as React from "react";
import {useTranslation} from "react-i18next";
import {Button, Tooltip} from "@heroui/react";
import {Doughnut} from "react-chartjs-2";
import "chart.js/auto";

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 0,
        },
    ],
};

const Analytics: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={"flex-col"}>
                <h1 className={"dashboard-title"}>{t("Analytics")}</h1>
            </div>

            <div className={"flex gap-5 justify-center items-center mt-20"}>
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-[18px] font-bold text-primary text-center"}>{t("Expense")}</h1>

                    <div className={"w-[100px] h-[3px] bg-primary self-center rounded-full"} />

                    <Doughnut className={"max-w-[250px] max-h-[250px]"} data={data} options={{
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

                    <Doughnut className={"max-w-[250px] max-h-[250px]"} data={data} options={{
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
                            <Button isIconOnly={true} variant={"light"}>
                            </Button>
                        </Tooltip>
                    </div>
                    <div>

                    </div>
                </div>

                {/*Separator*/}
                <div className={"w-[3px] bg-primary-300 rounded-full"} />

                <div className={"flex-auto"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"text-[24px] font-bold text-primary"}>{t("Income")}</h1>

                        <Tooltip content={t("AddCard")}>
                            <Button isIconOnly={true} variant={"light"}>
                            </Button>
                        </Tooltip>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;