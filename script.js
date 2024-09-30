let input = document.querySelector(".search-box input");
let btn = document.querySelector(".btn button");
let images = document.querySelector(".images");
let load = document.querySelector("#load");

const accesskey = "Mko9PS7lAOIkOvXeUfimoMs-R-E6nUGSKsg5egUfoIg";
let page = 1;

function download(imgurl) {
    fetch(imgurl)
        .then(res => res.blob())
        .then(file => {
            let a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = `image_${new Date().getTime()}.jpg`; // dont forgot to follow me on instagram.  for more such projects
            a.click();
        })
        .catch(() => alert("Failed to download image"));
}

async function getresponse() {
    let keyword = input.value;
    let url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=20`;

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        let data = await response.json();
        let result = data.results;

        if (page === 1) {
            images.innerHTML = ""; 
        }
        load.style.display = "block";

        result.forEach((item) => {
            let li = document.createElement("li");
            li.classList.add("image");

            if (item.preview_photos && item.preview_photos.length > 0) {
                let html = `
                    <img src="${item.preview_photos[0].urls.small}" alt="img" class="photo">
                    <div class="details">
                        <div class="user">
                            <img src="camera.svg" alt="img">
                            <span>${item.title}</span>
                        </div>
                        <div class="download" onclick="download('${item.preview_photos[0].urls.small}')">
                            <img src="download.svg" alt="img">
                        </div>
                    </div>`;
                li.innerHTML = html;
                images.appendChild(li);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


btn.addEventListener("click", () => {
    page = 1; 
    getresponse(); 
});

load.addEventListener("click", () => {
    page++; 
    getresponse(); 
});


input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        page = 1; 
        getresponse(); 
    }
});





