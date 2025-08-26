import Layout from '@/Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../firebase-config';
import { collection, getDocs, query, where, updateDoc } from '@firebase/firestore';
import styles from "./profile.module.css"
import { useRouter } from 'next/router';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { BiExit } from "react-icons/bi"
import Image from 'next/image';
import Link from 'next/link';
import { BsChatLeft } from "react-icons/bs"
const Profile = () => {
    const router = useRouter();
    const userRef = collection(db, "users");
    const [file, setFile] = useState("");
    const [image, setImage] = useState(false);
    const [percent, setPercent] = useState(0)
    const [modal, setModal] = useState(false);
    const [friends, setFriends] = useState(["s"]);
    const [fullname, setfullname] = useState("");
    const [username, setUsername] = useState("");
    const [college, setCollege] = useState("");
    const [userdata, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const Fetchdata = async (username) => {
        const uq = query(userRef, where("username", "==", username))
        const userSnap = await getDocs(uq);
        // console.log("gjhghjhkh")
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

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    }
    const uploadImage = () => {

        if (typeof file == "string") { }
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
                    // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                        console.log(url);
                        const uq = query(userRef, where("username", "==", username))
                        const userSnap = await getDocs(uq);
                        userSnap.forEach(async (doc) => {
                            await updateDoc(doc.ref, {
                                image: url
                            })
                        })

                    });
                    setModal(false)
                }
            );
        }
    }
    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem('User'))
        if (userExist) {
            Fetchdata(userExist.username);
            setfullname(userExist.fullname)
            setCollege(userExist.college)
            setUsername(userExist.username)
        } else {
            router.push("/Auth/Login")
        }
    }, []);
    return (
        <Layout>
            {modal && (
                <div className={styles.modal}>
                    <div className={styles.exit}
                        onClick={() => setModal(false)}
                    >
                        <BiExit />
                    </div>
                    <input type='file' onChange={handleChange} />
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
            <div className={styles.profile}>
                <div className={styles.userd}>
                    <div className={styles.profile_image} onClick={() => setModal(true)}>
                        {userdata.image && <Image src={userdata.image}
                            width={100}
                            height={100}

                            className={styles.profile_image_pro} />}
                        {!userdata.image && <h1>{fullname.charAt(0).toUpperCase()}</h1>}
                    </div>
                    <div className={styles.details}>
                        <div className={styles.details_bar}>
                            <h1>@{username}</h1>
                        </div>
                        <div className={styles.details_bar}>
                            <h1>{fullname}</h1>
                        </div>
                        <div className={styles.details_bar}>
                            <h1>{college}</h1>
                        </div>

                    </div>
                </div>
                <div className={styles.posts}>
                    <div className={styles.head}>
                        <h1>Friends</h1>
                    </div>
                    <div className={styles.posts}>
                        {loading && <>Loading...</>}
                        {!loading && userdata.friends.map((e, index) => {
                            return (
                                <div className={styles.blogcard} key={index}>
                                    <h2>{e.username}</h2>
                                    <Link href={`Chats/${e.username}?cid=${e.chatid}`} className={styles.chatbtn}>
                                        <BsChatLeft size={20} />
                                    </Link>

                                </div>
                            )
                        })
                        }


                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Profile