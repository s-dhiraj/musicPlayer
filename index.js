const music=document.querySelector('audio');
const play=document.getElementById('play');
const img=document.querySelector('img');
const prev=document.getElementById('prev');
const next=document.getElementById('next');
const song_name=document.getElementById('song_name');
const song_writer=document.getElementById('song_writer');
let progress_bar=document.getElementById('progress_bar');
let total_duration=document.getElementById('total_duration')
let total_currentTime=document.getElementById('currentTime')
const progress_container=document.getElementById('progress_container');
let isPlaying=false;
const songs=[{
    name:"song-1",
    title:"Money Heist",
    artist:"Unknown"
},
{
    name:"song-2",
    title:"Tu hi yaar mera",
    artist:"Arjit Singh"
},
{
    name:"song-3",
    title:"Dooriyan",
    artist:"Deno James"
}
]
const playMusic=()=>{
    isPlaying=true;
    music.play();
    play.classList.replace('fa-play','fa-pause')
    img.classList.add('anime')
}
const pauseMusic=()=>{
    isPlaying=false;
    music.pause();
    play.classList.replace('fa-pause','fa-play')
    img.classList.remove('anime')
}
play.addEventListener('click',()=>{
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    }
})
// changing music data
const loadSong=(songs)=>{
    song_name.innerHTML=songs.title;
    song_writer.textContent=songs.artist;
    music.src="./public/songs/"+ songs.name +".mp3";
    img.src="./public/images/"+ songs.name +".jpg";
}
songIndex=0;
const nextSong=()=>{
    songIndex=(songIndex+1)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}
const prevSong=()=>{
    songIndex=(songIndex-1 + songs.length)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

// progress bar functionality
music.addEventListener("timeupdate",(event) => {
    // console.log(event);
    const {currentTime , duration} = event.target;
   let progress_time=(currentTime/duration)*100;
   progress_bar.style.width=`${progress_time}%`;

   // music duration update
   let min_duration=Math.floor(duration/60);
   let sec_duration=Math.floor(duration%60);
    if(sec_duration<10){
        sec_duration=sec_duration*10;
    }
   let tot_duration=`${min_duration}:${sec_duration}`;
   if(duration){
    total_duration.textContent=`${tot_duration}`;
   }
   
   // current duration update
     let min_currentTime=Math.floor(currentTime/60);
   let sec_currentTime=Math.floor(currentTime%60);
    if(sec_currentTime<10){
        sec_currentTime=`0${sec_currentTime}`;
    }
   let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;
   if(currentTime){
    total_currentTime.textContent=`${tot_currentTime}`;
   }
   
})
// progress onclick functionality
progress_container.addEventListener('click',(event)=>{
    const {duration} =music;
    let move_progress=(event.offsetX/event.target.clientWidth)*duration;
    music.currentTime=move_progress;

})
music.addEventListener('ended',nextSong);
next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);