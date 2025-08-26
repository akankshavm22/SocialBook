import Layout from '@/Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import styles from "./not.module.css"
import { db } from '../../../firebase-config';
import {
    collection, getDocs, query, where, updateDoc, arrayUnion,
    addDoc,
    doc, arrayRemove
} from '@firebase/firestore';
import { MdDeleteOutline } from "react-icons/md"
import { TiTickOutline } from "react-icons/ti"
const Notifications = () => {
    const [render, setRender] = useState(false)
    const userRef = collection(db, "users");
    const msgRef = collection(db, "messages");
    const [appuser, setAppUser] = useState("");
    const [loading, setLoading] = useState(true)
    const [userdata, setUserData] = useState({})
    const Fetchdata = async (username) => {
        const uq = query(userRef, where("username", "==", username))
        const userSnap = await getDocs(uq);
        if (userSnap.empty) {

            localStorage.removeItem("User")
            router.push("/Auth/Login")
        } else {
            setLoading(true)
            userSnap.forEach(doc => {
                setUserData(doc.data())
            })
            setLoading(false)
            // console.log(userdata)
            // console.log(userdata.friends)
        }
    }
    const removefromReq = (user, requestedname) => {
        const uq = query(userRef, where("username", "==", user))
        setRender(true)
        getDocs(uq)
            .then((querySnapshot) => {
                querySnapshot.forEach((edoc) => {
                    console.log(edoc.id)
                    const docRef = doc(db, "users", edoc.id);
                    updateDoc(docRef, {
                        "requests": arrayRemove(requestedname)
                    });
                })
            })
        setRender(false)
    }
    const genChatId = async () => {
        var chatid = ""
        await addDoc(msgRef, {
            "chats": []
        }).then((docRef) => {
            chatid = docRef.id
        })
        return chatid

    }
    const addtoFriends = async (appuser, friend, chatid) => {

        const uq = query(userRef, where("username", "==", appuser))
        setRender(true)
        await getDocs(uq)
            .then((querySnapshot) => {
                querySnapshot.forEach((edoc) => {
                    console.log(edoc.id)
                    const docRef = doc(db, "users", edoc.id);
                    console.log(appuser, friend, chatid)
                    updateDoc(docRef, {
                        "friends": arrayUnion({
                            "chatid": chatid,
                            "username": friend
                        })
                    }).then(() => {
                        console.log("Document successfully updated!");
                    }).catch((error) => {
                        console.error("Error updating document: ", error);
                    });

                })
            });
        setRender(false)
    }


    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem('User'))
        if (userExist) {
            Fetchdata(userExist.username);
            setAppUser(userExist.username)
        } else {
            router.push("/Auth/Login")
        }


    }, [render])
    return (
        <Layout title={"Notifications"}>
            <div className={styles.base}>
                <div className={styles.head_cont}>
                    <h1>Friend Requests</h1>
                </div>

                {loading && <>Loading...</>}
                {!loading && userdata.requests.map((e, index) => {
                    return (
                        <div className={styles.notifcard} key={index}>
                            <div>@{e}</div>
                            <div className={styles.cont}>
                                <div className={styles.accept_icon}
                                    onClick={async () => {
                                        const chatid = await genChatId();
                                        console.log("Chat Id " + chatid)
                                        addtoFriends(e, appuser, chatid)
                                        addtoFriends(appuser, e, chatid)
                                        removefromReq(appuser, e)

                                    }}
                                >
                                    <TiTickOutline size={28}
                                        color='#fff' />
                                </div>
                                <div className={styles.delete_icon}
                                    onClick={() => {
                                        console.log(appuser, e)

                                        removefromReq(appuser, e)
                                    }}
                                >
                                    <MdDeleteOutline size={28}
                                        color='#fff' />

                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </Layout>
    )
}

export default Notifications