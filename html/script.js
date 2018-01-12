updateUser = function (){
	console.log("non arriva");
    var oldEmail = document.getElementById('oldEmail').value;

    var newEmail = document.getElementById('newEmail').value;

    var name = document.getElementById('name').value;

    var surname = document.getElementById('surname').value;
	
	console.log(surname,"  ",name,"  ",newEmail,"  ",oldEmail);
	
    fetch("http://localhost:3000/users/", {

              method: "PUT",

              mode : 'cors',

              headers: {

                Accept: "application/json",

                "Content-Type": "application/json"

              },

              body: JSON.stringify({
				
				newEmail: newEmail,
				
                oldEmail: oldEmail,

                name: name,

                surname: surname,

              })

            }).then((response) => {
					
                    alert(response);

                });

}