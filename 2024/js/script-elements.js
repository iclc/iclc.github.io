/* PUBLISHING TOOLS */

// deactivated links
let publishStream = false;
let publishTable = false;
let publishCatalogue = false;
let publishWorkshops = false;
let publishMap = false;
let publishTickets = false;
let publishSatellite = false;
let publishCall = false;

// activated links
let publishRegistration = true;
let publishTravel = true;
let publishVenues = true;
let publishAbout = true;

function navigationBar() {
	document.body.innerHTML += `
	<!-- Navigation-->
	<nav class="navbar navbar-expand-lg navbar-black fixed-top" id="mainNav">
		<div class="container px-4 px-lg-5">
			<a class="navbar-brand" href="./index.html">ICLC 2024</a>
			<button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<i class="fas fa-bars"></i>
			</button>
			<div class="collapse navbar-collapse" id="navbarResponsive">
				<ul class="navbar-nav ms-auto">
				${(publishStream) ? `<li class="nav-item blink"><a class="nav-link" target="_blank" href="https://www.youtube.com/watch?v=FSBtvtxP008">Stream</a></li>` : ''}
				${(publishTable) ? `<li class="nav-item"><a class="nav-link" href="./timetable.html">Timetable</a></li>` : ''}
				${(publishCatalogue) ? `<li class="nav-item"><a class="nav-link" href="./catalogue/">Catalogue</a></li>` : ''}
				${(publishRegistration) ? `<li class="nav-item"><a class="nav-link" href="./registration.html">Registration</a></li>` : ''}
				${(publishTickets) ? `<li class="nav-item"><a class="nav-link" href="./tickets.html">Tickets & Info</a></li>` : ''}
				${(publishWorkshops) ? `<li class="nav-item"><a class="nav-link" href="./workshops.html">Workshops</a></li>` : ''}
				${(publishMap) ? `<li class="nav-item"><a class="nav-link" href="./map.html">Map</a></li>` : ''}
				${(publishVenues) ? `<li class="nav-item"><a class="nav-link" href="./venues.html">Venues</a></li>` : ''}
				${(publishTravel) ? `<li class="nav-item"><a class="nav-link" href="./travel-stay.html">Travel & Stay</a></li>` : ''}
				${(publishSatellite) ? `<li class="nav-item"><a class="nav-link" href="./satellite.html">Satellite Events</a></li>` : ''}
				${(publishCall) ? `<li class="nav-item"><a class="nav-link" href="./open-call.html">Open Call</a></li>` : ''}
				${(publishAbout) ? `<li class="nav-item"><a class="nav-link" href="./about.html">About</a></li>` : ''}
					<!--<li class="nav-item"><a class="nav-link" href="#signup">Contact</a></li>-->
				</ul>
			</div>
		</div>
	</nav>`;
}

function header(id, head = '') {
	let d = document.getElementById(id);
	d.innerHTML += `
	<div class="container px-4 px-lg-5">
		<div class="row gx-4 gx-lg-5 justify-content-center">
			<div class="col-lg-8">
			<h1 class="mt-5 mb-5" id="themes">${head}</h1>
			</div>
		</div>
	</div>`;
}

function backgroundImage(url = '') {
	document.body.innerHTML += `
		<div class="dimmed-background" style="background-image: url('${url}');">
			<div class="dimmed-gradient"></div>
		</div>
  `
}

function mainContainer() {
	document.body.innerHTML += `
	<div class="container px-4 px-lg-5">
		<div class="row gx-4 gx-lg-5 justify-content-center">
			<div class="col-lg-9" id="main-container">

			</div>
		</div>
	</div>
	`
}

function heroTitle(id, title = '', links = '') {
	let d = document.getElementById(id);
	d.innerHTML += `
		<div class="hero-title">
			<h1 class="text-white font-weight-bold">${title}</h1>
			<hr/>
			<div>
				${links}
			</div>
			<div class="scroll-indicator">╲╱</div>
		</div>
	`;
}

function section(id, className) {
	let d = document.getElementById("main-container");
	d.innerHTML += `
	  <section class=${className} id=${id}></section>
	`
}

