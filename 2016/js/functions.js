
function setupScrolling(){
  var offset = 100;
  $('.iclc-sidebar li a').click(function(event) {
      event.preventDefault();
      $($(this).attr('href'))[0].scrollIntoView();
      scrollBy(0, -offset);
  });
  $('.iclc-sidebar ul').on('activate.bs.scrollspy', function () {
    item = $('.iclc-sidebar ul').find(".active").last();
    item.animatescroll({element: '.iclc-sidebar ul', padding:20});
  });
  $('.iclc-sidebar ul').affix({
    offset: {
        top: 340,
        bottom: 100
    }
}).on('affix.bs.affix', function () { // before affix
    $(this).css({
        /*'top': headerHeight,*/    // for fixed height
            'width': $(this).outerWidth()  // variable widths
    });
}).on('affix-bottom.bs.affix', function () { // before affix-bottom
    $(this).css('bottom', 'auto'); // THIS is what makes the jumping
});


}
function setupAnalytics(){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-58060921-1', 'auto');
  ga('send', 'pageview');
}
function setupMenu() {

  var items = [
    'images/403-flat.jpg',
    'images/urban-flat.jpg',
    'images/industry-flat.jpg',
    'images/sky-flat.jpg'
  ];
  if (!window.location.href.includes('travel')){
    items.push('images/sherman-flat.jpg');
  }
  console.log(items);
  var item = items[Math.floor(Math.random()*items.length)];
  $('body').css({'background-image':'url('+item+')'});

  $('<div class="navbar-header">'+
       '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#iclc-navbar-collapse-1">'+
           '<span class="sr-only">Toggle navigation</span>'+
           '<span class="icon-bar"></span>'+
           '<span class="icon-bar"></span>'+
           '<span class="icon-bar"></span>'+
       '</button>'+
       '<a class="navbar-brand" href="http://iclc.livecodenetwork.org/2016/"><img src="images/ICLC-Website-Logo-2016-300.png" alt="ICLC 2016"></a>'+
   '</div>'+
   '<div class="navbar-collapse collapse" id="iclc-navbar-collapse-1">'+
       '<ul class="nav navbar-nav navbar-right">'+
       '<li class="dropdown">'+
         '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Calls <span class="caret"></span></a>'+
           '<ul class="dropdown-menu">'+
              '<li><a href="original-call.html">Original Call</a></li>'+
              '<li><a href="late-breaking-call.html">Late Breaking Call</a></li>'+
           '</ul>'+
       '</li>'+
         '<li><a href="travel.html">Travel</a></li>'+
         '<li><a href="schedule.html">Schedule</a></li>'+
         '<li class="dropdown">'+
           '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Proceedings <span class="caret"></span></a>'+
             '<ul class="dropdown-menu">'+
                /*'<li><a href="keynotes.html">Keynotes</a></li>'+*/
                '<li><a href="papers.html">Papers</a></li>'+
                '<li><a href="performances.html">Performances</a></li>'+
               '<li><a href="workshops.html">Workshops</a></li>'+
             '</ul>'+
         '</li>'+
         '<li class="dropdown">'+
           '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Community<span class="caret"></span></a>'+
           '<ul class="dropdown-menu">'+
             '<li><a href="team.html">Team</a></li>'+
             '<li><a href="coc.html">Code of Conduct</a></li>'+
             /*'<li><a href="community.html">About Live Coding</a></li>'+*/
           '</ul>'+
         '</li>'+
         '<li>'+
             '<li><a href="https://www.facebook.com/livecodenet/"><i class="fa fa-facebook"></i></a></li>'+
         '</li>'+
         '<li>'+
             '<li><a href="https://www.youtube.com/channel/UCN-9RKW_izkIUMH0eQ60H2g/videos"><i class="fa fa-youtube"></i></a></li>'+
         '</li>'+
         '<li>'+
             '<li><a href="https://twitter.com/livecodenet/lists/iclc2015-people"><i class="fa fa-twitter"></i></a></li>'+
         '</li>'+


       '</ul>'+
   '</div>').appendTo('nav .container');
   var url = window.location;

    $('#iclc-navbar-collapse-1 a').filter(function() {
        return this.href == url;
    }).parent().addClass('active').parent().parent().addClass('active');

    $('<div id="bannerText" class="container"></div>').insertBefore('.main-content');


 }

/*col-md-9*/
 function setupFooter(){
   $('<footer>'+

      '<div class="container">'+
        '<div class="row">'+
          '<div class="col-md-9">'+
            '<div id="footerLogo">'+'</div>'+
            /*'<div id="partnerLogos" >'+'</div>'+*/
          '</div>'+
        '</div>'+
      '</div>'+
        '<div id="theCopyrights">'+
          '<div id="copyrightNotice" class="col-md-6">'+
            '&copy 2016 International Conference on Live Coding'+
          '</div>'+
          '<div id="siteDesign" class="col-md-6">'+
            'Website design and header photography by <a style="color:#fff;" href="http://www.nsitu.ca">Harold Sikkema</a>.'+
          '</div>'+
        '</div>'+
    '</footer>').appendTo('body');
 }
