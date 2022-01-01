
$( document ).ready(function() {
    $('.btn_anchor').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});
});


      
<script src="https://unpkg.com/wavesurfer.js"></script>
<script src="https://unpkg.com/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"></script>

<script>
  window.addEventListener('load', function() {
    const wavesources = []
    
    const players = document.querySelectorAll(".player")
    players.forEach((element)=> {
      console.log("players",element)
      const src = element.querySelector('.audio').dataset.source
      const text = element.querySelector('.audio__text').dataset.text
      wavesources.push({src, text})
    })
    
    
    const productAudio = document.querySelector('.product__audio')
    
    wavesources.map(function(item, i) {
      
      const musicWrap = document.createElement('div')
      musicWrap.setAttribute('class', 'music')
      console.log(musicWrap)
      
      const waveContainer = document.createElement('div')
      waveContainer.setAttribute('class', 'wave__wrapper')
      musicWrap.appendChild(waveContainer)
      console.log(waveContainer)
      
      const waveForm = document.createElement('div')
      waveForm.setAttribute('id', 'waveform_' + i)
      waveContainer.appendChild(waveForm)
      
      const waveFormLabel = document.createElement('div')
      waveFormLabel.setAttribute('id', 'music__text-' + i)
      waveFormLabel.setAttribute('class', 'music__text')
      waveFormLabel.innerHTML = item.text
      waveContainer.appendChild(waveFormLabel)
      
      const control = document.createElement('button')
      control.setAttribute('id', 'play' + i)
      control.setAttribute('class', 'center')
      musicWrap.appendChild(control)
      
      const controlIcon = document.createElement('i')
      controlIcon.setAttribute('class', 'fas fa-play')
      control.appendChild(controlIcon)
      
      productAudio.appendChild(musicWrap)
      
      var wavesurfer = WaveSurfer.create({
        container: waveForm,
        waveColor: '#fff',
        progressColor: '#264E73'
      });
      
      wavesurfer.load(item.src)
      var analyser = wavesurfer.backend.analyser,
  
      frequencyData = new Uint8Array(analyser.frequencyBinCount);
      
       const playIcon = '<i class="fas fa-play"></i>'
       const pauseIcon = '<i class="fas fa-pause"></i>'
     
   
      control.addEventListener('click', function() {
        console.log(this.innerHTM)

      wavesurfer.playPause();

        if (this.innerHTML === playIcon) {
          this.innerHTML = pauseIcon;
        } else {
          this.innerHTML = playIcon;
        }
      });


      wavesurfer.on('audioprocess', function(e) {
        analyser.getByteFrequencyData(frequencyData);

        var w = frequencyData[0] * 0.05;

      });
    })
  })

</script>
            
      
      
