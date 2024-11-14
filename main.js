let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration")

function downloadTrack() {
    const trackUrl = "path/to/your/track.mp3"; // Replace with the actual track URL
    const link = document.createElement('a');
    link.href = trackUrl;
    link.download = 'Track Name.mp3'; // Replace with the actual track name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
{
	name: "Sanam Teri Kasam",
	artist: "Ankit Tiwari,Palak Muchhal",
	image: "https://m.media-amazon.com/images/M/MV5BOTBlNGI1ZmMtYjQyZS00NjRiLTllODctYzA0ODgxYjU0MGI0XkEyXkFqcGdeQXVyOTA3MTM0MTM@._V1_.jpg",
	path: "music1.mp3"
},
{
	name: "Fear Song (Devara)",
	artist: "Anirudh Ravichander",
	image: "https://djmaza.com.in/siteuploads/thumb/sft1/61_resize2x_200x200.webp",
	path: "music3.mp3"
},
{
	name: "Zaroor",
	artist: "Aparshakti Khurana",
	image: "https://djmaza.com.in/siteuploads/thumb/sft1/323_resize2x_200x200.webp",
	path: "music2.mp3"
},
{
	name: "Dheere Dheere (Devara)",
	artist: "Anirudh Ravichander",
	image: "https://djmaza.com.in/siteuploads/thumb/sft1/188_resize2x_200x200.webp",
	path: "music4.mp3"
},
{
	name: "Mere Mehboob Mere Sanam ",
	artist: "Javed Akhtar, Udit Narayan, Alka Yagnik,Anu Malik",
	image: "https://djmaza.com.in/siteuploads/thumb/sft1/129_resize2x_70x70.webp",
	path: "music5.mp3"
},
{
	name: "Khoobsurat ",
	artist: "Amitabh Bhattacharya",
	image: "https://st1.bollywoodlife.com/wp-content/uploads/2024/08/stree2-khoobsurat.jpg",
	path: "music8.mp3"
},
{
	name: "Tauba Tauba ",
	artist: "Karan Aujla",
	image: "https://djmaza.com.in/siteuploads/thumb/sft1/125_resize2x_200x200.webp",
	path: "music6.mp3"
},
{
	name: "Tumhare Hi Rahenge Hum",
	artist: "Amitabh Bhattacharya",
	image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ca/36/4a/ca364a88-3af5-a014-7ec2-ca0440df5627/198588905289.jpg/300x300bb.webp",
	path: "music9.mp3"
},
{
	name: "Rabb Warga ",
	artist: "Shayra Apoorva, Abhijeet Srivastava, Jubin Nautiyal",
	image: "https://djmaza.com.in/siteuploads/thumb/sft1/128_resize2x_200x200.webp",
	path: "music7.mp3"
},
{
	name: "Aaj Ki Raat ",
	artist: "Madhubanti Bagchi, Divya Kumar",
	image: "https://sambalpuristar.in/siteuploads/thumb/sft16/7635_4.jpg",
	path: "music10.mp3",
},
];

function loadTrack(track_index) {
	// Clear the previous seek timer
	clearInterval(updateTimer);
	resetValues();
	
	// Load a new track
	curr_track.src = track_list[track_index].path;
	curr_track.load();
	
	track_art.style.backgroundImage = 
		"url(" + track_list[track_index].image + ")";
	track_name.textContent = track_list[track_index].name;
	track_artist.textContent = track_list[track_index].artist;
	now_playing.textContent = 
		"PLAYING " + (track_index + 1) + " OF " + track_list.length;
	
	// Set an interval of 1000 milliseconds
	// for updating the seek slider
	updateTimer = setInterval(seekUpdate, 1000);
	
	curr_track.addEventListener("ended", nextTrack);
	
	random_bg_color();
	}
	
	function random_bg_color() {
	let red = Math.floor(Math.random() * 256) + 64;
	let green = Math.floor(Math.random() * 256) + 64;
	let blue = Math.floor(Math.random() * 256) + 64;

	let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
	
	// Set the background to the new color
	document.body.style.background = bgColor;
	}
	
	 
	function resetValues() {
	curr_time.textContent = "00:00";
	total_duration.textContent = "00:00";
	seek_slider.value = 0;
	}

	function playpauseTrack() {

		if (!isPlaying) playTrack();
		else pauseTrack();
		}
		
		function playTrack() {
		curr_track.play();
		isPlaying = true;
		
		 
		playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
		}
		
		function pauseTrack() {
		curr_track.pause();
		isPlaying = false;
		
		playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
		}
		
		function nextTrack() {
		if (track_index < track_list.length - 1)
			track_index += 1;
		else track_index = 0;
		
 
		loadTrack(track_index);
		playTrack();
		}
		
		function prevTrack() {
		if (track_index > 0)
			track_index -= 1;
		else track_index = track_list.length - 1;
		
		 
		loadTrack(track_index);
		playTrack();
		}

		function seekTo() {
			seekto = curr_track.duration * (seek_slider.value / 100);
			
			 
			curr_track.currentTime = seekto;
			}
			
			function setVolume() {
			 
			curr_track.volume = volume_slider.value / 100;
			}
			
			function seekUpdate() {
			let seekPosition = 0;
			
			 
			if (!isNaN(curr_track.duration)) {
				seekPosition = curr_track.currentTime * (100 / curr_track.duration);
				seek_slider.value = seekPosition;
			
				 
				let currentMinutes = Math.floor(curr_track.currentTime / 60);
				let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
				let durationMinutes = Math.floor(curr_track.duration / 60);
				let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
			
				 
				if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
				if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
				if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
				if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
			
				curr_time.textContent = currentMinutes + ":" + currentSeconds;
				total_duration.textContent = durationMinutes + ":" + durationSeconds;
			}
			}
loadTrack(track_index);
