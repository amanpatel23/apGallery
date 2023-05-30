import Navbar from './components/Navbar/Navbar';
import AddAlbumForm from './components/AddAlbumForm/AddAlbumForm';
import Albums from './components/Albums/Albums';
import AddImageForm from './components/AddImageForm/AddImageForm';
import Images from './components/Images/Images';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import styles from './App.module.css';
import { addDoc, collection, onSnapshot, orderBy, query, doc, updateDoc, getDoc } from 'firebase/firestore';

function App() {
  const [albums, setAlbums] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [showNewAlbumForm, setShowNewAlbumForm] = useState(false);
  const [showNewImageForm, setShowNewImageForm] = useState(false);
  const [editingMode, setEditingMode] = useState(null);

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

  const handleAddAlbum = async (albumName) => {
    const timestamp = new Date();
    await addDoc(collection(db, 'albums'), { albumName, timestamp, imagesInfo: [] });

    toast.success('Album added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });
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

    toast.success('Image added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
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

    toast.success('Image deleted successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });


    setAlbumInfo((prevAlbumInfo) => ({
      ...prevAlbumInfo,
      imagesInfo: updatedImagesInfo
    }))
  }

  const showImagesHandler = (currAlbum) => {
    setShowImages(!showImages);
    setAlbumInfo(currAlbum);
    setEditingMode(null);
  };

  const addNewAlbumFormHandler = () => {
    setShowNewAlbumForm(!showNewAlbumForm);
  }

  const addNewImageFormHandler = () => {
    setShowNewImageForm(!showNewImageForm);
    setEditingMode(null);
  }

  const editImageHandler = (clickedImage) => {
    setEditingMode(clickedImage);
    setShowNewImageForm(true);
  } 

  const updateImageHandler = async (updatedImage) => {
    const albumDocRef = doc(db, 'albums', albumInfo.id);
    const albumDocSnanpshot = await getDoc(albumDocRef);
    const albumData = albumDocSnanpshot.data();

    const updatedImagesInfo = albumData.imagesInfo.map(
      (image) => {
        if (image.imageId !== updatedImage.imageId) {
          return image;
        } else {
          return updatedImage
        }
      }
    );

    await updateDoc(albumDocRef, { imagesInfo: updatedImagesInfo });

    toast.success('Image updated successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });


    setAlbumInfo((prevAlbumInfo) => ({
      ...prevAlbumInfo,
      imagesInfo: updatedImagesInfo
    }))
    setEditingMode(null);
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className={styles.body__outer}>
        <div className={styles.body__inner}>
          {showImages ? (
            <>
              {showNewImageForm 
              && 
              <AddImageForm 
              addImage={handleAddImage}
              editingMode={editingMode}
              updateImage={updateImageHandler}
              />}
              <Images 
              album={albumInfo} 
              showImages={showImagesHandler} 
              deleteImage={handleDeleteImage} 
              showForm={addNewImageFormHandler}
              formVisible={showNewImageForm}
              editImage={editImageHandler}
              />
            </>
          ) : (
            <>
              {showNewAlbumForm && <AddAlbumForm addAlbum={handleAddAlbum} />}
              <Albums 
              albums={albums} 
              showImages={showImagesHandler} 
              showForm={addNewAlbumFormHandler}
              formVisible={showNewAlbumForm}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
