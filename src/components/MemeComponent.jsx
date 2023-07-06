import {useEffect, useState} from 'react'
import memesData from '../memesData'

export default function MemeComponent() {
    
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])
    useEffect(async () => {
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
        // fetch("https://api.imgflip.com/get_memes")
        //     .then(res => res.json())
        //     .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: allMemes[randomNumber].url
        }))
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <div className='memecomponent'>
            <div className='form'>
                <div className="input">
                    <input 
                        type="text"
                        placeholder='Top text'
                        name='topText'
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder='Bottom text'
                        name='bottomText'
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={getMemeImage}><h3>Get a new meme image 🖼️</h3> </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className='memeImage'/>
                <h2 className='meme--text top'>{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </div>
    )
}