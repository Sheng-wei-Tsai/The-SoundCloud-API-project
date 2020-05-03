/*1.  Search */

let UI = {};

// UI.EnterPress;
// UI.submitClick;



/*2. Query SOundcloud API */

  const SoundCloudAPI = {};

  SoundCloudAPI.init = function() {
    SC.initialize({
      client_id: 'cd9be64eeb32d1741c17cb39e41d254d',
    });
  }
    
  SoundCloudAPI.init();

  SoundCloudAPI.getTrack = function(inputValue) {
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
      q: inputValue, license: 'cc-by-sa' // q 是 params
    }).then(function(tracks) {
      // console.log(tracks);
      SoundCloudAPI.renderTracks(tracks);
    });
  }
    
  SoundCloudAPI.getTrack('Justin Bieber')




  /*3. Display the cards */
  SoundCloudAPI.renderTracks = function(tracks) {
    
    tracks.forEach(function(track) {
        // card
    var card = document.createElement('div');
    card.classList.add('card');
    // image
    var imageDiv =document.createElement('div');
    imageDiv.classList.add('image');

    var image_img = document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src = track.artwork_url || 'http://lorempixel.com/150/150/abstract/';
    imageDiv.appendChild(image_img);

    // content
    var content = document.createElement('div');
    content.classList.add('content');

    var header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `<a href="#" target="_blank">${track.title}</a>`;

    // button 
    var button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

    // icon 
    var icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    var buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist';

    //appendChild

    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);
    button.addEventListener('click', function(){
      SoundCloudAPI.getEmbed(track.permalink_url);
    })

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);


    var searchResults = document.querySelector('.js-search-results')
    searchResults.appendChild(card);

    });
  }  



  SoundCloudAPI.getEmbed = function(trackURL) {
    /*4. Add to playlist and play */
    console.log('Click I\'m in getEmbed')
    SC.oEmbed(trackURL, {
      auto_play: true,
    }).then(function(embed){
      console.log('oEmbed response: ', embed);
      let sideBar = document.querySelector('.js-playlist');
      
      let box = document.createElement('div');
        box.innerHTML = embed.html;
        sideBar.insertBefore(box, sideBar.firstChild);

        localStorage.setItem("key", sideBar.innerHTML)
    });

  }
  
  let sideBar = document.querySelector('.js-playlist');
  sideBar.innerHTML = localStorage.getItem('key');
  

