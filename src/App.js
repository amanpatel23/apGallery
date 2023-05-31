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

  // state for storing albums in the database
  const [albums, setAlbums] = useState([]);
  // state for conditional rendering of albums and images
  const [showImages, setShowImages] = useState(false);
  // state for storing current clicked album info
  const [albumInfo, setAlbumInfo] = useState(null);
  // state for conditional rendering of add album form
  const [showNewAlbumForm, setShowNewAlbumForm] = useState(false);
  // state for conditional rendering of add image form
  const [showNewImageForm, setShowNewImageForm] = useState(false);
  // state for conditional rendering of add image and edit image
  const [editingMode, setEditingMode] = useState(null);

  // CDM
  useEffect(() => {
    // getting albums from the database when the component mounts
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

  // adding new album to the database
  const handleAddAlbum = async (albumName) => {
    const timestamp = new Date();
    await addDoc(collection(db, 'albums'), { albumName, timestamp, imagesInfo: [] });

    // flash a success message
    toast.success('Album added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });
  };

  // adding new image info in the album
  const handleAddImage = async (imageInfo) => {
    // getting image info from add image form
    const { imageName, imageUrl } = imageInfo;
    const timestamp = new Date();
    // generating unique id for the image
    const imageId = Date.now() + '-' + (parseInt(Math.random() * 1E9));
    const imageInfoObj = { imageId, imageName, imageUrl, timestamp };

    const albumDocRef = doc(db, 'albums', albumInfo.id);
    const updatedImagesInfo = [imageInfoObj, ...albumInfo.imagesInfo];
    // updating the album doc in the database
    await updateDoc(albumDocRef, {
      imagesInfo: updatedImagesInfo,
    });

    // flashing success message when the image gets added
    toast.success('Image added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });

    // locally update the albumInfo state
    setAlbumInfo((prevAlbumInfo) => ({
      ...prevAlbumInfo,
      imagesInfo: updatedImagesInfo,
    }));
  };

  // handling the delete image 
  const handleDeleteImage = async (imageId) => {
    const albumDocRef = doc(db, 'albums', albumInfo.id);
    const albumDocSnanpshot = await getDoc(albumDocRef);
    const albumData = albumDocSnanpshot.data();

    // removing the image using filter from imagesInfo array
    const updatedImagesInfo = albumData.imagesInfo.filter(
      (image) => image.imageId !== imageId
    );
    // updaing the doc with updated imageInfo array
    await updateDoc(albumDocRef, { imagesInfo: updatedImagesInfo });

    // flashing the success message
    toast.success('Image deleted successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });

    // locally updating albumInfo with updated imagesInfo
    setAlbumInfo((prevAlbumInfo) => ({
      ...prevAlbumInfo,
      imagesInfo: updatedImagesInfo
    }))
  }

  // handling display images of an album
  const showImagesHandler = (currAlbum) => {
    setShowImages(!showImages);
    setAlbumInfo(currAlbum);
    setEditingMode(null);
  };

  // handling display 'add new album' form
  const addNewAlbumFormHandler = () => {
    setShowNewAlbumForm(!showNewAlbumForm);
  }

  // handling display 'add new image' form
  const addNewImageFormHandler = () => {
    setShowNewImageForm(!showNewImageForm);
    setEditingMode(null);
  }

  // handling convert add image form to edit image form
  const editImageHandler = (clickedImage) => {
    setEditingMode(clickedImage);
    setShowNewImageForm(true);
  } 

  // updating the image info in the database
  const updateImageHandler = async (updatedImage) => {
    const albumDocRef = doc(db, 'albums', albumInfo.id);
    const albumDocSnanpshot = await getDoc(albumDocRef);
    const albumData = albumDocSnanpshot.data();

    // getting updated imagesInfo array
    const updatedImagesInfo = albumData.imagesInfo.map(
      (image) => {
        if (image.imageId !== updatedImage.imageId) {
          return image;
        } else {
          return updatedImage
        }
      }
    );

    // updating the album with updated imgesInfo
    await updateDoc(albumDocRef, { imagesInfo: updatedImagesInfo });

    // flashing the success message
    toast.success('Image updated successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });

    // updating albumInfo state with updated imagesInfo array
    setAlbumInfo((prevAlbumInfo) => ({
      ...prevAlbumInfo,
      imagesInfo: updatedImagesInfo
    }))
    setEditingMode(null);
  }

  // jsx
  return (
    <>
      <ToastContainer />
      {/* rendering Navbar component */}
      <Navbar />
      <div className={styles.body__outer}>
        <div className={styles.body__inner}>
          {/* conditional rendering albums and images */}
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
