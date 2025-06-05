interface CardItemProps {
    cardType: string;
    number: string;
    amount: number;
    currency: string;
    bank: string;
}

const CardItem = (props: CardItemProps) => {
    return (
        <div className={"flex"}>
            <div className={"w-[50px]"} />

            <div>
                <p>{props.cardType} {props.bank}</p>
                <p>{props.number.slice(-4)}</p>
            </div>

            <div>
                <p>{props.amount}{props.currency}</p>
            </div>
        </div>
    );
};

export default CardItem;