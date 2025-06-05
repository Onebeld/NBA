import * as React from "react";
import {useState} from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {Button, Input, Card, CardBody, CardHeader, CardFooter, Divider, Form} from "@heroui/react";
import {useAuth} from "../contexts/AuthContext";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard/home";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(username, password);
            navigate(from, {replace: true});
        } catch (err) {
            console.error(err);
            setError("Failed to log in. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="text-2xl font-bold text-primary justify-center">Sign In</CardHeader>
                {error && (
                    <div className="px-6 py-2 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <div className={"flex flex-col gap-3 w-full"}>
                            <Input className={"w-full"}
                                id="username"
                                label={"Username"}
                                placeholder={"Username"}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required/>

                            <Input
                                id="password"
                                label={"Password"}
                                placeholder={"Password"}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required/>
                        </div>

                        <Button className={"self-center w-1/2 mt-10"} variant={"solid"} color={"primary"} type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Form>
                </CardBody>
                <Divider/>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register"
                              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;