describe("HangMan", function() {
  describe("initialize", function() {
    it("sets a word and a few other properties", function() {
      var myHangman = Object.create(HangMan);
      myHangman.initialize("cricket");
      myHangman.word.should.equal("cricket");
      myHangman.splitWord.should.eql(["c","r","i","c","k","e","t"]);
      myHangman.blank.should.eql(["_","_","_","_","_","_","_"]);
      myHangman.wrong.should.eql([]);
      myHangman.startingPenalty.should.equal(0);
      myHangman.maxPenalty.should.equal(6);
    });
  });
  describe("letterCheck", function() {
    it("checks the letter inputted and checks if it is in the word", function() {
      var myHangman = Object.create(HangMan);
      myHangman.initialize("cricket");
      myHangman.letterCheck("i").should.equal(true);
    });
  });
  describe("wrongLetter", function() {
    it("if the users letter isn't present in the word, add one point penalty", function() {
      var myHangman = Object.create(HangMan);
      myHangman.initialize("cricket");
      myHangman.wrongLetter("x");
      myHangman.startingPenalty.should.equal(1);
    });
  });
  describe("correctLetter", function() {
    it("fills in the letter of the blank array", function(){
      var myHangman = Object.create(HangMan);
      myHangman.initialize("cricket");
      myHangman.correctLetter("c");
      myHangman.blank.should.eql["c","_","_","c","_","_","_"];
    });
  });
});
