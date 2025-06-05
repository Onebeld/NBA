import {Card, CardBody} from "@heroui/react";
import {CardType} from "../enums/CyrrencyCardType.tsx";
import {Line} from "react-chartjs-2";
import {useEffect, useRef, useState} from "react";

interface CurrencyCardProps {
    title: string;
    value: number;
    currency: string;
    description?: string;
    isSmall?: boolean;
    type?: CardType;
}

const CurrencyCard = ({title, value, currency, isSmall = false, type = CardType.ORDINARY, description}: CurrencyCardProps) => {
    const chartRef = useRef(null);
    const [gradient, setGradient] = useState<string | CanvasGradient>("#000");

    const valueFormatted = value;

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

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;

        const ctx = (chart as any).ctx as CanvasRenderingContext2D;
        const width = (chart as any).width;

        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, '#3c354a');
        grad.addColorStop(1, '#4ffddf');

        setGradient(grad);
    }, []);

    const data = {
        labels: ['Янв', 'Фев', 'Мар', 'Апр'],
        datasets: [
            {
                data: [10, 20, 15, 30],
                borderColor: gradient,
                borderWidth: 2,
                fill: false,
                pointRadius: 0, // отключение отображения точек
                pointHoverRadius: 0,
            },
        ],
    };

    return (
        <Card className={sizeClassNames + " text-primary-foreground bg-primary rounded-[20px]"}>
            <CardBody className={"scrollbar-hide"}>
                <p className={"font-medium"}>{title} <span className={"text-primary-300 text-[12px]"}>{description}</span></p>
                <p className={valueClassNames + " " + fontValueClassNames + " font-bold"}>{valueSymbol}<span>{currency}</span> {valueFormatted}</p>

                <Line ref={chartRef} className={"max-h-[50px]"} data={data} options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        },
                    },
                    scales: {
                        x: {
                            display: false,
                            grid: {
                                display: false,
                            }
                        },
                        y: {
                            display: false,
                            grid: {
                                display: false,
                            }
                        }
                    },
                    elements: {
                        line: {
                            tension: 0.2
                        }
                    }
                }}/>
            </CardBody>
        </Card>
    );
};

export default CurrencyCard;