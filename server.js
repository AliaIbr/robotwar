#!/usr/bin/env node

var async = require('async');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var rightX;
var rightY;
var numberOfRobots;


var robotsList = [];
var ListerIter = [];
var movmentList = [];


async.series([
    function (callback) {
        rl.question('insert arrena coordinates separated by space  ', (answer) => {
            var arrenacoordinate = answer;
            var chunk = arrenacoordinate.split(" ");
            rightX = chunk[0];
            rightY = chunk[1];

            callback();
        });
    },
    function (callback) {
        rl.question('insert number of robots  ', (answer) => {
            numberOfRobots = answer;
            callback();
        });
    },
    function (callback) {
        ListerIter.length = numberOfRobots;
        var robotIter = 0;

        async.forEachSeries(ListerIter, function (robotnumber, callbackForeach) {
            robotIter = robotIter + 1;
            rl.question('insert robot ' + robotIter + ' location  ', (answer) => {
                var robot = addRobot(answer);
                robotsList.push(robot);
                
                rl.question('insert robot ' + robotIter + ' movment  ', (answer) => {
                    movmentList.push(answer);
                    callbackForeach();
                });
            });
        },
            function (err) {
                if (err) {
                    callback(err);
                } else {
                    console.log("robotlist is  ");
                    console.log(robotsList);
                    console.log("movment list ");
                    console.log(movmentList);
                    callback();
                }
        });
    }
], function (err) {
    if (err) {

    } else {
        rl.close();
        robotWar(robotsList, movmentList);
    }
});


robotWar = function (robotList, movmentList) {
    var FinishedRobotList = [];
    for (var robotIter = 0; robotIter < robotList.length; robotIter++){
        var updatedPositionRobot = moveRobot(robotList[robotIter], movmentList[robotIter]);
        FinishedRobotList.push(updatedPositionRobot);
        
    }
    console.log("----------------");

    console.log("the war result ");
    console.log(FinishedRobotList);
}


addRobot = function (location) {

    var chunks = location.split(" ");
    var x = parseInt(chunks[0], 10);
    var y = parseInt(chunks[1], 10);
    var compass = chunks[2];

    var robot ={
        "x" : x ,
        "y" : y ,
        "compass" : compass
    }
    return robot;
    
}

//movment here is the entire string of movment which we need to go through one by one letter 
moveRobot = function (robot, movment){
    var movingRobot = robot;
    for (var i = 0; i < movment.length; i++) {
        movingRobot = updatePosition(movingRobot, movment.charAt(i));
      }
    return movingRobot;
}


// robotcurrentposition is the robot object, move is one letter movment
updatePosition = function (robotCurrentPosition, move){
    var updatedPosition = robotCurrentPosition;
    switch(move){
        case "L":
            updatedPosition.compass = rotateCompass(robotCurrentPosition.compass, move);
            break;
        case "R":
            updatedPosition.compass = rotateCompass(robotCurrentPosition.compass, move);
            break;
        case "M":
            updatedPosition = moveOnePositionOnGrid(robotCurrentPosition);
            break;
    }
    return(updatedPosition);
}

//updating the compase rotation based on the movment input 
rotateCompass = function (currentOrintation, rotation ){
    var newOrintation;
    if (rotation == "L"){
        switch (currentOrintation){
            case "N":
                newOrintation = "W";
                break;
            case "S":
                newOrintation = "E";
                break;
            case "E":
                newOrintation = "N";
                break;
            case "W":
                newOrintation = "S";
                break;
        }
    }else if (rotation == "R"){
        switch (currentOrintation){
            case "N":
                newOrintation = "E";
                break;
            case "S":
                newOrintation = "W";
                break;
            case "E":
                newOrintation = "S";
                break;
            case "W":
                newOrintation = "N";
                break;
        }
    }
    return newOrintation;
}

moveOnePositionOnGrid = function (currentPosition){
    var updatedPosition = currentPosition;
    switch (currentPosition.compass){
        case "N":
            updatedPosition.x = currentPosition.x;
            if (currentPosition.y == rightY){
                updatedPosition.y = currentPosition.y ;
            }else {
                updatedPosition.y = currentPosition.y + 1;
            }
            break;
        case "S":
            updatedPosition.x = currentPosition.x;
            if (currentPosition.y == 0) {
                updatedPosition.y = currentPosition;
            } else {
                updatedPosition.y = currentPosition.y - 1;
            }
            break;
        case "E":
            
            if (currentPosition.x == rightX){
                updatedPosition.x = currentPosition.x;
            } else {
                updatedPosition.x = currentPosition.x + 1 ;
            }
            updatedPosition.y = currentPosition.y;
            
            break;
        case "W":
            if (currentPosition.x == 0) {
                updatedPosition.x = currentPosition.x 
            } else 
            {
                updatedPosition.x = currentPosition.x - 1;
            }
            
            updatedPosition.y = currentPosition.y;
            break;
    }
    return updatedPosition;
}





