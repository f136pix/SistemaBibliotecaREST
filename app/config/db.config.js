const { getFirestore} = require('firebase-admin/firestore');
const { initializeApp: initializeAdminApp, cert } = require('firebase-admin/app');
const { initializeApp: initializeWebApp } = require('firebase/app');
const { getAuth } = require("firebase/auth");


const firebaseConfig = {
  apiKey: "AIzaSyB--oT3erJR37cgJzoRq-nKaVaRcEOn08U",
  authDomain: "sistema-biblioteca-f7b97.firebaseapp.com",
  projectId: "sistema-biblioteca-f7b97",
  storageBucket: "sistema-biblioteca-f7b97.appspot.com",
  messagingSenderId: "332984970073",
  appId: "1:332984970073:web:47aa679b89b66522d2ba48",
  measurementId: "G-W17Y50K70V"
};

// inicializando o webapp (ultilizado para auth)
const firebaseWebApp = initializeWebApp(firebaseConfig, 'web-app');

// auth firebase adm
const auth = getAuth(firebaseWebApp);


module.exports = firebaseWebApp;


  // inicializando o sdk com a service key    
  const admin = initializeAdminApp({
    credential: cert({
      "type": "service_account",
      "project_id": "sistema-biblioteca-f7b97",
      "private_key_id": "fbe56110a77de3c783bf77a9ceaeaf8a84ea79a9",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCIShVPgIiLtJBD\n9OcxvcBf9cLHm4j2kAeSQVbRNQ7QRwH1N+WmQ+AB7FJy3KKu6RA0LcOY8YEvZhqo\ntdrsATySIjLeBblsW2ppn9klOQaN+K7+21POfQwc4TYyknaCB4+Ks8PAdF4B240U\ngcSCoKioZ8OnWTamupLMfyLjwb9rQYTfxcMYRmAWeGhzJ4ecJfWeXchqxOoyKT7F\nT5OpHYMoSzOWpEbGNOkyEWNPnPvP2dT71nmX64Yh24N1ngHjety3KUfmhJKrrcHW\ns1Rqc3H69JqpRJ+V4+Y8QvIAeXBGfakTa9qxDSMCDOGCurXsuIVURh/fu//JeZS2\nVxxvI7/1AgMBAAECggEAIZDjXjz5BDVgiYgdz6Oc51VbFzegfB89aiEy/Vv8rcGr\nQwZ1BiW13Ctko/rgi0UF02AJChhCuZaDTtVZGWJ1lUUcc4+D2yLJmsF+ZLs+eMVM\nbiK86YBlNRCnfT2St9QeX2oGNlZCl+EHhksuh4CDgVRq/MKNYfNV980BHghn+UVh\n45lhxWNDNzsFW7QTVGRi7KqJy10uzTS+FhPYqkvXLbv0+rvy8EYfapA3pj53d9Ef\nySyXKhaqLtNm2doHG1Tht6UyEl0Wft2xi3pp8B68OH6Lyfe7iLIgaOelyCmYgBOK\nstJ08Txt7QhscSr8PhMBkOBOcdEQ8sXsIjDjTGUtaQKBgQDAtHVWSj7QyxuNd9aN\nSyPKY7SwMC+umzXFXFK5Q6AlzswpevHBXHmLwPGvj26ScB1avcDvkjzhtnz0+AsO\nctO8sz1eS9E56OybwRAChZquxnTMTSlfUcAWXorvTe1InoTBmbV1FsqqQHYvjwDQ\nXU9Vmxo8+Mash8Cc/arm41ld6QKBgQC1DfCye8jUdUQs0noFLWsIh5CKDpwxYZiB\nfWrFMlfyOw/SirzY+Gx1x+Lu7kQa+qPdSFHwO3Gpj/REzoEIgUdc2QY3t1mZNeYH\nnidaDblvx39y3lAM8Fesj2cef/pxLr33Xacggd9LJ2pRYlON8CPWldkkH1qhO7y8\natE2Oj+OLQKBgQCKPuwOw6Tc1Vkm3Fonc0hx4aW24FrUwLSKqfkOv90cQodlGrZl\nKZppEDpS4GtK0vO8LXVEaX0T0H9Ens4Px4DvVwcnpuyqxtc3xgFeTcryp50TFCgi\nIdvUMG8rzpP0DQTgfw0WuwsZqLUg2U6ULNzFZUglhbPCAoHEHpeEnIV4QQKBgBo0\nG0rpqWY+VpCaIbjQGvaQEDY66RYohtbu3N4PbDUNoTuagrxwL9pYBJsJ9udksQSc\nq+c14zxkLjkrHfeqJjbk3gaATcJjz5f4pr9czyLDX8mzLSjCPB4oXwdGBGwPFMVR\nU5fb1AJfgP6oWWlogPdUlqmotAgzyhwG5aKQiZQ9AoGBAJDl9JxcLDVVR0rcAwE5\ndx2MALDMPwL6aOWRLsB10reqYypW30TVf71h87DMz5jyhEwseAqD5WLl/6R4vpTP\nj5lDFjBZVQjos+JXeOjNZHAqLAz1XcQ2z93PbKoQPqAyd2UPiadwpLV6i8vAuG4z\no6BzQRtdhx3+l6hkXsJCvO+u\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-2levp@sistema-biblioteca-f7b97.iam.gserviceaccount.com",
      "client_id": "117328829224490826531",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2levp%40sistema-biblioteca-f7b97.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    })
  });

    // esse é nosso banco do firestore
    const db = getFirestore();

    module.exports = { admin, db, auth };
    
    
