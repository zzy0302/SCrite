pragma solidity ^0.4.25.0;
//pragma experimental ABIEncoderV2;

contract BooComment {
    struct Comment {
        address client;
        uint256 time;
        string title;
        string contents;
        string category;
        Shop shop;
    }

    struct Shop {
        string province;
        string district;
        string street;
    }

    Comment[] worldwide;

    mapping (address => mapping (uint256 => Comment)) private records;
    mapping (address => uint256[]) private usercontents;

    event Recorded(address indexed _sender, string _title, string _contents, string indexed _category,
        string _province, string district, string _street, uint256 indexed _time);

    function _addAUserContentRecord(address from, uint256 time) private {
        usercontents[from].push(time);
    }

    function _unpackAComment(Comment com) private pure
    returns(string title, string contents, string category, string province, string district, string street, uint256 time) {
        title = com.title;
        contents = com.contents;
        category = com.category;
        province = com.shop.province;
        district = com.shop.district;
        street = com.shop.street;
        time = com.time;
    }

    //TODO: getUserContentsForThisUser
    function getUserContentsForThisUser() public view returns (uint256[]) {
        return usercontents[msg.sender];
    }

    function getUserCommentWithAddrAndTime(address user, uint256 time) private view
    returns (string title, string contents, string category, string province, string district, string street){
        Comment storage com = records[user][time];
        title = com.title;
        contents = com.contents;
        category = com.category;
        province = com.shop.province;
        district = com.shop.district;
        street = com.shop.street;
    }

    //TODO:addACommentFromMe

    function addACommentFromMe(string title, string contents, string category, string province, string district, string street, uint256 time) public {
        Comment new_comment = Comment({
                                          client: msg.sender,
                                          time: time,
                                          title: title,
                                          contents: contents,
                                          category: category,
                                          shop: Shop({
                                              province: province,
                                              district: district,
                                              street: street
                                          })
                                      });
        records[msg.sender][time] = new_comment;
        worldwide.push(new_comment);
        _addAUserContentRecord(msg.sender, time);
        emit Recorded(msg.sender, title, contents, category, province, district, street, time);
    }

    //TODO:getACommentOfMine

    function getWorldWide() public view returns(Comments[]){
        return worldwide;
    }

    function getACommentOfMine(uint256 time) public view returns(string title, string contents, string category, string province, string district, string street) {
        Comment storage com = records[msg.sender][time];
        title = com.title;
        contents = com.contents;
        category = com.category;
        province = com.shop.province;
        district = com.shop.district;
        street = com.shop.street;
    }

    struct Follow {
        address follower;
        Comment comment;
        uint256 time;
        string contents;
    }

    mapping ( address => mapping ( uint256 => Follow ) ) private followRecord;
    mapping ( address => uint256[] ) private followListOfAUser;
    mapping ( address => mapping ( uint256 => Follow[] )) private followList;

    //TODO:getFollowsFromThisUser
    function getFollowsFromThisUser() public view returns(uint256[]) {
        return followListOfAUser[msg.sender];
    }


    //TODO:addAFollowFromMe
    function addAFollowFromMe(address userAddressOfTheComment, uint256 timeOfTheComment, uint256 time, string contents) public {
        followRecord[msg.sender][time] = Follow({
            follower: msg.sender,
            comment: records[userAddressOfTheComment][timeOfTheComment],
            time: time,
            contents: contents
        });
        followListOfAUser[msg.sender].push(time);
        followList[userAddressOfTheComment][timeOfTheComment].push(followRecord[msg.sender][time]);
    }

    //TODO:getAFollowOfMine
    function getAFollowOfMine() public view returns(uint256[]) {
        return followListOfAUser[msg.sender];
    }

}