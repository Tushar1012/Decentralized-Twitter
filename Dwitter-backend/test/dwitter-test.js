const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dwitter", function () {
  it("test dwitter ", async function () {
    const Dwitter = await ethers.getContractFactory("Dwitter");
    const [user1,user2] = await ethers.getSigners();
    const dwitter = await Dwitter.deploy();
    await dwitter.deployed();

    // start testing
    await dwitter.signup("Tush","Tushar","some bio", "someurl");
    console.log("signing for user tush..");

    const user = await dwitter.users("Tush");
    expect(user.name).to.equal("Tush");
    expect(user.bio).to.equal("some bio");
    expect(user.avatar).to.equal("someUrl");
    console.log("Test signup is successful");



    expect(await dwitter.usernames(user1.address)).to.equal("Tush");
    await expect(dwitter.signup("","","","")).to.be.revertedWith("User already exists");
    console.log("test user alredy exists error");

    await expect(
      dwitter
      .connect(user2)
      .signup("Tush","Tushar","some other bio","SomeAvatar")
    ).to.be.revertedWith("Username is taken , please try another one.");
    console.log("test username is taken");

    await dwitter.postDweet("hello tanish");
    expect((await dwitter.dweets(0)).content).to.equal("Helo mr tnish"); 
    //console.log(dweet);


  });
});
















