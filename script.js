
// Welcome message when the page loads

window.addEventListener("load", function () {

    console.log(
        "Welcome to Ajay's Portfolio!"
    );

});


// Smooth navigation

document.querySelectorAll("nav a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                console.log(
                    "Navigating to " +
                    this.textContent
                );

            }
        );

    });


// Simple scroll effect
window.addEventListener(
    "scroll",
    function () {

        const nav =
            document.querySelector("nav");

        if (window.scrollY > 50) {

            nav.style.boxShadow =
                "0 4px 15px rgba(0,0,0,0.2)";

        } else {

            nav.style.boxShadow = "none";

        }

    }
);