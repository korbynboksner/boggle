$("#startButton").on("click", start_game);


function start_game(){
    $("#board").show();
    $("#startButton").hide();
    $("#guessBar").show();
    $("#score").show()
    score = 0;
    wordList = new Set();
    time = 60
    $(".guess-word").on("submit", submit);
    t = setInterval(timeher, 1000)
}
function addword(word){
    $(".wordList").append($("<ul>", {text: word}))
}
function addscore(){
    $(".score").text(score)
}
function timeher(){
    time-=1
    $(".timer").text(time)
    if (time===0){
        clearInterval(t)
        
    }
}

async function submit(evt){
    evt.preventDefault();
    const $word = $(".w");
    let word = $word.val();
    if  (!word) return;
    if (wordList.has(word)){
        alert(`already found ${word}`)
    }
    const res = await axios.get("/guess", {params: {word: word }});
    if (res.data.result === "not-word"){
        alert(`${word} is not a valid English word`)
    }
    else if (res.data.result === "not-on-board"){
        alert(`${word} is not found on board`)
    }
    else{
        wordList.add(word);
        score += word.length
        addword(word) 
        addscore()
    }



}