$( document ).ready(function() {

  if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {

    var arr_img = ['04-madrid-gran-via.jpg', '1211-nl-serreria-019.jpg', '1211-nl-serreria-044.jpg', 'medialab.jpg']

    var defaults = {
            colorMode: 'color',
            compositeOperation: 'lighten',
            iterationLimit: 0,
            key: 'low',
            lineWidth: 2,
            lineMode: 'smooth',
            origin: ['bottom'],
            outputSize: 'original',
            pathFinderCount: 30,
            speed: 7,
            turningAngle: Math.PI
        };

    var imageElement = document.querySelector('.img_effect');

    $('.img_effect').attr( 'src', 'img/' + arr_img[Math.floor(Math.random() * arr_img.length)] );

    var chromata = new Chromata(imageElement, defaults);

    chromata.start();

  }

});
