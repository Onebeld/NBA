import {Currency} from "../../entities/currency.ts";
import {Image} from "@heroui/react";
import {useTranslation} from "react-i18next";

interface CardItemProps {
    cardType: string;
    number: string;
    amount: number;
    currency: Currency;
    bank: string;
}

const CardItem = (props: CardItemProps) => {
    const {t} = useTranslation();

    return (
        <div className={"flex gap-2 items-center"}>
            <Image className={"w-[50px] h-[50px]"} src={"/images/card.png"} />

            <div className={"flex-1"}>
                <p className={"text-primary font-bold"}>{t(props.cardType)} {props.bank}</p>
                <p className={"text-primary-300 text-[14px]"}>{props.number.slice(-4)}</p>
            </div>

            <p className={"text-primary font-bold"}>{props.amount}{props.currency.symbol}</p>
        </div>
    );
};

export default CardItem;