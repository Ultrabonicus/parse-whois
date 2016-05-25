var should = require('chai').should();
var assert = require('chai').assert
var parser = require('../index');
var parseWhoIsData = parser.parseWhoIsData;

var whois = require('node-whois');

describe('Array',function(){
	describe('parseWhoIsData',function(){
		it('converts raw WhoIs string of into Array of JSON' , function(done){

			whois.lookup('github.com', function(err, data){
				if (err) throw err;

				console.log(data);

				console.log(JSON.stringify(parseWhoIsData(data)));

				done();
			});

		});
		it('parse empty colon', function (done){
			var given = "Domain Name: EXAMPLE.ORG\r\nDomain ID: 123456-ZZZZ\r\nWHOIS Server:\r\nReferral URL: http://www.example.com\r\nsometext\r\nmore:text"

			var expected = [{
				"attribute":"Domain Name","value":"EXAMPLE.ORG"
			},{
				"attribute":"Domain ID","value":"123456-ZZZZ"
			},{
				"attribute":"WHOIS Server","value":""
			},{
				"attribute":"Referral URL","value":"http://www.example.com"
			},{
				"attribute":"End Text","value":"sometext\nmore:text\n"
			}]

			assert.deepEqual(parseWhoIsData(given),expected)

			done()
		})
	});
});