function menu(id, txt = '') {
	// will be removed.
	let d = document.getElementById(id);
	d.innerHTML += `
		<h4>
			<ul class="mt-5 mb-1">
				${txt}
			</ul>
		</h4>
	`;
}

function horizontalLine(id, marginTop = 5) {
	let d = document.getElementById(id);
	d.innerHTML += `
		<hr class="mt-${marginTop}" />
	`;
}

function heading(id, head = '', level = 2, marginTop = 1, marginBottom = 5) {
	let d = document.getElementById(id);
	if (level < 1 || level > 6) level = 2;
	d.innerHTML += `<h${level} class="mt-${marginTop} mb-${marginBottom}" id="themes">${head}</h${level}>`;
}

function paragraph(id, txt = '') {
	let d = document.getElementById(id);
	d.innerHTML += `
		<p>${txt}</p>
	`;
}

function heading_paragraph(id, head = '', txt = '') {
	let d = document.getElementById(id);
	d.innerHTML += `
		<h2 class="mt-2 mb-5" id="themes">${head}</h2>
		<p>${txt}</p>
	`;
}

function html(id, html = '') {
	let d = document.getElementById(id);
	d.innerHTML += html;
}

function buttonBox(id, head = '', txt = '', buttons = '', bgColor = '#260b4d') {
	let d = document.getElementById(id);
	d.innerHTML += `
		<div class="button-box rounded-lefttop" style="background-color:${bgColor}">
		  <div class="button-box-text">
				<h4>${head}</h4>
				<p>
					${txt}
				</p>
			</div>
			<div class="button-box-buttons">
				${buttons}
			</div>
		</div>
	`;
}


function googleMap(id, src, width = "100%", height = "500") {
	let d = document.getElementById(id);
	d.innerHTML += `
		<iframe src="${src}" width="${width}" height="${height}"></iframe>
	`;
}

function satelliteEvent(id, anchor = '', head = '', txt = '') {
	let d = document.getElementById(id);
	d.innerHTML += `
		<h2 class="mt-5 mb-5" id="${anchor}">${head}</h2>
		<p>${txt}</p>
	`;
}

function workshop(id, anchor = '', title = '', artists = '', date = '', venue = '', text = '', requirements = '', bio = '') {
	let d = document.getElementById(id);
	d.innerHTML += `
		<h3 class="mt-5 mb-5" id="${anchor}">${title}</h3>
		<p><b>Date:</b> ${date}<br>
		<b>Location:</b> ${venue}<br>
		<b>Host${artists.includes(",") ? "s" : ""}:</b> ${artists}</p>
		<p>${text}</p>
		<p><b>Requirements:</b> ${requirements}</p>
		<p><em>${bio}</em></p>
		<hr />
	`;

	let o = document.getElementById("workshops-overview");
	o.innerHTML += `
		<li><a href="#${anchor}"><b>${title}</b></a></li>
	`;
}

function workshop_date(date = '') {
	let o = document.getElementById("workshops-overview");
	o.innerHTML += `
		<li style="list-style: none;" class="mt-3 mb-2">${date}<br></li>
	`;
}

function paragraphImageLeft(id, img = '', head = '', txt = '',) {
	let d = document.getElementById(id);
	d.innerHTML += `
		<div class="row gx-0 justify-content-center">
			<div class="col-lg-6">
				<img class="img-fluid" src="${img}" alt="..." />
			</div>
			<div class="col-lg-6">
				<div class="h-100 project">
					<div class="d-flex h-100">
						<div class="project-text w-100 my-auto text-lg-left">
						<h4 class="mt-5 mb-3">${head}</h4>
						<p class="mb-0 text-white-50">${txt}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
}

function paragraphImageRight(id, img = '', head = '', txt = '',) {
	let d = document.getElementById(id);
	d.innerHTML += `
		<div class="row gx-0 justify-content-center">
			<div class="col-lg-6">
				<img class="img-fluid" src="${img}" alt="..." />
			</div>
			<div class="col-lg-6 order-lg-first">
				<div class="h-100 project">
					<div class="d-flex h-100">
						<div class="project-text w-100 my-auto text-lg-right">
						<h4 class="mt-5 mb-3">${head}</h4>
						<p class="mb-0 text-white-50">${txt}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
}

