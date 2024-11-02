"use client"
import { useEffect } from 'react';


const PostShipLoader = () => {
  useEffect(() => {
    const createPostShipCss = document.createElement('link');
    createPostShipCss.setAttribute('rel', 'stylesheet');
    createPostShipCss.setAttribute('href', 'https://kr-shipmultichannel-mum.s3-ap-south-1.amazonaws.com/shiprocket-fronted/shiprocket_post_ship.css');
    document.body.appendChild(createPostShipCss);

    const createPostShipScript = document.createElement('script');
    createPostShipScript.setAttribute('onload', 'changeData()');
    createPostShipScript.setAttribute('src', 'https://kr-shipmultichannel-mum.s3-ap-south-1.amazonaws.com/shiprocket-fronted/shiprocket_post_ship.js');
    document.body.appendChild(createPostShipScript);

    window.changeData = () => {
      document.querySelector('.post-ship-btn').style.backgroundColor = '#000000';
      document.querySelector('.post-ship-btn').style.color = '#ffffff';
      document.querySelector('.post-ship-box-wrp').style.backgroundColor = '#ECECEC';
      document.querySelector('.post-ship-box-wrp div').style.color = '#f5eeff';
      document.querySelector('.post-ship-box-wrp h1').style.color = '#000000';
      document.querySelector('.post-ship-box-wrp button').style.backgroundColor = '#000000';
      document.querySelector('.post-ship-box-wrp button').style.color = '#ffffff';
    };
  }, []);

  return null; 
};

export default PostShipLoader;
