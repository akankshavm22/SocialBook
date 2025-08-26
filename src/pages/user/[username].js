import Layout from '@/Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config';
import { collection, getDocs, query, where, updateDoc, arrayUnion, doc } from '@firebase/firestore';
import styles from "./user.module.css"
import { useRouter } from 'next/router';
import Image from 'next/image';
const Username = () => {
    const router = useRouter();
    const { username } = router.query;
    const [rendersignal, setRendersignal] = useState(false)
    const [user, setUser] = useState({});
    const [isrequest, setIsrequest] = useState(false)
    const [isfriend, setIsfriend] = useState(false)
    const [sluguser, setSlugUser] = useState("")
    const [supper, setSupper] = useState("");
    const userRef = collection(db, "users");
    // Fetch the required data using the get() method
    const Fetchdata = async (slug) => {
        // console.log(slug)
        setRendersignal(true)
        const uq = query(userRef, where("username", "==", slug))
        const userSnap = await getDocs(uq)
        if (userSnap.empty) {
            router.push("/")
        } else {
            userSnap.forEach(doc => {
                setUser(doc.data())
                doc.data().friends.filter(e => e.username == supper ? setIsfriend(true) : setIsfriend(false))
                doc.data().requests.filter(e => e == supper ? setIsrequest(true) : setIsrequest(false))
                console.log("hola")
                console.log(isfriend)
                console.log(isrequest)
            })
        }
    }
    const updateData = async (slug) => {
        const uq = query(userRef, where("username", "==", slug))
        setRendersignal(true)
        getDocs(uq)
            .then((querySnapshot) => {
                querySnapshot.forEach((edoc) => {
                    // console.log(edoc.id)

                    const docRef = doc(db, "users", edoc.id);
                    updateDoc(docRef, {
                        "requests": arrayUnion(supper)
                    }).then(() => {
                        setIsrequest(true)
                        console.log("Document successfully updated!");
                    }).catch((error) => {
                        console.error("Error updating document: ", error);
                    });

                })
            });
        setRendersignal(false)

    }
    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem('User'))
        if (userExist) {
            setSupper(userExist.username)
            if (!username) {
                return
            } else {
                // console.log(username)
                setSlugUser(username)
                Fetchdata(username);
                console.log(user.username)
            }
            // console.log(username)
        } else {
            router.push("/Auth/Login")
        }
    }, [username, rendersignal]);
    return (
        <Layout>
            <div className={styles.profile}>
                <div className={styles.userd}>
                    <div className={styles.profile_image}>
                        {user.image && <Image src={user.image}
                            width={100}
                            height={100}
                            className={styles.profile_image_pro} />}
                        {!user.image && <h1>{sluguser.charAt(0).toUpperCase()}</h1>}
                    </div>
                    <div className={styles.details}>
                        <div className={styles.details_bar}>
                            <h1>@{user.username}</h1>
                        </div>
                        <div className={styles.details_bar}>
                            <h1>{user.fullname}</h1>
                        </div>
                        <div className={styles.details_bar}>
                            <h1>{user.college}</h1>
                        </div>

                    </div>
                </div>
                <div className={styles.btn}>
                    {
                        (!isrequest && !isfriend) && <button className={styles.btn_in}
                            onClick={() => updateData(sluguser)}
                        >
                            Send Request
                        </button>
                    }
                    {isrequest && <button className={styles.btn_in}>
                        Request Sent
                    </button>

                    }
                    {isfriend && <button className={styles.btn_in}>
                        Friends
                    </button>
                    }
                </div>
                {/* <div className={styles.btn}>

                </div> */}

            </div>
        </Layout >
    )
}

export default Username