import Navbar from './components/Navbar/Navbar';
import AddAlbumForm from './components/AddAlbumForm/AddAlbumForm';
import Albums from './components/Albums/Albums';
import AddImageForm from './components/AddImageForm/AddImageForm';
import Images from './components/Images/Images';
import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import styles from './App.module.css';
import { addDoc, collection, onSnapshot, orderBy, query, doc, updateDoc, getDoc } from 'firebase/firestore';

function App() {
  const [albums, setAlbums] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [albumInfo, setAlbumInfo] = useState(null);

  useEffect(() => {
    const unsubscribeAlbums = onSnapshot(query(collection(db, 'albums'), orderBy('timestamp', 'desc')), (snapshot) => {
      const albums = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setAlbums(albums);
    });

    return () => {
      unsubscribeAlbums();
    };
  }, []);

  // useEffect(() => {
  //   if (!albumInfo) return;

  //   const unsubscribeImages = onSnapshot(doc(db, 'albums', albumInfo.id), (snapshot) => {
  //     const updatedAlbumInfo = { id: snapshot.id, ...snapshot.data() };
  //     setAlbumInfo(updatedAlbumInfo);
  //   });

  //   return () => {
  //     unsubscribeImages();
  //   };
  // }, [albumInfo]);

  const handleAddAlbum = async (albumName) => {
    const timestamp = new Date();
    await addDoc(collection(db, 'albums'), { albumName, timestamp, imagesInfo: [] });
  };

  const handleAddImage = async (imageInfo) => {
    const { imageName, imageUrl } = imageInfo;
    const timestamp = new Date();
    const imageId = Date.now() + '-' + (parseInt(Math.random() * 1E9));
    const imageInfoObj = { imageId, imageName, imageUrl, timestamp };

    const albumDocRef = doc(db, 'albums', albumInfo.id);
    const updatedImagesInfo = [imageInfoObj, ...albumInfo.imagesInfo];
    await updateDoc(albumDocRef, {
      imagesInfo: updatedImagesInfo,
    });

    setAlbumInfo((prevAlbumInfo) => ({
      ...prevAlbumInfo,
      imagesInfo: updatedImagesInfo,
    }));
  };

  const handleDeleteImage = async (imageId) => {
    const albumDocRef = doc(db, 'albums', albumInfo.id);
    const albumDocSnanpshot = await getDoc(albumDocRef);
    const albumData = albumDocSnanpshot.data();

    const updatedImagesInfo = albumData.imagesInfo.filter(
      (image) => image.imageId !== imageId
    );
    await updateDoc(albumDocRef, { imagesInfo: updatedImagesInfo });
    setAlbumInfo((prevAlbumInfo) => ({
      ...prevAlbumInfo,
      imagesInfo: updatedImagesInfo
    }))
  }

  const showImagesHandler = (currAlbum) => {
    setShowImages(!showImages);
    setAlbumInfo(currAlbum);
  };

  return (
    <>
      <Navbar />
      <div className={styles.body__outer}>
        <div className={styles.body__inner}>
          {showImages ? (
            <>
              <AddImageForm addImage={handleAddImage} />
              <Images 
              album={albumInfo} 
              showImages={showImagesHandler} 
              deleteImage={handleDeleteImage} />
            </>
          ) : (
            <>
              <AddAlbumForm addAlbum={handleAddAlbum} />
              <Albums albums={albums} showImages={showImagesHandler} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
