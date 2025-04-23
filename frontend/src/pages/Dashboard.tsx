import * as React from "react";
import {Link, Outlet} from "react-router-dom";

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen flex">
            <aside className={"z-40 w-24 h-screen bg-amber-900"}>
                <ul className={"m-4"}>
                    <li className={"my-4"}>
                        <Link to={"/dashboard"}>Home</Link>
                    </li>
                    <li className={"my-4"}>
                        <Link to={"/dashboard/bills"}>Bills</Link>
                    </li>
                    <li className={"my-4"}>
                        <Link to={"/dashboard/profile"}>Profile</Link>
                    </li>
                    <li className={"my-4"}>
                        <Link to={"/dashboard/analytics"}>Analytics</Link>
                    </li>
                </ul>
            </aside>
            <div className={"p-4"}>
                <div className={"m-4"}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;