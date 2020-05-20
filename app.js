const top_artists = require("./top_artists");


const main = async () => {
    const art = await top_artists("37i9dQZEVXbMDoHDwVN2tF");
    console.log(art);
}

main();