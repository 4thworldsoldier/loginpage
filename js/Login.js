class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});
			if (error == 0) {
				//do login api here

                var data = {
                    email: document.querySelector(`#email`).value,
                    password: document.querySelector(`#password`).value,
                };
                fetch("https://localhost:44344/Users/authenticate",{
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                .then((Response) => Response.json())
                .then((data) =>{
                    if(data.message){
						console.error("ERROR:", data.message);
						document.querySelector(".error-message-all").
						style.display = "block";
						document.querySelector(".error-message-all").innerHTML = "Email or password is incorrect";	
					}else{
					   localStorage.setItem("user", JSON.stringify(data));
					   localStorage.setItem("auth", 1);
				       this.form.submit();
					}
                })
                .catch((data) =>{
                    console.error("ERROR:", data.message);
					document.querySelector(".error-message-all").
					style.display = "block";
					document.querySelector(".error-message-all").innerHTML = "API is currently unavailable";
                });
			}
		});
	}

	// validateFields(field) {
	// 	if (field.value.trim() === "") {
	// 		this.setStatus(
	// 			field,
	// 			`${field.previousElementSibling.innerText} cannot be blank`,
	// 			"error"
	// 		);
    //         // if(field.value.)
	// 		return false;
	// 	} else {
	// 		if (field.type == "password") {
	// 			if (field.value.length < 8) {
	// 				this.setStatus(
	// 					field,
	// 					`${field.previousElementSibling.innerText} must be at least 8 characters`,
	// 					"error"
	// 				);
	// 				return false;
	// 			} else {
    //                 if (field.type == "email") {
    //                     if (field.value  && /(^\w.*@\w+\.\w)/.test(field.value)) {
    //                         this.setStatus(field, null, "success");
    //                         return true;
    //                     }else {
    //                         this.setStatus(
    //                             field,
    //                             `${field.previousElementSibling.innerText} must be at least 8 characters`,
    //                             "error"
    //                         );
    //                         return false;
    //                     };
    //                 }
	// 			}
	// 		} else {
	// 			this.setStatus(field, null, "success");
	// 			return true;
    //         }
	// 	}
	// }

    validateFields(field) {
		if (field.value.trim() === "") {
			this.setStatus(
				field,
				`${field.previousElementSibling.innerText} cannot be blank`,
				"error"
			);
			return false;
		} else {
			if (field.type == "password") {
				if (field.value.length < 8) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} must be at least 8 characters`,
						"error"
					);
					return false;
				} else {
					this.setStatus(field, null, "success");
					return true;
				}
			} else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
	}

	setStatus(field, message, status) {
		const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
	}
}

const form = document.querySelector(".loginForm");
if (form) {
	const fields = ["email", "password"];
	const validator = new Login(form, fields);
}
