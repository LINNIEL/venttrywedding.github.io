const galleryImages = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const btnClose = document.querySelector(".close-lightbox");

const btnPrev = document.querySelector(".prev");

const btnNext = document.querySelector(".next");

let currentIndex = 0;



function showImage(index){

    lightboxImage.src = galleryImages[index].src;

}



galleryImages.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        currentIndex=index;

        showImage(currentIndex);

        lightbox.classList.add("active");

    });

});



btnClose.onclick=()=>{

    lightbox.classList.remove("active");

};



lightbox.onclick=(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

};



btnNext.onclick=()=>{

    currentIndex++;

    if(currentIndex>=galleryImages.length){

        currentIndex=0;

    }

    showImage(currentIndex);

};



btnPrev.onclick=()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=galleryImages.length-1;

    }

    showImage(currentIndex);

};