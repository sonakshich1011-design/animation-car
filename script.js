// =====================================================
// FLYING TESLA - JAVASCRIPT
// =====================================================


// GET ELEMENTS

const car = document.getElementById("car");

const takeoffButton =
    document.getElementById("takeoff");

const landButton =
    document.getElementById("land");

const boostButton =
    document.getElementById("boost");

const statusText =
    document.getElementById("status");

const speedText =
    document.getElementById("speed");

const speedBar =
    document.getElementById("speedBar");


// VARIABLES

let speed = 0;

let flying = false;

let boosting = false;

let speedTimer = null;


// =====================================================
// UPDATE SPEED
// =====================================================

function updateSpeed(value) {

    speed =
        Math.max(
            0,
            Math.min(500, value)
        );


    speedText.innerText =
        String(
            Math.round(speed)
        ).padStart(3, "0");


    speedBar.style.width =
        (speed / 500 * 100) + "%";
}


// =====================================================
// TAKE OFF
// =====================================================

takeoffButton.addEventListener(
    "click",
    function () {

        // If already flying

        if (flying) {

            statusText.innerText =
                "ALREADY FLYING";

            return;
        }


        // Stop previous timer

        clearInterval(speedTimer);


        // Set states

        flying = true;

        boosting = false;


        // Remove boost

        car.classList.remove("boost");


        // Add flying

        car.classList.add("flying");


        // Status

        statusText.innerText =
            "TAKING OFF";


        // Increase speed

        speedTimer =
            setInterval(
                function () {

                    if (speed < 180) {

                        updateSpeed(
                            speed + 5
                        );

                    } else {

                        clearInterval(
                            speedTimer
                        );

                        statusText.innerText =
                            "FLIGHT ACTIVE";
                    }

                },
                60
            );
    }
);


// =====================================================
// LAND
// =====================================================

landButton.addEventListener(
    "click",
    function () {

        // If already landed

        if (!flying) {

            statusText.innerText =
                "ALREADY LANDED";

            return;
        }


        // Stop timer

        clearInterval(speedTimer);


        // States

        flying = false;

        boosting = false;


        // Remove classes

        car.classList.remove("flying");

        car.classList.remove("boost");


        // Reset button

        boostButton.innerHTML =
            "⚡ BOOST";


        // Status

        statusText.innerText =
            "LANDING";


        // Decrease speed

        speedTimer =
            setInterval(
                function () {

                    if (speed > 0) {

                        updateSpeed(
                            speed - 8
                        );

                    } else {

                        clearInterval(
                            speedTimer
                        );

                        statusText.innerText =
                            "READY";
                    }

                },
                50
            );
    }
);


// =====================================================
// BOOST
// =====================================================

boostButton.addEventListener(
    "click",
    function () {

        // Must fly first

        if (!flying) {

            statusText.innerText =
                "TAKE OFF FIRST";

            return;
        }


        // =============================================
        // BOOST ON
        // =============================================

        if (!boosting) {

            boosting = true;


            // Add boost class

            car.classList.add("boost");


            // Status

            statusText.innerText =
                "BOOST ACTIVE";


            // Button

            boostButton.innerHTML =
                "⚡ BOOST ON";


            // Stop old timer

            clearInterval(speedTimer);


            // Increase speed

            speedTimer =
                setInterval(
                    function () {

                        if (speed < 500) {

                            updateSpeed(
                                speed + 15
                            );

                        } else {

                            updateSpeed(500);
                        }

                    },
                    40
                );

        }


        // =============================================
        // BOOST OFF
        // =============================================

        else {

            boosting = false;


            // Remove boost

            car.classList.remove("boost");


            // Status

            statusText.innerText =
                "FLIGHT ACTIVE";


            // Button

            boostButton.innerHTML =
                "⚡ BOOST";


            // Stop timer

            clearInterval(speedTimer);


            // Return to normal speed

            speedTimer =
                setInterval(
                    function () {

                        if (speed > 180) {

                            updateSpeed(
                                speed - 5
                            );

                        } else {

                            updateSpeed(180);

                            clearInterval(
                                speedTimer
                            );
                        }

                    },
                    60
                );
        }

    }
);


// =====================================================
// KEYBOARD CONTROLS
// =====================================================

document.addEventListener(
    "keydown",
    function (event) {


        // SPACE = TAKE OFF

        if (event.code === "Space") {

            event.preventDefault();

            takeoffButton.click();
        }


        // L = LAND

        if (
            event.key.toLowerCase() === "l"
        ) {

            landButton.click();
        }


        // B = BOOST

        if (
            event.key.toLowerCase() === "b"
        ) {

            boostButton.click();
        }

    }
);


// =====================================================
// MOUSE PARALLAX
// =====================================================

document.addEventListener(
    "mousemove",
    function (event) {

        // Don't move manually during flight

        if (flying) {

            return;
        }


        const x =
            event.clientX /
            window.innerWidth -
            0.5;


        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        car.style.marginLeft =
            `${x * 15}px`;


        car.style.marginTop =
            `${y * 8}px`;
    }
);


// =====================================================
// INITIAL STATE
// =====================================================

updateSpeed(0);