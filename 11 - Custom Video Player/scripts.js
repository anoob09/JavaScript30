const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
 	const method = video.paused ? 'play' : 'pause';
 	video[method]();
}
function updateButton(){
	toggle.textContent = this.paused ? '►' : '❚ ❚';
}
function skip(){
	video.currentTime+= parseFloat(this.dataset.skip);
}
function updateRangeHandler(){
	video[this.name] = this.value;
}
function handleProgress(){
	const per = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${per}%`;
}
function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', updateRangeHandler));
video.addEventListener('timeupdate', handleProgress);
const pbar = document.querySelector('.progress');
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('click', scrub);
