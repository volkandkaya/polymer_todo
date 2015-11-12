function addtodo()
  {
    todo_value = document.getElementsByTagName("input")[0].value;
    if (todo_value.length != 0){
      $('.row').append('<to-do>' + todo_value + '</to-do>');
      document.getElementsByTagName("input")[0].value = "";
      sortids();
      jsonsend()
    }
  }


  function sortids()
    {
        var lis = document.getElementsByTagName('to-do');
    var btn_list = document.getElementsByClassName('btn-danger');
    var btn_info = document.getElementsByClassName('btn-info');

    countid = 1
        for (x = 0; x < lis.length; x++){
            lis[x].id = countid.toString();
            countid += 1;
        }

    countid = 1
    for (x = 0; x < btn_list.length; x++){
            btn_list[x].id = countid.toString();
            countid += 1;
        }

    countid = 1
    for (x = 0; x < btn_info.length; x++){
            btn_info[x].id = countid.toString();
            countid += 1;
        }
    }

  function editelement(id)
  {
    inner_html = document.getElementById(id).children[0].innerHTML;

    newhtml = '<div class="input-group">';
    newhtml += '<input type="text" class="form-control" value="' + inner_html.trim() + '">';
    newhtml += '<span class="input-group-btn">';
    newhtml += '<button class="btn btn-info" type="button" onclick="saveelement(this.id)">Save Changes</button>'
    newhtml += '</span></div>';
    newhtml += '<button class="btn btn-danger glyphicon glyphicon-remove" onclick="deleteelement(this.id)"></button><hr>';
    document.getElementById(id).innerHTML = newhtml;
    sortids();
  }

  function saveelement(id)
  {
    var inner_text = document.getElementById(id).children[0].children[0].value;
    var to_do = document.createElement("to-do");
    to_do.children[0].innerHTML = inner_text;
    document_element = document.getElementById(id);
    document.getElementById(id).parentNode.replaceChild(to_do, document_element);
    sortids();
    jsonsend()
  }

  function deleteelement(id)
    {
    document.getElementById(id).remove();
    jsonsend()
    }

  $(".form-control").on( "keypress", function(event) {
    if (event.which == 13 && !event.shiftKey) {
      event.preventDefault();
      addtodo();
    }
    });

  function jsondata()
  {
    p_list = document.getElementsByTagName('p');
    obj = {to_dos: []};

    for (x = 0; x < p_list.length; x++){
            p_value = p_list[x].innerHTML.trim();
      obj['to_dos'].push({'value': p_value})
        }
    console.log(obj['to_dos'])
    return obj
  }

  function jsonsend()
    {
        $.ajax({
              type: "POST",
              url: window.location.href,
              data: JSON.stringify(jsondata()['to_dos']),
              dataType: "text"
        });
    }

  sortids();
