//Executa quando o documento é carregado
$(document).ready(function () {

	$('#txtDataNascimento').mask('00/00/0000');
	$('#txtCpf').mask('000.000.000-00');
	$('#txtRg').mask('00.000.000-0');
	$('#txtNome').focus();
	$('#btnAnt').attr("disabled", "disabled");
	$('#btnProx').attr("disabled", "disabled");
	$('#btnAnt').hide();
	$('#btnProx').hide();

	var i = 0; //Controla o numero de registros
	var arrayDados = []; //Controla os objetos no registro
	var pagina = 0; //Controla a paginação da tabela
	var numPagina = 1; //Controla o numero da pagina

    $('#totalReg').html(arrayDados.length); //Inicia o contador de registros na página
	$('#numPagina').html(numPagina); //Iniciar o contador de páginas na página

	//Botão salvar
    $('#btnSalvar').click(function(){

    	if(validaCampos())
    	{
    		var idPessoa = $("#id").val().trim(); //Recebe, se tiver, o id do formulario

    		if(idPessoa != "") //Verifica se existe conteudo em idPessoa
    		{
    			//Se existir id, então se trata de uma alteração
			 	arrayDados[idPessoa].nome = $('#txtNome').val();
		    	arrayDados[idPessoa].cpf = $('#txtCpf').val();
		    	arrayDados[idPessoa].rg = $('#txtRg').val();
		    	arrayDados[idPessoa].nascimento = $('#txtDataNascimento').val();
		    	arrayDados[idPessoa].sexo = $('#selSexo').val();
    		}

    		else
    		{
    			//Caso não exista idPessoa, então se trata de uma adição de informação
	    		var id = ++i;
    	    	
    	    	//Insere um objeto com as seguintes informações denro do array
    	    	arrayDados.push({
    	    		nome : $('#txtNome').val(),
    	    		cpf : $('#txtCpf').val(),
    	    		rg : $('#txtRg').val(),
    	    		sexo : $('#selSexo').val(),
    	    		nascimento : $('#txtDataNascimento').val()
    	    	});
    	    }

    	    //Limpar campos e chama a função para preencher a tabela com os valores do array
    	    limpaCampos();
	    	carregarTabela();
    	}
    });

    //Botão de paginação, anterior
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

    //Botão de paginação, próximo
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

    //Função para limpar dados dos input após inserir, alterar ou remover
    limpaCampos = function(){
    	$("#id").val("");
    	$('#txtNome').val("");
    	$('#selSexo').val("");
    	$('#txtDataNascimento').val("");
    	$('#txtCpf').val("");
    	$('#txtRg').val("");
    	$('#txtNome').focus();
    };

    //Função para carregar os dados na tabela
    carregarTabela = function(){
 		$('#tabelaBody').html("");
 		$('#totalReg').html(arrayDados.length);

    	for (var i = pagina, j = 0; i < arrayDados.length && j < 5; i++, j++) 
    	{
	    	var newRow = $("<tr id='tbRow"+i+"'>");
	    	var cols = "";

	    	cols += "<td id='tbNome"+i+"'>"+arrayDados[i].nome+"</td>";
	    	cols += "<td id='tbSexo"+i+"'>"+(arrayDados[i].sexo == "M" ? "Masculino" : "Feminino")+"</td>";
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

    	if (arrayDados.length > 5)
    	{
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
			$('#paginacao').hide();
		}

		if(arrayDados.length <= 5)
		{
			$('#paginacao').hide();
		}
    };


    $('#txtNome').focus(function(){
    	$('#divNome').removeClass("has-error");
    	$('#nomeError').html("");
    });

    $('#txtCpf').focus(function(){
    	$('#divCpf').removeClass("has-error");
    	$('#cpfError').html("");
    });

    $('#selSexo').focus(function(){
    	$('#divSexo').removeClass("has-error");
    	$('#sexoError').html("");
    });

    $('#txtDataNascimento').focus(function(){
    	$('#divNascimento').removeClass("has-error");
    	$('#nascimentoError').html("");
    });

    validaCampos = function(){
    	if($('#txtNome').val().trim() == "")
    	{
    		$('#divNome').addClass("has-error");
    		$('#nomeError').html("Preencha este campo");
    	}

    	if ($('#txtCpf').val().trim() == "")
    	{
    		$('#divCpf').addClass("has-error");
    		$('#cpfError').html("Preencha este campo");
    	}

    	if($('#txtCpf').val().length < 14 && $('#txtCpf').val().trim() != "")
    	{
    		$('#divCpf').addClass("has-error");
    		$('#cpfError').html("Compo incompleto");
    	}

    	if($('#selSexo').val() == "")
    	{
    		$('#divSexo').addClass("has-error");
    		$('#sexoError').html("Selecione uma opção");
    	}

    	if($('#txtDataNascimento').val().trim() == "")
    	{
    		$('#divNascimento').addClass("has-error");
    		$('#nascimentoError').html("Preencha este campo");
    	}

    	if($('#txtDataNascimento').val().length < 10 && $('#txtDataNascimento').val().trim() != "")
    	{
    		$('#divNascimento').addClass("has-error");
    		$('#nascimentoError').html("Campo incompleto");
    	}

    	if(
	    	$('#txtNome').val().trim() == "" ||
	    	$('#selSexo').val() == "" ||
	    	$('#txtDataNascimento').val().trim() == "" ||
	    	$('#txtDataNascimento').val().length < 10 ||
	    	$('#txtCpf').val().trim() == "" ||
	    	$('#txtCpf').val().length < 14 
    	){
    		return false;
    	}
    	else{
    		return true;
    	}
    };

    RemoveRow = function(id){

    	var confirma = confirm("Deseja remover?");

    	if(confirma)
    	{
    		arrayDados.splice(id, 1);

	    	limpaCampos();
    	}
    	carregarTabela();
    };

    EditRow = function(id){
    	$('#id').val(id);
    	$('#txtNome').val(arrayDados[id].nome);
    	$('#selSexo').val(arrayDados[id].sexo);
    	$('#txtDataNascimento').val(arrayDados[id].nascimento);
    	$('#txtCpf').val(arrayDados[id].cpf);
    	$('#txtRg').val(arrayDados[id].rg);
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