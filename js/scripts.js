var HangMan = {
  initialize: function(word) {
    this.word = word;
    this.splitWord = this.word.split("");
    this.wrong = [];
    this.blank = [];
    var blank = this.blank;
    this.splitWord.forEach(function(letter){
      blank.push("_");
    });

    this.startingPenalty = 0;
    this.maxPenalty = 6;
  },
  letterCheck: function(letter) {
    var splitWord = this.splitWord;
    for(var i = 0; i < splitWord.length; i++ ){
      if(letter === splitWord[i]) {
        return true;
      }
    }
    return false;

    // var correctLetter = splitWord.every(function(wordLetter) {
    //   return wordLetter === letter
    // });

    // if (correctLetter) {
    //   this.correctLetter(letter)
    // } else {
    //   this.wrongLetter(letter)
    // }
  },

  wrongLetter: function(wrongLetter) {
    this.startingPenalty += 1;
    this.wrong.push(wrongLetter);
  },

  correctLetter: function(correctLetter) {
    var blank = this.blank;
    var splitWord = this.splitWord;
    splitWord.forEach(function(letter,index) {
      if(letter === correctLetter){
        blank[index] = correctLetter;
      }
    });
  }
};

$(document).ready(function() {

  var dictionary = ["curling","snowboarding","skiing","bmx","skating","rodeo","boxing","frisbee","tabletennis","volleyball","lacrosse","polo","swimming","racing","bowling","tennis","hockey","baseball","football","golf", "cricket", "darts", "rugby", "fish", "pool", "track", "soccer"];
  var randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];

  var myHangman = Object.create(HangMan);
  myHangman.initialize(randomWord);

  $("p#correct").text(myHangman.blank);
  $("span#life-count").text(myHangman.maxPenalty - myHangman.startingPenalty);

  $("form#letters").submit(function(event) {
    event.preventDefault();
    var letter = $("input#input").val();
    letter = letter.toLowerCase();
    if (myHangman.letterCheck(letter)){
      myHangman.correctLetter(letter);
      $("p#correct").text(myHangman.blank);
    } else {
      myHangman.wrongLetter(letter);
      $("span#life-count").text(myHangman.maxPenalty - myHangman.startingPenalty);
      $("#man" + myHangman.startingPenalty.toString()).show();
      $("#wrong").text(myHangman.wrong);
    }
    $("input#input").val("");

    if ((myHangman.maxPenalty - myHangman.startingPenalty) === 0){
      $("#loose").show();
      $("#gameoverlogo").show();
      $("#correct").text("The word was: " + randomWord);
      $("form").hide();
      $("#wrong").hide();
      $("#couch").hide();
      $("#man1").hide();
      $("#title").hide();
      $("#haha").show();
    }
    $("#loose").last().click(function(){
      location.reload();
    });

    if(myHangman.blank.join("") === myHangman.splitWord.join("") && myHangman.startingPenalty === 0) {
      $("#hooray").show();
      $("#perfect").show();
    } else if(myHangman.blank.join("") === myHangman.splitWord.join("")) {
      $("#winner").show();
    };

    $("#winner").last().click(function(){
      location.reload();
    });
  });
});



















