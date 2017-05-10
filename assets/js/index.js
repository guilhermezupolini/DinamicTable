//Executa quando o documento é carregado
$(document).ready(function () {

	$('#btnAlterar').hide();
	var i = 0;
	var flag = false;

    //alert('Documento carregado');

    $('#totalReg').html(i);

    $('#btnAdicionar').click(function(){

    	if(validaCampos())
    	{
    		flag = true;
    	    	var id = ++i;
    	    	var newRow = $("<tr id='tbRow"+id+"'>");
    	    	var cols = "";
    	    	var sexo = $('#selSexo').val() == "M" ? "Masculino" : "Feminino";
    	    	
    	
    	    	cols += "<td id='tbNome"+id+"'>"+$('#txtNome').val();+"</td>";
    	    	cols += "<td id='tbSexo"+id+"'>"+sexo+"</td>";
    	    	cols += "<td id='tbDtNascimento"+id+"'>"+$('#txtDataNascimento').val();+"</td>";
    	    	cols += "<td id='tbCpf"+id+"'>"+$('#txtCpf').val();+"</td>";
    	    	cols += "<td id='tbRg"+id+"'>"+$('#txtRg').val();+"</td>";
    	    	cols += "<td>";
    	    	cols += "<button type='button' onclick='EditRow("+id+");' class='btn btn-success'>";
    	    	cols += "<span class='glyphicon glyphicon-pencil'></span>";
    	    	cols += "</button>";
    	    	cols += "<button type='button' onclick='RemoveRow(this);' class='btn btn-danger'>";
    	    	cols += "<span class='glyphicon glyphicon-remove'></span>";
    	    	cols += "</button>";
    	    	cols += "</td>";
    	
    	    	newRow.append(cols);
    	
    	    	$('#tabela').append(newRow);
    	    	
    	    	$('#totalReg').html(id);
    	    	
    	
    	    	$('#txtNome').val("");
    	    	$('#selSexo').val("");
    	    	$('#txtDataNascimento').val("");
    	    	$('#txtCpf').val("");
    	    	$('#txtRg').val("");
    	
    	    	if(flag)
    	    	{
    	    		$('#nf').hide();
    	    	}
    	    }
    	    else{
    	    	alert("Todos os campos devem ser devidamente preenchidos!!!");
    	    }
    });

    $('#btnAlterar').click(function(){
    	if(validaCampos())
    	{
    		var id = $('#id').val();
    		var sexo = $('#selSexo').val() == "M" ? "Masculino" : "Feminino";
    	    	
    	    	$('#tbNome'+id).html($('#txtNome').val());
    	    	$('#tbSexo'+id).html(sexo);
    	    	$('#tbDtNascimento'+id).html($('#txtDataNascimento').val());
    	    	$('#tbCpf'+id).html($('#txtCpf').val());
    	    	$('#tbRg'+id).html($('#txtRg').val());
    	
    	    	$('#txtNome').val("");
    	    	$('#selSexo').val("");
    	    	$('#txtDataNascimento').val("");
    	    	$('#txtCpf').val("");
    	    	$('#txtRg').val("");
    	    	
    	
    	    	$('#btnAdicionar').show();
    	    	$('#btnAlterar').hide();
    	}
	    else{
	    	alert("Todos os campos devem ser devidamente preenchidos!!!");
	    }
    });

    $('#txtNome').change(function(){
    	var letra = $('#txtNome').val().charAt(0).toUpperCase();
    	var retorno = letra + $('#txtNome').val().substring(1).toLowerCase();
    	$('#txtNome').val(retorno);
    });

    $('#txtDataNascimento').change(function(){
    	//var value = $('#txtCpf').val();
    	var retorno = mask($('#txtDataNascimento').val(), "##/##/####");
    	$('#txtDataNascimento').val(retorno);
    });

    $('#txtCpf').change(function(){
    	//var value = $('#txtCpf').val();
    	var retorno = mask($('#txtCpf').val(), "###.###.###-##");
    	$('#txtCpf').val(retorno);
    });

    $('#txtCpf').keyup(function(e){
    	var cpf = $('#txtCpf').val();
    	//console.log(e.keyCode);
    	if((e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 16) || (e.keyCode >= 96 && e.keyCode <= 105))
    	{
    		$('#txtCpf').val(cpf);
    	}
    	else
    	{
    		$('#txtCpf').val(cpf.substring(0,cpf.length-1));
    	}
    });

    $('#txtRg').keyup(function(e){
    	var cpf = $('#txtRg').val();
    	//console.log(e.keyCode);
    	if((e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 16) || (e.keyCode >= 96 && e.keyCode <= 105))
    	{
    		$('#txtRg').val(cpf);
    	}
    	else
    	{
    		$('#txtRg').val(cpf.substring(0,cpf.length-1));
    	}
    });

    validaCampos = function(){
    	if(
	    	$('#txtNome').val().trim() == "" ||
	    	$('#selSexo').val() == "" ||
	    	$('#txtDataNascimento').val().trim() == "" ||
	    	$('#txtDataNascimento').val().length < 10 ||
	    	$('#txtCpf').val().trim() == "" ||
	    	$('#txtCpf').val().length < 14 ||
	    	$('#txtRg').val().trim() == ""
    	){
    		return false;
    	}
    	else{
    		return true;
    	}
    };

    RemoveRow = function(item){
    	var confirma = confirm("Deseja remover?");

    	if(confirma)
    	{
    		var tr = $(item).closest('tr');
	    	tr.fadeOut(0, function(){
	     		tr.remove(); 

	    	});

	    	$('#totalReg').html(--i);
	    	if (i == 0) 
	    	{
	    		$('#nf').show();
	    	}
    	}
    	
    };

    EditRow = function(id){
    	var sexo = $('#tbSexo'+id).html() == "Masculino" ? "M" : "F";
    	$('#id').val(id);
    	$('#txtNome').val($('#tbNome'+id).html());
    	$('#selSexo').val(sexo);
    	$('#txtDataNascimento').val($('#tbDtNascimento'+id).html());
    	$('#txtCpf').val($('#tbCpf'+id).html());
    	$('#txtRg').val($('#tbRg'+id).html());
    	$('#btnAdicionar').hide();
    	$('#btnAlterar').show();
    	
    };

    mask = function(val, mask){
    	var maskared = "";
    	var k = 0;
    	for (var i = 0; i < mask.length; i++) 
    	{
    		if(mask.charAt(i) == "#")
    		{
    			maskared += val.charAt(k);
    			k++;
    		}
    		else
    		{
    			maskared += mask.charAt(i);
    		}
    	}

    	return maskared;
    };

    
});