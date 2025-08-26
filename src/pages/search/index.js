import Layout from '@/Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import styles from "./search.module.css"
import { BsSearch } from "react-icons/bs"
import { db } from 'firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Link from 'next/link'
const Search = () => {
    const router = useRouter();
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const userRef = collection(db, "users");
    const changeHandler = async (event) => {
        setName(event.target.value);
    }
    const getAndSetDocs = async () => {
        const userSnap = await getDocs(userRef)
        userSnap.forEach(doc => {
            setUsers(user => [...user, doc.data()])
        })
    }
    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem('User'))
        if (userExist) {
            setUsername(userExist.username)
        }
        getAndSetDocs();
    }, [])
    return (
        <Layout>
            <div className={styles.base}>
                <div className={styles.search_bar}>
                    <input className={styles.in}
                        onChange={changeHandler}
                        placeholder='Search Users'
                    />
                    <BsSearch size={25} />
                </div>
                <div className={styles.lister}>
                    {users.filter((item) => item.username != username)
                        .filter((item) => {
                            return name.toLowerCase() === ''
                                ? item
                                : item.username.toLowerCase().includes(name);
                        }).map((e, index) => {
                            return (<Link
                                key={index}
                                href={`/user/${e.username}`}
                                className={styles.card}
                            >@{e.username}</Link>)
                        })}
                </div>
            </div>
        </Layout>
    )
}

export default Search