"use strict";

var faker = require('../../index');
var fs = require('fs');

faker.locale = "en";

var results = [];

for (var i = 0; i < 3000; i++){
	var gender = faker.name.gender();
	results.push({
		firstname: faker.name.firstName(gender),
		lastname: faker.name.lastName(gender),
		dob: faker.date.past(),
		gender: gender ? "female" : "male",
		MRN: faker.name.MRN(),
		accession: faker.name.accession(),
		received: faker.date.past(),
		collected: faker.date.past(),
		finalled: faker.date.past(),
		primaryspecimen: faker.random.arrayElement(["lung","heart","kidney","liver","skin","bladder","frontal lobe", "brain"]),
		casestatus: faker.random.arrayElement(["open","closed","pending", "transferred", "active", "inactive"]),
		specimencode: faker.name.specimenCode(),
		referringphysiciancode: faker.name.findName() + ", " + faker.name.jobTitle(),
		diagnostician: faker.name.findName(),
		casetype: faker.random.arrayElement(["Abdominoplasty", "Gallstones", "Cancer", "GYN","Hypoxemia","Psychosis", "Liver abnormalities", "Thrombocytopenia", "Some Illness"]),
		reporttext: faker.lorem.paragraphs(faker.random.number({min:3, max:10}))
	});
}

fs.writeFile('/Users/markgable/Desktop/bigDataSet.json',  JSON.stringify(results), function() {
  console.log("bigDataSet generated successfully!");
  save()
});

function getFileContents(filename){
	if (!filename) {return false;}
		
		var contents = fs.readFileSync(filename).toString();
		return contents ? JSON.parse(contents): false;
}


function save(){
	var document = getFileContents("/Users/markgable/Desktop/bigDataSet.json"),
		data = parse(document);
	//console.info(document);

	fs.writeFile('/Users/markgable/Desktop/bigDataSet.formatted.json',  data, function() {
		console.log("bigDataSet FORMATTED generated successfully!");
	});

}



// var data = parse(document)

function parse(line){
	var results = '';

	if (typeof line === "object"){
		//console.info(line);
		line.forEach(function(value, index){
			var str = JSON.stringify({"index":{"_id": (index + 1)}});
			results += str + "\n" + JSON.stringify(value) + "\n";
		});

		return results;
	}

	return line;
}




