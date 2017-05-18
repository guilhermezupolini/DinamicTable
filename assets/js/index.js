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
	var regPagina = 5; //Controla a quantidade de registros a serem exibidos
	var ordemOrdenacao = "asc";

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
	    		// var id = ++i;
    	    	
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
    	    // resetDados();
	    	carregarTabela();
    	}
    });

    //Botão de paginação, anterior
    $('#btnAnt').click(function(){
    	if(pagina > 0)
		{
			pagina -= regPagina;
			carregarTabela();
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
			pagina += regPagina;
			carregarTabela();
			numPagina += 1;
			$('#numPagina').html(numPagina);
		}
		else
		{
			alert("Ultima pagina");
		}
	});

	$('#colNome').click(function(){
		nameSort();
	});

    $('#txtNome').change(function(){
    	var letra = $('#txtNome').val().charAt(0).toUpperCase();
    	var retorno = letra + $('#txtNome').val().substring(1).toLowerCase();
    	$('#txtNome').val(retorno);
    });


    $('#selReg').change(function(){
		regPagina = parseInt($('#selReg').val());
		console.log(regPagina);
		resetDados();
		carregarTabela();
	});

	$('#formulario input').focus(function(){
		$(this).parents().removeClass("has-error");
		$(this).next().html("");
	});

	$('#formulario select').focus(function(){
		$(this).parents().removeClass("has-error");
		$(this).next().html("");
	});

	$('#txtCpf').blur(function(){
		if(!validaCpf($(this).val().replace(/\.|\-/gi, "")))
		{
			$(this).val("");
			$(this).parent().addClass("has-error");
    		$(this).next().html("CPF inválido");
		}
	});

    resetDados = function(){
		pagina = 0;
		numPagina = 1;
		// regPagina = 5;
    };

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

    	for (var i = pagina, j = 0; i < arrayDados.length && j < regPagina; i++, j++) 
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

    	if (arrayDados.length > regPagina)
    	{
    		$('#btnProx').removeAttr("disabled", "disabled");
    		$('#btnProx').show();
    		$('#paginacao').show();
    	}

    	if(pagina >= regPagina)
    	{	
    		$('#btnAnt').removeAttr("disabled", "disabled");
    		$('#btnAnt').show();
    	}

    	if (pagina >= regPagina && (pagina+regPagina) >= arrayDados.length || arrayDados.length <= regPagina)
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

		if(arrayDados.length <= regPagina)
		{
			$('#paginacao').hide();
		}
    };

    validaCampos = function(){
    	var valida = true;

    	$('#formulario input').each(function(){
    		if($(this).attr("required"))
    		{
    			if(!$(this).val())
	    		{
					$(this).parent().addClass("has-error");
					$(this).next().html("Preencha este campo");

					valida  = false;
    			}
    		}
    	});

    	$('#formulario select').each(function(){
    		if($(this).attr("required"))
    		{
    			if(!$(this).val())
	    		{
					$(this).parent().addClass("has-error");
					$(this).next().html("Selecione uma opção");

					valida  = false;
    			}
    		}
    	});
    		return valida;
    };

    RemoveRow = function(id){
    	var confirma = confirm("Deseja remover?");

    	if(confirma)
    	{
    		arrayDados.splice(id, 1);

	    	limpaCampos();
    	}
    	resetDados();
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

    validaCpf = function(cpf){
		var soma;
    	var resto;
	    soma = 0;

		if (
			cpf == "00000000000" || 
			cpf == "11111111111" ||
			cpf == "22222222222" ||
			cpf == "33333333333" ||
			cpf == "44444444444" ||
			cpf == "55555555555" ||
			cpf == "66666666666" ||
			cpf == "77777777777" ||
			cpf == "88888888888" ||
			cpf == "99999999999" ||
			cpf == "12345678909" ||
			cpf.length > 11
			) 
			{
				return false;
			}
	    
		for (i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
		resto = (soma * 10) % 11;
		
	    if ((resto == 10) || (resto == 11))  resto = 0;
	    if (resto != parseInt(cpf.substring(9, 10)) ) return false;
		
		soma = 0;
	    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
	    resto = (soma * 10) % 11;
		
	    if ((resto == 10) || (resto == 11))  resto = 0;
	    if (resto != parseInt(cpf.substring(10, 11) ) ) return false;

	    return true;
    };

    nameSort = function(){
    	console.log("vamos ordenar");
    	var cont = 0;

    	if(ordemOrdenacao == "asc")
    	{
    		$('#ordenador').removeClass("glyphicon glyphicon-sort-by-alphabet-alt");
    		$('#ordenador').addClass("glyphicon glyphicon-sort-by-alphabet");
    		arrayDados.sort(function(a, b){
    			return a.nome.localeCompare(b.nome);
    		});

    		ordemOrdenacao = "desc";
    	}
    	else
    	{
    		$('#ordenador').removeClass("glyphicon glyphicon-sort-by-alphabet");
    		$('#ordenador').addClass("glyphicon glyphicon-sort-by-alphabet-alt");
    		arrayDados.sort(function(a, b){
    			return a.nome.localeCompare(b.nome) * (-1);
    		});

    		ordemOrdenacao = "asc";
    	}
    	carregarTabela();
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