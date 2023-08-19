import { auth,db } from "./firebase.js";
import { collection,onSnapshot,query,where} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

function show(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
           const q = query(collection(db, "users"),where("uid","==",uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
            document.getElementById("uname").style.display="flex";
            document.getElementById("uname").innerHTML=change.doc.data().name;
            document.getElementById("login").style.display="none";
            document.getElementById("logout").style.display="block"
            localStorage.setItem("userId",uid)
            console.log(uid);
                });
            });
        } else {
        }
    });
}
show()    

document.getElementById("logout").addEventListener("click",()=>{
    signOut(auth).then(() => {
        location.replace('./pages/login.html');
      }).catch((error) => {
console.log(error);
    });
})