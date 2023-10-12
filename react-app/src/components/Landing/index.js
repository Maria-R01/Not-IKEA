import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Landing.css';

const Landing = () => {
    const history = useHistory()
    const enterSite = () => {
        history.push('/home')
    }
    
    return (
        // <h1>Landing Component!!</h1>
        <div className='landing-container'>
            <div className='image-container'>
                <img src='https://media2.giphy.com/media/jsMza94LM2tUrrlcz1/giphy.gif?cid=ecf05e47yzo2on8nd37ol56q5s9zkcnjth9f9t0dq3tdz4ug&ep=v1_gifs_search&rid=giphy.gif&ct=g'></img>
            </div>
            <div className='not-logo'>
				<img className='logo' src='https://substackcdn.com/image/fetch/w_848,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fd37204f6-f104-4dd0-9969-f63464023cde_600x600.png'></img>
            </div>
            <div className='right-side'>
                <div className='right-side-contents'>
                    <h1>Welcome to NotIKEA</h1>
                    <h3>An IKEA Clone</h3>
                </div>
                <div>
                    Enter site to begin exploring...
                </div>
                <div className='enter-site-button'>
                    <button onClick={enterSite}>Enter</button>
                </div>
            </div>
        </div>
    )

}

export default Landing;