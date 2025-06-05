interface BillItemProps {
    name: string;
    number: string;
    amount: number;
    currency: string;
    bank: string;
    rate: number;
}

const BillItem = (props: BillItemProps) => {

    return (
        <div className={"flex"}>
            <div className={"w-[50px]"} />

            <div>
                <p>{props.name} **{props.number.slice(-4)}</p>
                <p>{props.bank}</p>
            </div>

            <p>{props.amount.toFixed(2)}{props.currency}</p>

            <div>
                <p>{props.amount * (1 / props.rate)}</p>
                <p>{props.rate}%</p>
            </div>
        </div>
    );
};

export default BillItem;