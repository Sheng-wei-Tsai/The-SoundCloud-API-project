/*1.  Search */





/*2. Query SOundcloud API */

SC.initialize({
  client_id: 'cd9be64eeb32d1741c17cb39e41d254d',
});

// find all sounds of buskers licensed under 'creative commons share alike'
SC.get('/tracks', {
  q: 'rilo kiley', license: 'cc-by-sa'
}).then(function(tracks) {
  console.log(tracks);
});
// q 是 params

/*3. Display the cards */


/*4. Add to playlist and play */