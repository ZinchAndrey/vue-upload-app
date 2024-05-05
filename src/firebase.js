import { initializeApp } from 'firebase/app'
import { getStorage, ref as firebaseStorageRef, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyB3JTBkr63xmhaL9T_1qWxnMBX80fTdkMA',
  authDomain: 'vue-upload-app.firebaseapp.com',
  projectId: 'vue-upload-app',
  storageBucket: 'vue-upload-app.appspot.com',
  messagingSenderId: '125893390860',
  appId: '1:125893390860:web:e9e00fd64a28640e07f429'
}

// Инициализируем Firebase
const firebaseApp  = initializeApp(firebaseConfig)

// Экспортируем объект Firebase Storage
const storage = getStorage(firebaseApp)

export { storage, firebaseStorageRef, uploadBytes, firebaseApp as default }
