
let membersTable = document.getElementById("membersTable");
let membersData = data.results[0].members;
let bodySection = document.getElementById("bodySection");

let filteredArray = membersData;
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

// ******************* SEARCH MEMBERS *********************** 
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

// ******************* FILTER BY PARTY AND STATE ***********************

const filterDemocrats = document.getElementById("filterDemocrats");
const filterRepublicans = document.getElementById("filterRepublicans");
const filterIndependents = document.getElementById("filterIndependents");

let filteredArrayByParty = membersData;
let filteredArrayByState = membersData;
let filteredArrayTotal = membersData;

function filterByParty(membersArray){
	cleanTable();
	filteredArrayByParty = membersArray.filter(checkParty);
	getCommonArray(filteredArrayByParty, filteredArrayByState);
	getDataIntoTable(filteredArrayTotal);

	if (filteredArrayTotal.length === 0) {
		displayNoMembersMessage();	
	}
}

function filterByState(membersArray) {
	cleanTable();
	filteredArrayByState = membersArray.filter(checkState);
	getCommonArray(filteredArrayByParty, filteredArrayByState);
	getDataIntoTable(filteredArrayTotal);

	if (filteredArrayTotal.length === 0) {
		displayNoMembersMessage();	
	}
}


function cleanTable() {	
	bodySection.innerHTML = ""; 
}

function checkParty(member) {
	if (member.party === "D" && filterDemocrats.checked) {
		filteredArrayByParty.push(member);
		return filteredArrayByParty;
	}
	if (member.party === "R" && filterRepublicans.checked) {
		filteredArrayByParty.push(member);
		return filteredArrayByParty;
	}
	if (member.party === "I" && filterIndependents.checked) {
		filteredArrayByParty.push(member);
		return filteredArrayByParty;
	}
	if (!filterDemocrats.checked && !filterRepublicans.checked && !filterIndependents.checked) {
		filteredArrayByParty = membersData;
		return filteredArrayByParty;
	}
}

function checkState(member) {
	let stateDropdown = document.getElementsByName("stateSelection")[0];
	if (stateDropdown.value == "all") {
		filteredArrayByState = membersData;
		return filteredArrayByState;
	} else {
		return member.state === stateDropdown.value;
	}
}

function getCommonArray(array1, array2) {
	filteredArrayTotal = array1.filter(value => array2.includes(value));
}

function displayNoMembersMessage() {
	let newRow = document.createElement("tr");
	newRow.innerHTML = "*No members*";
	bodySection.appendChild(newRow);			
}


