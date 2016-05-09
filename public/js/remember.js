//API keys
var giphyKey = "&api_key=dc6zaTOxFJmzC"; //Public Giphy API KEY

var alchemyKey = "add your alchemy API Key Here";

//objects
var tilRecord; //for TIL API object
var giphyRecord; //for Giphy search object

//global variables
var tilText; //for keyword extratcted gif search
var searchTerm;
var searchType;
var resultsArray;

function init() {
    getTILJSON();
    // autoReload(); // will auto reload the page
}

function getTILJSON() {
    jQuery.ajax({
        url: '/api/get',
        dataType: 'json',
        success: function(response) {
            tilRecord = response.record;
            loadEntry();
        }
    })
}

function autoReload() {
    setInterval(function() {
        console.log("auto reload");
        loadEntry();
    }, 7000);
}

function loadEntry() {
    jQuery("#record-display").empty(); //clear old entry
    var i = tilRecord[Math.floor(Math.random() * tilRecord.length)]; //get random entry
    var date = new Date(i.dateAdded); //convert entry date into a date object
        var htmlToAdd = '<div class="col-md-12">' +
            '<h4><span class ="displayDate">' + date.toDateString() + '</span></h4>' + //human readable date
            '<p><span class="displayTil">' + i.til + '</span></p>' +
            '</div>';

    jQuery("#record-display").append(htmlToAdd); //add new entry
    tilText = i.til; //Alchemy input text
    passAlchemy(tilText);
}

function passAlchemy(tilText) {
    console.log("characters sent: " + tilText.length);
    params = {
        text: tilText,
        apikey: alchemyKey,
        outputMode: 'json'
    }
    //only use one of these methods, keywords works the best for individual entries
    getKeywords(params);
    // getConcepts(params);
    // getTaxnonomy(params);
    // getEmotion(params);
    // getSentiment(params);
}

function getKeywords(params) {
    resultsArray = []; //creates array to store results
    searchType = "keywords";
    url = 'https://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords';

    $.ajax({
        type: "POST",
        url: url,
        data: params,
        success: function(data) {
            $.each(data.keywords, function(i, results) {
                resultsArray.push(results.text);
            })
            console.log("keywordArray: " + resultsArray);
            var j = resultsArray[Math.floor(Math.random() * resultsArray.length)];
            searchTerm = j;
            console.log("search term from Alchemy keyword: " + j)
            searchGiphy(resultsArray, searchTerm, searchType);
        },
        dataType: 'json'
    });
}

function getConcepts(params) {
    resultsArray = []; //creates array to store results
    searchType = "concepts";
    url = 'https://gateway-a.watsonplatform.net/calls/text/TextGetRankedConcepts';
    $.ajax({
        type: "POST",
        url: url,
        data: params,
        success: function(data) {
            $.each(data.concepts, function(i, results) {
                resultsArray.push(results.text);
            })
            console.log("concepts: " + resultsArray);
            var j = resultsArray[Math.floor(Math.random() * resultsArray.length)];
            searchTerm = j;
            console.log("search term from Alchemy concept: " + j)
            searchGiphy(resultsArray, searchTerm, searchType);
        },
        dataType: 'json'
    });
}

function getTaxnonomy(params) {
    resultsArray = []; //creates array to store results
    searchType = "taxonomies";
    url = 'https://gateway-a.watsonplatform.net/calls/text/TextGetRankedTaxonomy';
    $.ajax({
        type: "POST",
        url: url,
        data: params,
        success: function(data) {
            $.each(data.taxonomy, function(i, results) {
                resultsArray.push(results.label);
            })
            console.log("taxonomies: " + resultsArray);
            var j = resultsArray[Math.floor(Math.random() * resultsArray.length)];
            searchTerm = j;
            searchGiphy(resultsArray, searchTerm, searchType);
        },
        dataType: 'json'
    });
}

//needs work
function getEmotion(params) {
    resultsArray = []; //creates array to store results
    searchType = "emotion scores";
    url = 'https://gateway-a.watsonplatform.net/calls/text/TextGetEmotion';
    $.ajax({
        type: "POST",
        url: url,
        data: params,
        success: function(data) {
            console.log("anger score: " + data.docEmotions.anger);
            console.log("disgust score: " + data.docEmotions.disgust);
            console.log("fear score: " + data.docEmotions.fear);
            console.log("joy score: " + data.docEmotions.joy);
            console.log("sadness score: " + data.docEmotions.sadness);
        },
        dataType: 'json'
    });
}

//needs work
function getSentiment(params) {
    var sentimentArray = []; //creates array to store results
    url = 'https://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment';
    $.ajax({
        type: "POST",
        url: url,
        data: params,
        success: function(data) {
            sentimentArray.push(data.docSentiment.type);
            console.log("sentiment " + sentimentArray);
            console.log("sentiment score " + data.docSentiment.score);
        },
        dataType: 'json'
    });
}

function searchGiphy(resultsArray, searchTerm, searchType) {
    var api = "https://api.giphy.com";
    var searchGif = "/v1/gifs/search?";
    var query = "&q=";
    $.ajax({
        url: api + searchGif + query + searchTerm + giphyKey,
        dataType: 'json',
        success: function(response) {
            giphyRecord = response.data;
            giphyBackground(giphyRecord);
        }
    })
}

function giphyBackground() {
    jQuery("#giphy-display").empty();
    var i = giphyRecord[Math.floor(Math.random() * giphyRecord.length)]; //random giphy from results
    var htmlToAdd = '<img src="' + i.images.original.url + '">';
    jQuery("#giphy-display").append(htmlToAdd);
 
}

window.addEventListener('load', init())
