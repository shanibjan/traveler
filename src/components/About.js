import React, { useEffect } from 'react'
import imagePath from '../Pages/assetHelper'
import ScrollReveal from 'scrollreveal';

function About() {
    useEffect(()=>{
        ScrollReveal().reveal('.about', {
            duration: 1500,
            distance: '500px',
           
            easing: 'ease-in-out',
            origin:'right',
            reset: true
          });
    },[])

    let traveller='traveller.jpg'
    let castle='castle.jpg'
    let georgia='georgia.jpg'
  return (
    <div className='flex mx-40' >
      <div className='relative' > 
        <div className='w-[550px] absolute -z-10 ' >
            <img src={imagePath(`${traveller}`)} alt="" />
        </div>
      </div>
      <div className='table h-[825px] ' >
        <div className='table-cell align-middle' >
            <div className=' about w-3/5 ml-[450px] shadow-xl bg-white p-[50px]' >

            <h5 className='font-gorditaMedium text-[#515DEF]' >ABOUT US</h5>
            <h1 className='font-gorditaBold text-[40px] my-5' >We Provide Best Places <br />  For You</h1>
            <p className='font-gordita' >Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam dolore sed et. Sit rebum labore sit sit ut vero no sit. Et elitr stet dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat sed diam duo</p>
            <div className='flex h-[165px] justify-between my-5 ' >
                <img  src={imagePath(`${castle}`)} alt="" />
                <img src={imagePath(`${georgia}`)} alt="" />
            </div>
            <button className="bg-[#515DEF] py-[12px] px-[40px] text-white font-gorditaMedium ">
                    Explore
                  </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default About
