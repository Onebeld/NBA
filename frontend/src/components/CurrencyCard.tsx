import {Card, CardBody} from "@heroui/react";
import {CardType} from "../enums/CyrrencyCardType.tsx";

interface CurrencyCardProps {
    title: string;
    value: number;
    currency: string;
    isSmall?: boolean;
    type?: CardType;
}

const CurrencyCard = ({title, value, currency, isSmall = false, type = CardType.ORDINARY}: CurrencyCardProps) => {
    const valueFormatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    const sizeClassNames = isSmall ? "w-[210px] h-[130px]" : "w-[300px] h-[160px]";
    const fontValueClassNames = isSmall ? "text-[22px]" : "text-[30px]";

    let valueClassNames;
    let valueSymbol;

    switch (type) {
        case CardType.INCOME:
            valueClassNames = "text-success";
            valueSymbol = "+";
            break;
        case CardType.EXPENSE:
            valueClassNames = "text-danger";
            valueSymbol = "-";
            break;
        case CardType.ORDINARY:
        default:
            valueClassNames = "text-primary-foreground";
            valueSymbol = "";
    }

    return (
        <Card className={sizeClassNames + " text-primary-foreground bg-primary rounded-[20px]"}>
            <CardBody>
                <p className={"font-medium"}>{title}</p>
                <p className={valueClassNames + " " + fontValueClassNames + " font-bold"}>{valueSymbol}<span>{currency}</span> {valueFormatted}</p>
            </CardBody>
        </Card>
    );
};

export default CurrencyCard;