import React from 'react';
import './styles/Home.css';
import homePageImage from './images/homeImg.jpg';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Products from './Products';

import M1 from "./images/HomeClothing/Men's Wear/T-Shirts.jpg";
import M2 from "./images/HomeClothing/Men's Wear/Shirts.jpg";
import M3 from "./images/HomeClothing/Men's Wear/Pants.jpg";
import M4 from "./images/HomeClothing/Men's Wear/Shots.jpg";

import W1 from "./images/HomeClothing/Women's Wear/Sarees.jpg";
import W2 from "./images/HomeClothing/Women's Wear/Tops.jpg";
import W3 from "./images/HomeClothing/Women's Wear/Churidars.jpg";
import W4 from "./images/HomeClothing/Women's Wear/Pants.jpg"

import K1 from "./images/HomeClothing/Kid's Wear/BoySuit.jpeg";
import K2 from "./images/HomeClothing/Kid's Wear/GirlFrocks.jpg";
import K3 from "./images/HomeClothing/Kid's Wear/BoysFasion.jpg";
import K4 from "./images/HomeClothing/Kid's Wear/GirlsFashion.jpg";

import S1 from "./images/HomeClothing/Sweaters/GirlSweater.jpg";
import S2 from "./images/HomeClothing/Sweaters/MenSweater.jpg";
import S3 from "./images/HomeClothing/Sweaters/WomenSweater.png";
import S4 from "./images/HomeClothing/Sweaters/BoySweater.jpeg";

import R1 from "./images/HomeClothing/Raincoats/BoyRaincoat.jpg";
import R2 from "./images/HomeClothing/Raincoats/WomanRaincoat.jpg";
import R3 from "./images/HomeClothing/Raincoats/MenRaincoat.jpg";
import R4 from "./images/HomeClothing/Raincoats/GirlRaincoat.jpg";

import Su1 from "./images/HomeClothing/Summer Wear/Womens.jpg";
import Su2 from "./images/HomeClothing/Summer Wear/Boys.jpg";
import Su3 from "./images/HomeClothing/Summer Wear/Girls.jpg";
import Su4 from "./images/HomeClothing/Summer Wear/Mens.jpg";



const cardData = [
  {
    title: "Men's Wear",
    id: 1,
    subCardImages: [M1,M2,M3,M4],
  },
  {
    title: "Women's Wear",
    id: 2,
    subCardImages: [W1,W2,W3,W4],
  },
  {
    title: "Kid's Wear",
    id: 3,
    subCardImages: [K1,K2,K3,K4],
  },
  {
    title: "Sweaters",
    id: 4,
    subCardImages: [S1,S2,S3,S4],
  },
  {
    title: "Raincoats",
    id: 5,
    subCardImages: [R1,R2,R3,R4],
  },
  {
    title: "Summer Wear",
    id: 6,
    subCardImages: [Su1,Su2,Su3,Su4],
  },
];

const SubCard = ({ title, imageUrl }) => (
  <div className="sub-card">
    <div className="sub-card-body">
      <div className="sub-card-image-container">
        <img src={imageUrl} alt={title} className="sub-card-image" />
      </div>
      {/* <h5 className="sub-card-title">{title}</h5> */}
    </div>
  </div>
);


const CardWithSubCards = ({ title, subCardImages }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title title">{title}</h5>
      <div className="row">
        <div className="col">
          <SubCard title="Sub-Card 1" imageUrl={subCardImages[0]} />
        </div>
        <div className="col">
          <SubCard title="Sub-Card 2" imageUrl={subCardImages[1]} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SubCard title="Sub-Card 3" imageUrl={subCardImages[2]} />
        </div>
        <div className="col">
          <SubCard title="Sub-Card 4" imageUrl={subCardImages[3]} />
        </div>
      </div>
    </div>
  </div>
);

const HomePage = ({ loggedUser }) => {
  const handleCardClick = (title) => {
    // Use the Link component to navigate to Products.js with the title as a parameter
    window.location.href = `/products/${title}`;
  };
  return (
    <div>
      <div className="home-page">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="image-container">
                <img className="main-img img-fluid w-100 h-100 mt-5" src={homePageImage} alt="Home" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-container">
                <h1 className="title">PureThreads Plaza</h1>
                <p className="description">Welcome to PureThreads Plaza, your eco-friendly fashion destination. Explore our curated collection of sustainable clothing, effortlessly browse, add items to your cart, and track your impact with our user-friendly interface. Discover guilt-free shopping, with a history page showing your orders and insights. Join the eco-fashion revolution – where style meets sustainability.</p>
                {loggedUser ? (
                  <Link to="/calendar">
                    <button className="getStartedButton">Explore</button>
                  </Link>
                ) : (
                  <Link to="/signup">
                    <button className="getStartedButton">Get Started</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="homeContainer">
      <Container>
          <Row>
            {cardData.map((card) => (
              <Col key={card.id}>
                <div className="card" onClick={() => handleCardClick(card.title)}>
                  <CardWithSubCards title={card.title} subCardImages={card.subCardImages} />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;