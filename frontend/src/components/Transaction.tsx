import {TransactionType} from "../enums/TransactionType.tsx";
import {Image} from "@heroui/react";

interface TransactionProps {
    imageUrl: string;
    name: string;
    extra: string;
    dateTime: string;
    value: number;
    currency: string;
    type?: TransactionType;
}

const Transaction = ({ imageUrl, name, extra, dateTime, value, currency, type = TransactionType.INCOME }: TransactionProps) => {
    const valueFormatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return (
        <div className={"flex justify-between items-center mb-5"}>
            <div className={"flex"}>
                <Image className={"w-[48px] h-[48px] rounded-2xl"} src={imageUrl} alt={"Transaction image"} />
                <div className={"flex flex-col ml-2 justify-center"}>
                    <p className={"text-primary font-bold leading-none text-[14px]"}>{name}</p>
                    <p className={"text-primary-300 leading-none mt-1 text-[12px]"}>{extra}</p>
                </div>
            </div>
            <p className={"text-primary-300 text-[14px]"}>{dateTime}</p>
            <p className={(type === TransactionType.INCOME ? "text-success" : "text-danger") + " font-bold"}>{type === TransactionType.INCOME ? "+" : "-"}{currency} {valueFormatted}</p>
        </div>
    );
}

export default Transaction;