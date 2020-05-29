const Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "7e9e0cdf55d049faace303b46fe6ab4a",
    secret: "8d587fe4a9734d239d4048a9d9fd1f79"
});

module.exports = async (playlist_id) => {
    let res;
    return new Promise((success, error) => {
        spotify.request('https://api.spotify.com/v1/playlists/' + playlist_id)
        .then(async function(data) {
           success(get_sorted_artist_count(data));
        })
        .catch(async function(err) {
          error(err); 
        });
    });

    return res; 
};

const get_sorted_artist_count = (data) => {
    let artist_count = [];

    const tracks = data.tracks.items;
    for(let i = 0; i < tracks.length; i++) {
        const artists = tracks[i].track.artists;
        for(let j = 0; j < artists.length; j++) {
            if(artist_count[artists[j].name]) {
                artist_count[artists[j].name].count++;
            } else {
                artist_count[artists[j].name] = {
                    name: artists[j].name,
                    count: 1
                };
            }
        }
    }

    let res = [];
    for(key in artist_count) {
        const it = artist_count[key];
        let inserted = false;
        for(let i = 0; i < res.length; i++) {
            if(it.count > res[i].count) {
                res.splice(i, 0, it);
                inserted = true;
                break;
            }
        }
        if(!inserted) res.push(it);
    }

    return {
        sorted_list: res,
        name: data.name,
        imgs: data.images,
        owner_name: data.owner.display_name
    };
}