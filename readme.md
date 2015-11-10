# Yahoo Interview Node Assignment - Qiang Zheng

1. Prerequisite
* First, assuming that you have already insatll Node.js, npm on your computer. 

2. I have already submit the complete files but you can also clone a copy of the git repository from "https://github.com/qiangzheng211/playlist/".

	git clone https://github.com/qiangzheng211/playlist/

3. Execute
* I delete the node modules files for saving space, these modules do not exist, you can get the node modules using:

	npm install

* Start up the server.

	npm start

* The site should be running at http://localhost:3000 (The default broswer that I used for development is chrome)

4. Design decisions
	(1) The number of playlist videos is finite, so I set the maxmimum to be 20. A dropdown to choose from different artists, the number of artists also need to be finite, so I choose to use json file to hold these artists and my API key instead of writing directly in code. This is good to scale, to add, delete and change artists on the json file without changing code.
	(2) When read from artists json file, I choose to read file synchronously instead of asynchronously. Because I tried asynchronous read would fail and I thought deeply that we needed to first read the data from json then we could make query to youtube api to get result. However, asynchronous read did not guarantee the order. 
	(3) I used bootstrap to be the main css framework to make the website look more user-friendly, nice and responsive
	(4) I used Express to get a quick Node.js server base up and npm to install standard modules quickly.
		express playlist
		cd playlist && npm install
    (5) I used Requirejs intergrated with Jquery refer to 
    	http://requirejs.org/docs/jquery.html
    (6) I used googleapis to finish the videos request from clients refer to
        https://www.npmjs.com/package/googleapis
    	https://developers.google.com/youtube/iframe_api_reference
    (7) I used Jade as a templating system, as it is the standard templating system of Express.
    (8) I got some useful information from the search, so I created a container that displays the information of the video currently playing, and change the colors with different status like buffering or pause.

5. Some other things
	I must admit that I am not a guru of nodejs and I do this project while I am learing new things of Node.js. The tutorial from lynda.com (http://www.lynda.com/JavaScript-tutorials/Nodejs-Essential-Training/141132-2.html) is really a great one for beginner like me. I really enjoyed a lot from this task and I learned a lot of useful technologies. I love programming especially front-end web development. Thanks a lot for giving me this opportunity to interview with my dream company-Yahoo! and I wish that we can have a chance to meet in person to chat more about the magic web world.
