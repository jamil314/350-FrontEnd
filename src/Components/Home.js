import React, {useState, useEffect} from "react";
import TopBar from "./TopBar";
import '../CSS/Home.css';
import img1 from '../Recources/slide1.jpg'
import img2 from '../Recources/slide2.jpg'
import img3 from '../Recources/slide3.jpg'
import img4 from '../Recources/slide4.jpg'
import img5 from '../Recources/slide5.jpg'
import img6 from '../Recources/slide6.jpg'
import img7 from '../Recources/slide7.jpg'
import img8 from '../Recources/slide8.jpg'
const Home = () => {

	const [imgs, setImgs] = useState([img1, img2, img3, img4, img5, img6, img7, img8]);
	const [idx, setIdx] = useState(0);
	const [started, setstarted] = useState(0);
	let t = 0;
	const update = () => {
		t+=0.5;
		if(t>=8) t =0;
		setIdx(t);
		// console.log(t);
	}

	useEffect(() => {
		if(started == 0){
			setstarted(1);
			setInterval(update, 3000);
		}
	}, [])

	return (
        <div className="Home">
            <TopBar></TopBar>
            <div className="slider">
				<img className="slide" src={imgs[idx]}></img>
            </div>
        </div>
  );
}

export default Home;