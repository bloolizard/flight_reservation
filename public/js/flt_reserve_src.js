function getFormData(form){
    return {
            departcity: form.departcity.value,
            departdate: form.departdate.value,
            arrivalcity: form.arrivalcity.value,
            returndate: form.returndate.value
            };
}

// makes an ajax call to backend
function makeAnAjaxCall(form, callback){
    var data = getFormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/reservation');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('readystatechange', function(){
       if (xhr.status === 200 && xhr.readyState === 4){
           callback(xhr.responseText);
       }
    });
    xhr.send(JSON.stringify(data));

}

// makes an ajax call to backend
function getReservation(callback){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/getreservations');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('readystatechange', function(){
        if (xhr.status === 200 && xhr.readyState === 4){
            callback(xhr.responseText);
        }
    });
    xhr.send();

}

window.addEventListener('load', function(){

    //add data to table
    function populateDataTable(data_obj){
        var tbody = document.getElementById('my_flt_table_body');



        var tr = document.createElement('tr');

        // make an element for every prop in obj
        for (var i in data_obj){
            var td = document.createElement('td');
            td.innerHTML = data_obj[i];
            tr.appendChild(td);

        }


        tbody.appendChild(tr);
    }

    // grab main window
    var main = document.getElementById('main');

    // submit btn --> sends form data to server
    var submit_btn = document.getElementById('submit');
    submit_btn.addEventListener('click', function(){
        var flt_reserve_frm = document.forms.flt_reserve_form;
        makeAnAjaxCall(flt_reserve_frm, function(){

            alert('Thank you for your reservation');
            flt_reserve_frm.reset();
        });
    });

    // returns back to home
    var return_btn = document.getElementById('return_btn');
    return_btn.addEventListener('click', function(){

        var my_flt_section = document.getElementById('my_flt_section');
        my_flt_section.style.display = 'none';

        var flt_reserve_section = document.getElementById('flt_reserve_section');
        flt_reserve_section.style.display = 'block';

    });


    // retrieves reservation object from server
    var flt_act_btn = document.getElementById('my_flight_act_btn');
    flt_act_btn.addEventListener('click', function(){
        // clear the main section
        var flt_reserve_section = document.getElementById('flt_reserve_section');
        flt_reserve_section.style.display = 'none';

        //clear table first
        var tbody = document.getElementById('my_flt_table_body');
        tbody.innerHTML = "";
        // perform an AJAX call
        getReservation(function(data){
           var _data = JSON.parse(data);
           for (var i in _data){
               // populate page
               populateDataTable(_data[i]);
            }
        });
        // display the AJAX on the page
        var my_flt_section = document.getElementById('my_flt_section');
        my_flt_section.style.display = 'block';
        // in a new element way.
    });
});