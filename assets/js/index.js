//Executa quando o documento é carregado
$(document).ready(function () {

	$('#txtDataNascimento').mask('00/00/0000');
	$('#txtCpf').mask('000.000.000-00');
	$('#txtRg').mask('00.000.000-0');
	$('#txtNome').focus();

	$('#btnAlterar').hide();
	$('#btnAnt').attr("disabled", "disabled");
	$('#btnProx').attr("disabled", "disabled");
	$('#btnAnt').hide();
	$('#btnProx').hide();

	

	var i = 0;
	var k = 0;
	var flag = false;
	var arrayDados = [];
	var pagina = 0;
	var numPagina = 1;

	console.log(arrayDados);

    $('#totalReg').html(arrayDados.length);
	$('#numPagina').html(numPagina);


    $('#btnAdicionar').click(function(){

    	if(!validaCampos())
    	{
    		
	    	var id = ++i;
    	    	
    	    	arrayDados.push({
    	    		nome : $('#txtNome').val(),
    	    		cpf : $('#txtCpf').val(),
    	    		rg : $('#txtRg').val(),
    	    		sexo : $('#selSexo').val() == "M" ? "Masculino" : "Feminino",
    	    		nascimento : $('#txtDataNascimento').val()
    	    	});

    	    	console.log(arrayDados);

    	    	$('#totalReg').html(id);

    	    	
    	
    	    	$('#txtNome').val("");
    	    	$('#selSexo').val("");
    	    	$('#txtDataNascimento').val("");
    	    	$('#txtCpf').val("");
    	    	$('#txtRg').val("");
    	    	$('#txtNome').focus();
    	
    	    	// if(flag)
    	    	// {
    	    	// 	$('#nf').hide();
    	    	// }

    	    	carregarTabela();
    	    }
    	    else{
    	    	alert("Todos os campos devem ser devidamente preenchidos!!!");
    	    }
    });

    $('#btnAlterar').click(function(){
    	if(!validaCampos())
    	{
    		var id = $('#id').val();
    		var nome = $('#txtNome').val();
	    	var cpf = $('#txtCpf').val();
	    	var rg = $('#txtRg').val();
	    	var nascimento = $('#txtDataNascimento').val();
	    	var sexo = $('#selSexo').val() == "M" ? "Masculino" : "Feminino";
    		
    	    	
	    	arrayDados[id].nome = nome;
	    	arrayDados[id].cpf = cpf;
	    	arrayDados[id].rg = rg;
	    	arrayDados[id].nascimento = nascimento;
	    	arrayDados[id].sexo = sexo;
    	
	    	$('#txtNome').val("");
	    	$('#selSexo').val("");
	    	$('#txtDataNascimento').val("");
	    	$('#txtCpf').val("");
	    	$('#txtRg').val("");
	    	
	
	    	$('#btnAdicionar').show();
	    	$('#btnAdicionar').removeAttr("disabled", "disabled");
	    	$('#btnAlterar').hide();

	    	carregarTabela();
    	}
	    else{
	    	alert("Todos os campos devem ser devidamente preenchidos!!!");
	    }
    });

    $('#btnAnt').click(function(){
    	if(pagina > 0)
		{
			carregarTabela(pagina -= 5);
			numPagina -= 1;
			$('#numPagina').html(numPagina);
		}
		else
		{
			alert("Primeira pagina");
		}
    });

	$('#btnProx').click(function(){
		if(pagina < arrayDados.length-5)
		{
			carregarTabela(pagina += 5);
			numPagina += 1;
			$('#numPagina').html(numPagina);
		}
		else
		{
			alert("Ultima pagina");
		}
	});

    $('#txtNome').change(function(){
    	var letra = $('#txtNome').val().charAt(0).toUpperCase();
    	var retorno = letra + $('#txtNome').val().substring(1).toLowerCase();
    	$('#txtNome').val(retorno);
    });

    carregarTabela = function(){

    	// alert(q);

 		$('#tabelaBody').html("");

 		

    	for (var i = pagina, j = 0; i < arrayDados.length && j < 5; i++, j++) 
    	{
	    	var newRow = $("<tr id='tbRow"+i+"'>");
	    	var cols = "";
	    	cols += "<td id='tbNome"+i+"'>"+arrayDados[i].nome+"</td>";
	    	cols += "<td id='tbSexo"+i+"'>"+arrayDados[i].sexo+"</td>";
	    	cols += "<td id='tbDtNascimento"+i+"'>"+arrayDados[i].nascimento+"</td>";
	    	cols += "<td id='tbCpf"+i+"'>"+arrayDados[i].cpf+"</td>";
	    	cols += "<td id='tbRg"+i+"'>"+arrayDados[i].rg+"</td>";
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

    	if (arrayDados.length > 5){
    		
    		$('#btnProx').removeAttr("disabled", "disabled");
    		$('#btnProx').show();
    		$('#paginacao').show();
    	}

    	if(pagina >= 5)
    	{	
    		$('#btnAnt').removeAttr("disabled", "disabled");
    		$('#btnAnt').show();
    	}

    	if (pagina >= 5 && (pagina+5) >= arrayDados.length || arrayDados.length <= 5)
    	{
			$('#btnProx').attr("disabled", "disabled");
    		$('#btnProx').hide();
    	}

    	if(pagina <= 0)
    	{
    		$('#btnAnt').attr("disabled", "disabled");
    		$('#btnAnt').hide();
    	}

    	if(arrayDados.length <= 0)
		{
			$('#tabelaBody').append("<tr><td id='nf' colspan='6' style='text-align: center;'>Nenhum registro adicionado.</td></tr>");
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

    	carregarTabela();
    	
    };

    EditRow = function(id){
    	var sexo = arrayDados[id].sexo == "Masculino" ? "M" : "F";
    	$('#id').val(id);
    	$('#txtNome').val(arrayDados[id].nome);
    	$('#selSexo').val(sexo);
    	$('#txtDataNascimento').val(arrayDados[id].nascimento);
    	$('#txtCpf').val(arrayDados[id].cpf);
    	$('#txtRg').val(arrayDados[id].rg);
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