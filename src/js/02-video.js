import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
const keyStorage = 'videoplayer-current-time';

player.on('timeupdate', throttle((data) => {
    localStorage.setItem(keyStorage, JSON.parse(data.seconds));
}, 1000));

const currentTime = JSON.stringify(localStorage.getItem(keyStorage));

player.setCurrentTime(currentTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});