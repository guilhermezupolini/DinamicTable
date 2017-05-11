//Executa quando o documento é carregado
$(document).ready(function () {

	$('#txtDataNascimento').mask('00/00/0000');
	$('#txtCpf').mask('000.000.000-00');
	$('#txtRg').mask('00.000.000-0');

	$('#btnAlterar').hide();
	$('#btnAnt').attr("disabled", "disabled");
	$('#btnProx').attr("disabled", "disabled");

	var i = 0;
	var k = 0;
	var flag = false;
	var arrayDados = [];

	console.log(arrayDados);

    //alert('Documento carregado');

    $('#totalReg').html(arrayDados.length);


    $('#btnAdicionar').click(function(){

    	if(!validaCampos())
    	{
    		flag = true;
    	    	var id = ++i;
    	    	
    	    	var nome = $('#txtNome').val();
    	    	var cpf = $('#txtCpf').val();
    	    	var rg = $('#txtRg').val();
    	    	var nascimento = $('#txtDataNascimento').val();
    	    	var sexo = $('#selSexo').val() == "M" ? "Masculino" : "Feminino";

    	    	arrayDados.push({
    	    		nome : nome,
    	    		cpf : cpf,
    	    		rg : rg,
    	    		sexo : sexo,
    	    		nascimento : nascimento
    	    	});

    	    	console.log(arrayDados);

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

    	    	carregarTabela(arrayDados);
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
    	    	$('#btnAdicionar').removeAttr("disabled", "disabled");
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

    carregarTabela = function(dados){

 		$('#tabelaBody').html("");

    	for (var i = 0; i < dados.length; i++) 
    	{
	    	var newRow = $("<tr id='tbRow"+i+"'>");
	    	var cols = "";
	    	cols += "<td id='tbNome"+i+"'>"+dados[i].nome+"</td>";
	    	cols += "<td id='tbSexo"+i+"'>"+dados[i].sexo+"</td>";
	    	cols += "<td id='tbDtNascimento"+i+"'>"+dados[i].nascimento+"</td>";
	    	cols += "<td id='tbCpf"+i+"'>"+dados[i].cpf+"</td>";
	    	cols += "<td id='tbRg"+i+"'>"+dados[i].rg+"</td>";
	    	cols += "<td>";
	    	cols += "<button type='button' onclick='EditRow("+i+");' class='btn btn-success'>";
	    	cols += "<span class='glyphicon glyphicon-pencil'></span>";
	    	cols += "</button>";
	    	cols += "<button type='button' onclick='RemoveRow(this, "+i+");' class='btn btn-danger'>";
	    	cols += "<span class='glyphicon glyphicon-remove'></span>";
	    	cols += "</button>";
	    	cols += "</td>";

	    	newRow.append(cols);

	    	$('#tabelaBody').append(newRow);
    	}
    };

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

    RemoveRow = function(item, id){

    	var confirma = confirm("Deseja remover?");
    	arrayDados.splice(id, 1);

    	console.log(arrayDados);

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

    	carregarTabela(arrayDados);
    	
    };

    EditRow = function(id){
    	var sexo = $('#tbSexo'+id).html() == "Masculino" ? "M" : "F";
    	$('#id').val(id);
    	$('#txtNome').val($('#tbNome'+id).html());
    	$('#selSexo').val(sexo);
    	$('#txtDataNascimento').val($('#tbDtNascimento'+id).html());
    	$('#txtCpf').val($('#tbCpf'+id).html());
    	$('#txtRg').val($('#tbRg'+id).html());
    	$('#btnAdicionar').attr("disabled", "disabled");
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