function getFormData(form){
    return {
            departcity: form.departcity.value,
            departdate: form.departdate.value,
            arrivalcity: form.arrivalcity.value,
            returndate: form.returndate.value,
            };
}

// makes an ajax call to backend
function makeAnAjaxCall(){

}

window.addEventListener('load', function(){


    // grab main window
    var main = document.getElementById('main');
    console.log('main');

    var flt_act_btn = document.getElementById('my_flight_act_btn');
    flt_act_btn.addEventListener('click', function(){
        console.log('Hey I was clicked');
        // clear the main section

        // perform an AJAX call

        // display the AJAX on the page
        // in a new element way.


        main.innerHTML = "I got some new data for you.  And I can show you your flights.";

        var return_btn = document.createElement('button');
        return_btn.innerHTML = "Go Back"
        main.appendChild(return_btn);
    });
});