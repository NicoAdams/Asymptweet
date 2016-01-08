// Util functions

function lastChar(text) {
	return text.charAt(text.length-1)
}

function removeLastChar(text) {
	return text.substr(0, text.length-1)
}

function toNearest(num, roundNum) {
	return num - num%roundNum
}

// Edits the text to become smaller as it progresses
function processTextExponential(text) {
	// Initialization settings
	settings = {
		initSize: 25,
		sizeRatio: 0.987
	}
	
	newText = ""
	currSize = settings.initSize
	for(var i=0; i<text.length; i++) {
		currChar = text.charAt(i)
		
		effCurrSize = currSize // Room to round it if needed
		
		newText += '<span style="font-size:'+String(effCurrSize)+'">'
		newText += currChar
		newText += "</span>"
		
		// Adjusts the next size
		currSize *= settings.sizeRatio
	}
	
	return newText
}

// Edits the text to become smaller as it progresses
function processTextInversePower(text) {
	// Initialization settings
	settings = {
		initSize: 25,
		shrinkRate: 0.02,
		power: 1
	}
	
	newText = ""
	currSize = settings.initSize
	for(var i=0; i<text.length; i++) {
		currChar = text.charAt(i)
		effCurrSize = settings.initSize
		
		newText += '<span style="font-size:'+String(effCurrSize)+'">'
		newText += currChar
		newText += "</span>"
		
		// Adjusts the next size
		currSize *= settings.sizeRatio
	}
	
	return newText
}

processText = processTextExponential

// Adds a post containing text postText
function addPost(postText) {
	
	open = '<tr class="post_row"><td class="post_cell">'
	close = '</td></tr>'
	content = processText(postText)
	
	element = open+content+close
	feed = $("#feed_body")[0]
	feed.insertAdjacentHTML("afterbegin", element)
}

function clearPostBox() {
	writePostBox.value = ""
}

// Adds the user's post from the post box
function publishPost() {
	if(writePostBox.value == "") {return}
	text = writePostBox.value
	addPost(text)
	clearPostBox()
}

// Page setup

window.onload = function() {
	writePostBox = document.getElementById("text_area")
	
	$(document).ready(function() {
		$("#text_area").keypress(function(event) {
			if(event.which == '13') {
				return false;
			}
		});
	});
	
	// Press enter to post
	writePostBox.onkeydown = function(event) {
		if(event.keyCode == 13) {
			publishPost()
		}
	}
}