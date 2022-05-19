
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import { ServiceAccount } from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
})

export default admin;