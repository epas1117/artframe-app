import firebase from './firebaseInstance';

let db = firebase.database();

let currentUser;

// users
  // auth
export function getCurrentUser() {
  return firebase.auth().currentUser;
}

export function getFullCurrentUserOnce() {
  return db.ref('users/'+ getCurrentUser().uid).once('value');
}

export function signUpUser(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function logInUser(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);

}

export function logOutUser() {
  return firebase.auth().signOut();
}
  // save
export function saveNewUser(newUser) {
  db.ref('users/' + newUser.uid).set({
      email: newUser.email,
      userName: newUser.userName
    });
}

export function saveNewFrameToUser(newFrameName, callback) {
  let newFrameKey = db.ref('users/' + getCurrentUser().uid + '/frames/').push().key;
  db.ref('users/' + getCurrentUser().uid + '/frames/' + newFrameKey).set(
    {
      name: newFrameName,
      author: 'atiko7',
      title: 'atiko7',
      url: 'https://www.w3schools.com/css/img_lights.jpg',
      urlPreview: 'https://www.w3schools.com/css/img_lights.jpg'
    }
  ).then(callback(newFrameKey));
}

export function saveGalleryItemToUserOwned(galleryItem) {
  db.ref('users/' + getCurrentUser().uid + '/owned/' + galleryItem.key).set(true);
}

export function saveGalleryItemToUserFavorites(galleryItemKey) {
  db.ref('users/' + getCurrentUser().uid + '/favorites/' + galleryItemKey).set(true);
}
  // update
export function updateGalleryItemToDisplayInUserFrame(galleryItem, userFrameKey) {
  db.ref('users/' + getCurrentUser().uid + '/frames/' + userFrameKey).update({
    url: galleryItem.url,
    urlPreview: galleryItem.urlPreview,
    author: galleryItem.author.name,
    title: galleryItem.title
  });
}

export function updateUserFrameName(newUserFrameName, userFrameKey ) {
  db.ref('users/' + getCurrentUser().uid + '/frames/' + userFrameKey).update({
    name: newUserFrameName
  });
}
  // delete
export function deleteGalleryItemInUserFavorites(galleryItemKey) {
  db.ref('users/' + getCurrentUser().uid + '/favorites/' + galleryItemKey).remove();
}

  // get
export function getOwnedGalleryContentByUserOnce() {
  return db.ref('users/'+ getCurrentUser().uid +'/owned').once('value').then((snapshot) => {
      return snapshot.val();
  });
}

export function getFavoritesGalleryContentByUserOnce() {
  return db.ref('users/'+ getCurrentUser().uid +'/favorites').once('value').then((snapshot) => {
      return snapshot.val();
  });
}

export function getUserFramesOn(callback) {
  db.ref('users/'+ getCurrentUser().uid +'/frames').on('value', (snapshot) => {
      callback(snapshot.val());
  });
}

export function getUserFramesOnce() {
  return db.ref('users/'+ getCurrentUser().uid +'/frames').once('value');
}

// artworks
  // save
export function saveUserInGalleryItemFavorites(galleryItemKey) {
  db.ref('artworks/'+ galleryItemKey + '/usersFavorites/' + getCurrentUser().uid).set(true);
}

  // update
export function deleteUserInGalleryItemFavorites(galleryItemKey) {
  db.ref('artworks/'+ galleryItemKey + '/usersFavorites/' + getCurrentUser().uid).remove();
}

  // get
export function getGalleryContentOn(callback) {
  db.ref('artworks').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}
