 import React from "react";
 import {
   MDBCarousel,
   MDBCarouselCaption,
   MDBCarouselInner,
   MDBCarouselItem,
   MDBView,
   MDBMask,
   MDBContainer,
 } from "mdbreact";

 import Braid from '../images/braid.jpg'
 import ClipHair from "../images/cliphair.jpg";
 import CutHair from "../images/cuthair.jpg";
 const Slider = () => {
   return (
     <MDBContainer>
       <MDBCarousel
         activeItem={1}
         length={3}
         showControls={true}
         showIndicators={true}
         className="z-depth-1"
       >
         <MDBCarouselInner>
           <MDBCarouselItem itemId="1">
             <MDBView>
               <img
                 className="d-block w-100"
                 src={ClipHair}
                 alt="First slide"
               />
               <MDBMask overlay="black-light" />
             </MDBView>
             <MDBCarouselCaption>
               <h3 className="h3-responsive">Light mask</h3>
               <p>First text</p>
             </MDBCarouselCaption>
           </MDBCarouselItem>
           <MDBCarouselItem itemId="2">
             <MDBView>
               <img
                 className="d-block w-100"
                 src={CutHair}
                 alt="Second slide"
               />
               <MDBMask overlay="black-strong" />
             </MDBView>
             <MDBCarouselCaption>
               <h3 className="h3-responsive">Strong mask</h3>
               <p>Second text</p>
             </MDBCarouselCaption>
           </MDBCarouselItem>
           <MDBCarouselItem itemId="3">
             <MDBView>
               <img className="d-block w-100" src={Braid} alt="Third slide" />
               <MDBMask overlay="black-slight" />
             </MDBView>
             <MDBCarouselCaption>
               <h3 className="h3-responsive">Slight Mast</h3>
               <p>Third text</p>
             </MDBCarouselCaption>
           </MDBCarouselItem>
         </MDBCarouselInner>
       </MDBCarousel>
     </MDBContainer>
   );
 };

 export default Slider;