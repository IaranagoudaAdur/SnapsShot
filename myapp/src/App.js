import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useRef, useState } from "react"

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "15e88b91084d01980f31139bd4d5968d",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }

    const parameters = new URLSearchParams(params);
    let url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp) => {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgdata) => {
        return fetchFlickrImageUrl(imgdata, 'q')
      });
      setImageData(arr);
    }).catch(() => {

    }).finally(() => {

    })
  }, [searchText]);

  const fetchFlickrImageUrl = (photo, size) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    console.log(url)
    if (size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  
  return (
    <div className="container">
      <h1>SnapsShots</h1>
      <input className="search-input" onChange={(e) => { searchData.current = e.target.value }} />
      <button className="search-button" onClick={() => { setSearchText(searchData.current) }}>Search</button>
      <section className="button-container">
        <button onClick={() => { setSearchText("mountains") }}>Mountains</button>
        <button onClick={() => { setSearchText("beaches") }}>Beaches</button>
        <button onClick={() => { setSearchText("birds") }}>Birds</button>
        <button onClick={() => { setSearchText("food") }}>Food</button>
      </section>

      <section className='image-container'>
          {imageData.map((imageurl, key) => { 
            console.log(imageurl)
          return (
            <article className='flickr-image' key={key}>
              <img src={imageurl} alt={`Image ${key}`} />
            </article>
          )
        })}
      </section>
    </div>
  );
}

export default App;
