(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var create = function create() {
	var style = { FONT: "32px monospace", fill: "#fff" };
	game.add.text(200, 200, "Hello Phaser ES6", style);
};

var game = new Phaser.Game(640, 480, Phaser.AUTO, null, { create: create });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW5keS9Qcm9qZWN0cy9waGFzZXItZXM2LXF1Y2tzdGFydC9zcmMvR2FtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxNQUFNLEdBQUcsU0FBVCxNQUFNLEdBQVM7QUFDbEIsS0FBSSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO0FBQ3BELEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDcEQsQ0FBQTs7QUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQ3pCLEdBQUcsRUFDSCxHQUFHLEVBQ0gsTUFBTSxDQUFDLElBQUksRUFDWCxJQUFJLEVBQ0osRUFBQyxNQUFNLEVBQU4sTUFBTSxFQUFDLENBQ1IsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgY3JlYXRlID0gKCkgPT4ge1xuXHRsZXQgc3R5bGUgPSB7IEZPTlQ6IFwiMzJweCBtb25vc3BhY2VcIiwgZmlsbDogXCIjZmZmXCJ9O1xuXHRnYW1lLmFkZC50ZXh0KDIwMCwgMjAwLCBcIkJhZGFzcyBQaGFzZXIgRVM2XCIsIHN0eWxlKTtcbn1cblxubGV0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoXG5cdDY0MCwgXG5cdDQ4MCxcblx0UGhhc2VyLkFVVE8sXG5cdG51bGwsXG5cdHtjcmVhdGV9XG4pIl19