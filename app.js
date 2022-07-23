const searchUrl = document.querySelector('#url-video');
const searchBtn = document.querySelector('#search-video');
const resultData = document.querySelector('.result');
const iframe = document.querySelector('.iframe');
const loading = document.querySelector('.loading');
const error = document.querySelector('.error');
const defaultTheme = document.querySelector('.default');

searchBtn.addEventListener('click', function() {
    loading.style.display = 'flex';
    iframe.textContent = '';
    if(searchUrl.value.includes('https://youtu.be/')) {
        searchUrl.value = searchUrl.value.replace('https://youtu.be/', 'https://www.youtube.com/watch?v=');
    }

    let slicedUrl = searchUrl.value.indexOf('watch?v=');
    if(slicedUrl === -1) {
        error.style.display = 'flex';
        defaultTheme.style.display = 'none';
        resultData.textContent = '';
        document.querySelector('.view').textContent = '';
        document.querySelector('.like').textContent = '';
        document.querySelector('.dislike').textContent = '';
        document.querySelector('.rate').textContent = '';
        document.querySelector('.date-create').textContent = '';   
        setTimeout(function() {
            loading.style.display = 'none';
        }, 100)
    } else {
        error.style.display = 'none';
        defaultTheme.style.display = 'none';
        iframe.style.display = 'block';
        resultData.textContent = 'Dữ liệu trả về: ';
        let idVideo = searchUrl.value.slice(slicedUrl + 'watch?v='.length);
        let iframeShow = `
        <iframe src="https://www.youtube.com/embed/${idVideo}" frameborder="0" controls allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        iframe.insertAdjacentHTML('beforeend', iframeShow);
        let endpoint = `https://returnyoutubedislikeapi.com/votes?videoId=${idVideo}`;
        fetch(endpoint)
        .then((response) => response.json())
        .then(data => {
            document.querySelector('.view').textContent = `Số lượt xem video : ${data.viewCount.toLocaleString()}`;
            document.querySelector('.like').textContent = `Số lượt thích : ${data.likes.toLocaleString()}`;
            document.querySelector('.dislike').textContent = `Số lượt không thích : ${data.dislikes.toLocaleString()}`;
            document.querySelector('.rate').textContent = `Đánh giá : ${data.rating.toFixed(1)}/5`;
            document.querySelector('.date-create').textContent = `Dữ liệu cập nhật lần cuối : ${new Date(`${data.dateCreated}`)}`;
           setTimeout(function() {
            loading.style.display = 'none';
           });
        });
    };
    
    searchUrl.value = '';
})
