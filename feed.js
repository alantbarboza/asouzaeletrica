$(function(){
    const token = 'YOUR_API_TOKEN';
    const url = "https://graph.instagram.com/me/media?access_token=" + token + "&fields=media_url,media_type,caption,permalink";

    let firstLoad = true;

    if (firstLoad) {
        fetchData();
        firstLoad = false;
    }

    function fetchData() {
        $.get(url)
        .then(function(response){
            let dadosJson = response.data;
            renderFeed(dadosJson);
        })
        .catch(function(error) {
            console.error('Error:', error);
            $('#loadingIcon').removeClass('d-none'); 
            $('#insta').html(''); 
        });
    }

    function renderFeed(data) {
        let conteudo = '<div class="row" style="padding-left:5px">';

        for (let p=0; p < data.length; p++){
            let feed = data[p];
            let titulo = feed.caption !== null ? feed.caption : '';
            let tipo = feed.media_type;
            if(tipo === 'VIDEO'){
                conteudo += '<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4"><video style="width:100%; height:90%" controls><source src="'+feed.media_url+'" type="video/mp4"></video></div>';
            }else {
                conteudo += '<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4"><img style="width: 100%; height: 90%" title="'+titulo+'" alt="'+titulo+'" src="'+feed.media_url+'" onclick="window.open(\''+feed.permalink+'\');"></div>';
            }
        }
        conteudo += '</div>';
        $('#insta').html(conteudo);
    }
});