// <!-- Featured Project Row-->
// <!-- <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
// 	<div class="col-xl-8 col-lg-7"><img class="img-fluid mb-3 mb-lg-0" src="assets/img/algo1.jpg" alt="..." /></div>
// 	<div class="col-xl-4 col-lg-5">
// 		<div class="featured-text text-center text-lg-left">
// 			<h4>Shoreline</h4>
// 			<p class="text-white-50 mb-0">Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!</p>
// 		</div>
// 	</div>
// </div> -->
// <!-- Project One Row-->

function socials() {
	document.body.innerHTML += `
	<section class="contact-section">
		<div class="container px-4 px-lg-5">
			<div class="social d-flex justify-content-center">
				<a class="mx-3" href="mailto:shanghai.iclc24@nyu.edu"><i class="fa-regular fa-envelope"></i></a>
				<!-- <a class="mx-3" href="https://t.me/iclc2024" target="blank"><i class="fab fa-telegram"></i></a> -->
				<a class="mx-3" href="https://discord.com/channels/790732544491913216/790984416629358632" target="blank"><i class="fab fa-discord"></i></a>
				<!-- <a class="mx-3" href="https://assemblag.es/@incolico" target="blank"><i class="fab fa-mastodon"></i></a> -->
				<!-- <a class="mx-3" href="https://www.instagram.com/iclc_2024/" target="blank"><i class="fab fa-instagram"></i></a> -->
				<!-- <a class="mx-3" href="https://www.facebook.com/livecodenet" target="blank"><i class="fab fa-facebook"></i></a> -->
				<!-- <a class="mx-3" href="https://www.youtube.com/@Eulerroom" target="blank"><i class="fab fa-youtube"></i></a> -->
				<!-- <a class="mx-3" href="https://twitter.com/incolico" target="blank"><i class="fab fa-twitter"></i></a> -->
			</div>
		</div>
	</section>`
}

// UNUSED CONTACT SECTION FROM TEMPLATE
// <!-- <div class="row gx-4 gx-lg-5">
// 	<div class="col-md-4 mb-3 mb-md-0">
// 		<div class="card py-4 h-100">
// 			<div class="card-body text-center">
// 				<i class="fas fa-map-marked-alt text-primary mb-2"></i>
// 				<h4 class="text-uppercase m-0">Address</h4>
// 				<hr class="my-4 mx-auto" />
// 				<div class="small text-black-50">4923 Market Street, Orlando FL</div>
// 			</div>
// 		</div>
// 	</div>
// 	<div class="col-md-4 mb-3 mb-md-0">
// 		<div class="card py-4 h-100">
// 			<div class="card-body text-center">
// 				<i class="fas fa-envelope text-primary mb-2"></i>
// 				<h4 class="text-uppercase m-0">Email</h4>
// 				<hr class="my-4 mx-auto" />
// 				<div class="small text-black-50"><a href="#!">hello@yourdomain.com</a></div>
// 			</div>
// 		</div>
// 	</div>
// 	<div class="col-md-4 mb-3 mb-md-0">
// 		<div class="card py-4 h-100">
// 			<div class="card-body text-center">
// 				<i class="fas fa-mobile-alt text-primary mb-2"></i>
// 				<h4 class="text-uppercase m-0">Phone</h4>
// 				<hr class="my-4 mx-auto" />
// 				<div class="small text-black-50">+1 (555) 902-8832</div>
// 			</div>
// 		</div>
// 	</div>
// </div> -->

function spacer(id, h = "1rem") {
	let d = document.getElementById(id);
	d.innerHTML += `
		<div style="height: ${h}"> </div>
		`;
}


function footer() {
	let c = 'ICLC 2024';
	document.body.innerHTML += `
	<footer class="footer small text-center text-white-50">
		<div class="container px-4 px-lg-5">
		  Copyright &copy; ${c}
	  </div>
  </footer>
	`
}