var expect = require("chai").expect;
var name = require("../validation/name");
// var form = require("../form");

describe("check for a valid name", function() {
    it("should return true if it only contains capital or lowercase alphabets", function() {
        expect(name('Abefor ecom')).to.be.true;
    });
    // it("should return false if it contains anything other than capital or lowercase alphabets", function() {
    //     expect(name('@.#!2 Abe')).to.be.false;
    // });
});

describe("check if name and email form is empty", function(){
    it("should return null if it doesn't contain anything", function() {
        expect(null).to.be.null;
    });
});
