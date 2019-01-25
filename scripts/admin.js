function initialDonations() {
	if (window.confirm("Do you really want to send initial donations to all Blockchain members?")) {
		for (key in users) {
			mintTokens(users[key].adress,50)
		}
	}
}