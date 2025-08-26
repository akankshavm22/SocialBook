import Layout from '@/Components/Layout/Layout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CiImageOn } from "react-icons/ci"
import { AiOutlineSend } from "react-icons/ai"
import styles from "./chats.module.css"
import Link from 'next/link'
import { BiExit } from "react-icons/bi"
import { db, storage } from 'firebase-config'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
const User = () => {
    const router = useRouter()
    const { user, cid } = router.query
    // const userRef = collection(db, "messages");
    const [loadedchats, setChats] = useState([])
    const [modal, setModal] = useState(false);
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0)
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("")
    const [rendersignal, setRendersignal] = useState(false)
    const handleChange = (event) => {
        setMessage(event.target.value);
        console.log(event.target.value)
    };
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const uploadImage = () => {
        if (typeof file == "string") {
            console.log("string")
        }
        else {
            const storageRef = ref(storage, `/files/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(percent)
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        sendMessage(url, true)
                    });
                    setModal(false)
                }
            );
        }
    }
    const fetchMessages = async () => {
        const docRef = doc(db, "messages", cid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setChats(docSnap.data().chats)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    const sendMessage = async (msg, islink) => {
        const docRef = doc(db, "messages", cid);
        setRendersignal(true)
        await updateDoc(docRef, {
            "chats": arrayUnion({
                "msg": msg,
                "sender": username,
                "islink": islink,
            })
        }).then(() => {
            console.log("Array updated successfully!");
        }).catch((error) => {
            console.log("Error updating array :", error);
        });
        setRendersignal(false)
    }

    useEffect(() => {
        if (!user || !cid) {
            return
        } else {
            // console.log(user + " " + cid)
            const userExist = JSON.parse(localStorage.getItem('User'))
            if (userExist) {
                setUsername(userExist.username)
                fetchMessages()
            } else {
                router.push("/login")
            }
        }
    }, [user, cid, rendersignal])
    return (
        <Layout title={user}>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.exit}
                        onClick={() => setModal(false)}>
                        <BiExit />
                    </div>
                    <input type='file' onChange={handleFileChange} />
                    <button
                        className={styles.uploadbtn}
                        onClick={uploadImage}
                    >Upload</button>
                    <div className={styles.progress_loader} id="splashLoader">
                        <div className={styles.progress}
                            style={{
                                "width": `${percent}%`
                            }}
                        ></div>
                    </div>
                </div>
            )}


            <div className={styles.head_cont}>
                <h1>{user}</h1>
            </div>
            <div className={styles.base}>
                <div className={styles.chats}>
                    {loadedchats.map(({ msg, sender, islink }, index) => {
                        return (
                            <div className={styles.chat}
                                key={index}
                                style={{
                                    justifyContent: sender == username ? "flex-end" : "flex-start",
                                }}>
                                {!islink && <p className={styles.text}
                                    style={{
                                        backgroundColor: "#3F7EDC",
                                        color: "white",
                                    }}
                                >{msg}</p>}
                                {islink && <Link
                                    href={msg}
                                    className={styles.text}
                                    style={{
                                        backgroundColor: "#3F7EDC",
                                        color: "white",
                                    }}
                                >{msg}</Link>}
                            </div>
                        );
                    })}
                </div>
                <div className={styles.controllers}>
                    <input className={styles.in} onChange={handleChange} />
                    <div>
                        <CiImageOn size={30} className={styles.icon}
                            onClick={() => setModal(true)}
                        />
                        <AiOutlineSend size={28} className={styles.icon}
                            onClick={() => sendMessage(message, false)}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default User