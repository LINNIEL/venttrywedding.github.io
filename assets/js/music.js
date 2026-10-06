/*
======================================================
    BACKGROUND MUSIC
======================================================
*/

let backgroundMusic = null;
let musicButton = null;
let musicIcon = null;



/*
======================================================
    INITIALIZE
======================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    backgroundMusic = document.getElementById("backgroundMusic");

    musicButton = document.getElementById("musicButton");

    musicIcon = document.getElementById("musicIcon");

    if (musicButton) {

        musicButton.addEventListener("click", toggleMusic);

    }

});



/*
======================================================
    PLAY MUSIC
======================================================
*/

function playMusic() {

    if (!backgroundMusic) return;

    backgroundMusic.play()
        .then(() => {

            if (musicIcon) {

                musicIcon.textContent = "⏸";

            }

        })
        .catch((err) => {

            console.log("Music Error:", err);

        });

}



/*
======================================================
    PAUSE MUSIC
======================================================
*/

function pauseMusic() {

    if (!backgroundMusic) return;

    backgroundMusic.pause();

    if(musicIcon){

        musicIcon.textContent = "▶";

    }

}



/*
======================================================
    TOGGLE MUSIC
======================================================
*/

function toggleMusic() {

    if (!backgroundMusic) return;

    if (backgroundMusic.paused) {

        playMusic();

    } else {

        pauseMusic();

    }

}