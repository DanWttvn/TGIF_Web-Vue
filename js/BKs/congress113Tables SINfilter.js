
let membersTable = document.getElementById("membersTable");
let membersData = data.results[0].members;
let bodySection = document.getElementById("bodySection");

getDataIntoTable(membersData);

function getDataIntoTable(array) {

	for (let i = 0; i < array.length; i++) {
		
		let fullName = "";
		if (array[i].middle_name === null) {
			fullName = array[i].first_name + " " + array[i].last_name;
		} else {
			fullName = array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name; 
		}
		let party = array[i].party; 
		let state = array[i].state; 
		let seniority = array[i].seniority; 
		let percentageVotes = array[i].votes_with_party_pct + "%"; 
		let wikiURL = "";
		if (array[i].middle_name === null) {
			wikiURL = "https://en.wikipedia.org/wiki/" + array[i].first_name + "_" + array[i].last_name;
		} else {
			wikiURL = "https://en.wikipedia.org/wiki/" + array[i].first_name + "_" + array[i].middle_name + "_" + array[i].last_name; 
		}

		let newRow = document.createElement("tr");
		let td1 = document.createElement("td");
		let linkTag = document.createElement("a");

		td1.appendChild(linkTag);
		newRow.appendChild(td1);

		td1.setAttribute("class", "alignLeft memberName");
		linkTag.setAttribute("href", wikiURL);
		linkTag.innerHTML = fullName;

		let td2 = newRow.appendChild(document.createElement("td"));
		td2.innerHTML = party;
		let td3 = newRow.appendChild(document.createElement("td"));
		td3.innerHTML = state;
		let td4 = newRow.appendChild(document.createElement("td"));
		td4.innerHTML = seniority;
		let td5 = newRow.appendChild(document.createElement("td"));
		td5.innerHTML = percentageVotes;

		bodySection.appendChild(newRow);			
	}
}


// *******************SEARCH MEMBERS*********************** 
const searchBar = document.getElementById("searchMember");
searchBar.addEventListener("keyup", function(e) {
	const term = e.target.value.toLowerCase();
	const membersList = bodySection.getElementsByTagName("tr");
	
	Array.from(membersList).forEach(function (member){
		const name =  member.firstElementChild.textContent;
		if (name.toLowerCase().indexOf(term) != -1) {
			member.style.display = "table-row";
		} else {
			member.style.display = "none";
		}
	});
});

function cleanTable() {	bodySection.innerHTML = ""; }
// *******************FILTER BY PARTY***********************

const filterDemocrats = document.getElementById("filterDemocrats");
const filterRepublicans = document.getElementById("filterRepublicans");
const filterIndependents = document.getElementById("filterIndependents");

let filteredArrayByParty = membersData;

function filterByParty(membersArray){
	filteredArrayByParty = [];
	for (let i = 0; i < membersArray.length; i++) {
		if (membersArray[i].party === "D" && filterDemocrats.checked) {
			filteredArrayByParty.push(membersArray[i]);
		}
		if (membersArray[i].party === "R" && filterRepublicans.checked) {
			filteredArrayByParty.push(membersArray[i]);
		}
		if (membersArray[i].party === "I" && filterIndependents.checked) {
			filteredArrayByParty.push(membersArray[i]);
		}
		if (!filterDemocrats.checked && !filterRepublicans.checked && !filterIndependents.checked) {
			filteredArrayByParty = membersData;
		}
	}
	cleanTable();
	// getFilteredArray(membersArray);
	getDataIntoTable(filteredArray);
}

// *******************FILTER BY STATE***********************

let filteredArrayByState = membersData;

function filterByState(membersArray) {
	let stateDropdown = document.getElementsByName("stateSelection")[0];
	filteredArrayByState = [];
	// console.log(filteredArrayByState);
	
	
	for (let i = 0; i < membersArray.length; i++) {
		if (membersArray[i].state == stateDropdown.value) {
			filteredArrayByState.push(membersArray[i]);
		}
	}
	console.log(filteredArrayByState);

	cleanTable();
	// getFilteredArray();
	getDataIntoTable(filteredArray);
}

// ******************* GET COMMON ARRAY ***********************






// hacer 2 arrays, una para partido y otra para state. comparar. hacer 1 nueva con los que existan en ambas. crear table con esa











// *******************FILTER BY STATE METODO SEARCH (no vale) ***********************

// const stateDropdown = document.getElementById("dropdownForFilter");
// stateDropdown.addEventListener("change", function(e) {
// 	const stateSelected = e.target.value
// 	const membersList = bodySection.getElementsByTagName("tr");
// 	console.log(stateSelected);
	
	
// 	Array.from(membersList).forEach(function (member){
// 		const stateOfMember =  member.childNodes[2].textContent;
// 		if (stateOfMember.indexOf(stateSelected) != -1) {
// 			member.style.display = "table-row";
// 		} else {
// 			member.style.display = "none";
// 		}
// 	});
// });


