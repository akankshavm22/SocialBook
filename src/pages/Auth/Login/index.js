import React, { useEffect, useState } from "react";
import styles from "./login.module.css"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-config";
import { Router, useRouter } from "next/router";
const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({})
    const [error, setError] = useState(false);
    const userRef = collection(db, "users");
    const uq = query(userRef, where("username", "==", username), where("password", "==", password))
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userSnap = await getDocs(uq)
        if (userSnap.empty) {
            console.log("not found")
            setError(true)
        } else {
            userSnap.forEach(doc => {
                setUser(doc.data())
                console.log(doc.data())
                localStorage.setItem("User", JSON.stringify(doc.data()));
            })
        }
    };
    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem('User'))
        if (userExist) {
            router.push("/")
        }
    })
    return (
        <div className={styles.loginpage}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    className={styles.in}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <br />
                <input
                    className={styles.in}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br />
                {error && <h3 style={{
                    "color": "red"
                }}> User Does not exists </h3>}
                <br />

                <button type="submit"
                    className={styles.btn}
                >Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;