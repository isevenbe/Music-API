{
  // Small library for myself   
  const createNode = (element) => {
    return document.createElement(element);
  }

  const appendNode = (parent, element) => {
    return parent.append(element);
  }
  const selectHTML = (element) => {
    return document.querySelector(element)
  }

  const createListOfArtist = data => {
    const selectMyList = selectHTML(".results");
    data.map(function (artist) {
      let li = createNode("li");
      let a = createNode("button");
      a.innerHTML = `${artist.name}`;
      a.id = `${artist.id}`;
      appendNode(li, a);
      appendNode(selectMyList, li);

      selectArtist = document.getElementById(`${artist.id}`);
      selectArtist.addEventListener("click", () => {
        selectHTML(".artist").innerHTML = artist.name;
        urlID = `https://musicdemons.com/api/v1/artist/${artist.id}/songs`
        createListOfVideo();
      });
    })
  }

  const createListOfVideo = () => {
    fetch(urlID).then((resp) => resp.json()).then(function (data) {
      data.map(function (ID) {
        let songSelect = selectHTML(".songs");
        let liSong = createNode("li");
        let iframe = createNode("iframe");
        iframe.setAttribute('min-width', '600');
        iframe.setAttribute('min-height', '400');
        iframe.setAttribute("src", `https://www.youtube.com/embed/${ID.youtube_id}`);
        appendNode(liSong, iframe);
        appendNode(songSelect, liSong);
      })

    })

  }



  const search = value => {
    let url = `https://musicdemons.com/api/v1/artist/autocomplete`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(value)
    })

      .then((resp) => resp.json())
      .then(dataResult => createListOfArtist(dataResult))
  };



  const handleKeyUpSearch = e => {
    const $input = e.currentTarget;
    search($input.value);
  };

  const init = () => {
    document.querySelector(`.search`).addEventListener(`keyup`, handleKeyUpSearch);
  };

  init();

}