import * as React from "react";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {Button, Input, Card, CardBody, CardHeader, CardFooter, Divider, Form} from "@heroui/react";
import {useAuth} from "../contexts/AuthContext";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await register(username, email, password, firstName, lastName, phone);
            navigate("/dashboard/home");
        } catch (err) {
            console.error(err);
            setError("Failed to create an account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="text-2xl font-bold text-primary justify-center">Create Account</CardHeader>
                {error && (
                    <div className="px-6 py-2 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <div className={"flex flex-col gap-3 w-full"}>
                            <Input
                                id="username"
                                type="text"
                                label={"Username"}
                                placeholder={"Username"}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required />

                            <Input
                                id="firstName"
                                type="text"
                                label={"First name"}
                                placeholder={"First name"}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required />

                            <Input
                                id="lastName"
                                type="text"
                                label={"Last name"}
                                placeholder={"Last name"}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required />

                            <Input
                                id="phone"
                                type="text"
                                label={"Phone"}
                                placeholder={"Phone"}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required />

                            <Input
                                id="email"
                                type="email"
                                label={"Email"}
                                placeholder={"Email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />

                            <Input
                                id="password"
                                type="password"
                                label={"Password"}
                                placeholder={"Password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={4} />

                            <Input
                                id="confirmPassword"
                                type="password"
                                label={"Confirm Password"}
                                placeholder={"Confirm Password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={4} />
                        </div>

                        <Button className={"mt-4 w-1/2 self-center"} type="submit" variant={"solid"} color={"primary"} disabled={loading}>
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                    </Form>
                </CardBody>
                <Divider/>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login"
                              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;