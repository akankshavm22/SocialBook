import React, { useEffect, useState } from "react";
import styles from "./signup.module.css"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "firebase-config";
import { useRouter } from "next/router";
const Signup = () => {
    const router = useRouter();
    const [fullname, setfullname] = useState("");
    const [username, setUsername] = useState("");
    const [college, setCollege] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({})
    const [errorMsg, setErrorMsg] = useState("");
    const usersRef = collection(db, "users");
    const uq = query(usersRef, where("username", "==", username))

    const [error, setError] = useState(false);
    const handleFullNameChange = (event) => {
        setfullname(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleCollegeChange = (event) => {
        setCollege(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username != "" && fullname != "" && college != "" && password != "") {
            const userSnap = await getDocs(uq)
            if (userSnap.empty) {
                await addDoc(usersRef, {
                    "college": college,
                    "fullname": fullname,
                    "password": password,
                    "username": username,
                    "friends": [],
                    "requests": []
                }).then(() => {
                    setUser({
                        "college": college,
                        "fullname": fullname,
                        "password": password,
                        "username": username,
                        "friends": [],
                        "requests": []
                    })
                    localStorage.setItem("User", JSON.stringify({
                        "college": college,
                        "fullname": fullname,
                        "password": password,
                        "username": username,
                        "friends": [],
                        "requests": []
                    }));
                })
                router.push("/")
            } else {
                setErrorMsg("User Already Exists")
                setError(true)
            }
        } else {
            setErrorMsg("Some Fields are empty")
            setError(true)
        }


    };
    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem('User'))
        if (userExist) router.push("/")
    }, [])

    return (
        <div className={styles.signup}>
            <h1 className={styles.title}>Signup</h1>
            <form onSubmit={handleSubmit} className={styles.form}>

                <input
                    className={styles.in}
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={handleFullNameChange}
                />
                <br />

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
                    type="text"
                    placeholder="College Name"
                    value={college}
                    onChange={handleCollegeChange}
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
                }}> {errorMsg} </h3>}
                <br />
                <button type="submit"
                    className={styles.btn}
                    onClick={handleSubmit}
                >Create Account</button>
            </form>
        </div>
    );
};

export default Signup;