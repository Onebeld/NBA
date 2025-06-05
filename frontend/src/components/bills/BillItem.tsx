import {Image} from "@heroui/react";
import {Currency} from "../../entities/currency.ts";

interface BillItemProps {
    name: string;
    number: string;
    amount: number;
    currency: Currency;
    bank: string;
    rate: number;
}

const BillItem = (props: BillItemProps) => {

    return (
        <div className={"flex gap-2 items-center"}>
            <Image className={"w-[50px] h-[50px]"} src={"/images/safe.png"} />

            <div className={"flex-1/10"}>
                <p className={"text-primary font-bold"}>{props.name} ••{props.number.slice(-4)}</p>
                <p className={"text-primary-300"}>{props.bank}</p>
            </div>

            <p className={"flex-1 text-primary-300 text-[14px]"}>{props.amount.toFixed(2)}{props.currency.symbol}</p>

            <div className={"text-right"}>
                <p className={"text-primary font-bold"}>{props.amount * (1 / props.rate)}{props.currency.symbol}</p>
                <p className={"text-primary-300"}>{props.rate}%</p>
            </div>
        </div>
    );
};

export default BillItem;