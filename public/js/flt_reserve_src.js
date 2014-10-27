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
    function populateDataTable(data_obj){
        var table = document.getElementById('my_flt_table');
        var tr = document.createElement('tr');

        // make an element for every prop in obj
        for (var i in data_obj){
            var td = document.createElement('td');
            td.innerHTML = data_obj[i];
            tr.appendChild(td);

        }


        table.appendChild(tr);
        console.log(data_obj.departcity);
        console.log(data_obj.departdate);
        console.log(data_obj.arrivalcity);
        console.log(data_obj.returndate);
    }

    // grab main window
    var main = document.getElementById('main');
    console.log('main');

    // submit btn --> sends form data to server
    var submit_btn = document.getElementById('submit');
    submit_btn.addEventListener('click', function(){
        var flt_reserve_frm = document.forms.flt_reserve_form;
        makeAnAjaxCall(flt_reserve_frm, function(){
            alert('Thank you for your reservation');
        });
    });


    // retrieves reservation object from server
    var flt_act_btn = document.getElementById('my_flight_act_btn');
    flt_act_btn.addEventListener('click', function(){
        // clear the main section
        var flt_reserve_section = document.getElementById('flt_reserve_section');
        flt_reserve_section.style.display = 'none';
        // perform an AJAX call
        getReservation(function(data){
           var _data = JSON.parse(data);
           for (var i in _data){
                console.log(_data[i]);
               // populate page
               populateDataTable(_data[i]);
            }
        });
        // display the AJAX on the page
        var my_flt_section = document.getElementById('my_flt_section');
        my_flt_section.style.display = 'block';
        // in a new element way.



//        var return_btn = document.createElement('button');
//        return_btn.innerHTML = "Go Back"
//        main.appendChild(return_btn);
    });
});