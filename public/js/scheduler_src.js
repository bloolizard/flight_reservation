(function (){


    var data = {
        name: 'Edwin Villanueva',
        id: 32
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/json');
    xhr.setRequestHeader('Content-Type','application/json');

    xhr.addEventListener('readystatechange', function(){
        if (xhr.status === 200 && xhr.readyState === 4){
//            console.log(xhr.responseText);

        }
    });
    xhr.send(JSON.stringify(data));
})();

// first get Data

function extractElementData (form){
    return {
        name: form.name.value,
        phone: form.phone.value,
        notes: form.notes.value
    }
}

function sendAjax(obj, callback, error){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/json');
    xhr.setRequestHeader('Content-Type','application/json');

    xhr.addEventListener('readystatechange', function(){
        if ( xhr.readyState === 4){
            if (xhr.status === 200) {
                callback(xhr.responseText);
            }
            else {
                error('True');
            }



        }
    });
    xhr.send(JSON.stringify(obj));
}

function addCandidatesToTable(candidate){
//        console.log('adding candidates to table');
    var tbody = document.getElementById('candidates_info');
    var tr = document.createElement('tr');
    for (i in candidate){
        // create a td element
        var td = document.createElement('td');
        //append td to tr
        td.innerHTML = candidate[i];

        tr.appendChild(td);
    }

    tbody.insertBefore(tr, tbody.firstElementChild);

}

function createCandidateTr(data){
    var tr = document.createElement('tr');
    var name = document.createElement('td');
}

function drawAnError(){
//        var tbody = document.getElementById('candidates_info');
    console.log('an error happened');
}

var _data;
window.addEventListener('load', function(){

    var form = document.forms.candidate;
    var submit = document.getElementById('submit');
    submit.addEventListener('click', function(){
        var obj = extractElementData(form);
        sendAjax(obj, function(data){
            _data = JSON.parse(data);
            leng = _data.candidates.length;
            //draw the elements
            addCandidatesToTable(_data.candidates[leng-1]);
        }, function(){
//                console.log('Error');
            // draw an error
            drawAnError();
            // insert an error
        });

    });
});
