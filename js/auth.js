class Auth {
	constructor() {
        document.querySelector("body").style.display = "none";
		const auth = localStorage.getItem("auth");
		const user = JSON.parse(localStorage.getItem("user"));
		this.validateAuth(auth, user);
	}

	validateAuth(auth, user) {
		if (auth != 1) {
			window.location.replace("index.html");
		} else {
            document.querySelector("body").style.display = "block";
			var span_user = document.querySelector("#fullname");
			span_user.innerHTML = user.firstName + " " + user.lastName;

		}
	}

	logOut() {
		localStorage.removeItem("auth");
		localStorage.removeItem("user");
		window.location.replace("index.html");
	}
}
