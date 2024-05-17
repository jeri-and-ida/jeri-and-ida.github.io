const sleep = (t) => new Promise(r => setTimeout(r, t));

var
	audio,
	clickme,
	curtain,
	main,
	mainText;



window.onload = () => {
	audio = document.getElementById("sound");
	clickme = document.getElementById("clickme-container");
	curtain = document.getElementById("curtain-plane");
	main = document.getElementById("main-container");
	mainText = document.getElementById("main-text");

	audio.pause();
}



function fadeIn (elem, time, mode) {
	elem.style.display = "";
	elem.style.animation = `fade ${time}s ${mode}`;
	return sleep(time * 1_000);
}


function startAudio () {
	let audio = document.getElementById("sound");
	
	audio.volume = 0;
	audio.play();

	let fadeIn = setInterval(() => {
		if (audio.volume < 0.99)
			audio.volume += 0.005;
		else
			clearInterval(fadeIn);
	}, 100);
}



async function spit (str, time) {
	for (c of str.split(""))
	{
		mainText.innerHTML += c;
		await sleep(time);
	}
}

async function clicker () {
	mainText.classList.remove("hidden");

	spit("Happy 20th, my love.", 100);
	await sleep(10_000);

	mainText.classList.add("hidden");
}


async function clickmeAction () {
	await fadeIn(curtain, 2, "");

	document.getElementsByTagName("body")[0].style.cursor = "none";
	
	startAudio();
	await fadeIn(main, 10, "ease-in");

	await sleep(16_000);

	clicker();
}
