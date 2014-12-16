$( document ).ready(function() {
	current_location = document.location.href.split('index.html')[0];

	// append "add new step" buttons
	$('tfoot td').prepend("<button type='button' class='btn btn-default add_step'><span class='glyphicon glyphicon-plus'></span>&nbsp;Ajouter une étape</button>");

	init_add_step($('.add_step'));
	init_checkbox($('tbody input[type=checkbox]'));

	// init all selects with step prefixes
	$.each ($('table select'), function (i, select) {
		init_select(select);
	});
	// get assertions list and build auto-complete + add "options" to "select" dropdowns
	init_assertions();
	// enable popovers on (i) buttons
	$('[data-toggle="popover"]').popover();
	// add feature file creation
	$('.btn.create').click(function(e) { do_export(e); });
	$('.btn.delete').click(function(e) { do_delete(e); });
	// init modal actions
	set_modal();
	// set actions to "add new scénarios"
	window.i_scenario = 1;
	// clone panel
	window.panel = $('#scenario1').clone();
	window.tab = $('a[href=#scenario1]').parent().clone();
	window.tr = $($('table tbody tr').get(1)).clone();

	$('ul.nav-tabs li a.add').click(function (e) { do_duplicate(e); });
	$('.scenario-label').blur(function (e) {
		$(e.target).val() != '' ? $('nav li.active a').html($(e.target).val()) : false;
	});
	// display / hide the scenario outline table when scenario has / hasn't variables
	$('.examples').removeClass('hidden').hide();
	$('input.has-vars').prop('checked', false).change( function (e) {
		var panel = $('.panel.active');
		panel.find('.examples').toggle();
		do_update_vars();
	});
});

function init_select(select) {
	var options = select.options || [];

	$('option', select).remove();
	$.each(fixtures, function(i, val) {
		options[options.length] = new Option(val, val);
	});
}

function init_checkbox (box) {
	$(box).click(function (e) {
		var i = $(e.target);
		var parent = i.closest('tr');

		if (i.prop('checked') == true) {

			parent.removeClass('disabled');
			parent.find('input.test-label').prop('disabled', false);

			if (parent.find('input.test-label').prop('param_0') || parent.find('input.test-label').prop('param_0') == false) {
				$(parent.find('input.test-param').get(0)).prop('disabled', false);
			}
			if (parent.find('input.test-label').prop('param_1') || parent.find('input.test-label').prop('param_1') == false) {
				$(parent.find('input.test-param').get(1)).prop('disabled', false);
			}

			parent.find('select').removeAttr('disabled');

		} else {

			parent.addClass('disabled')
			.find('input[type=text]')
			.prop('disabled', true);

			parent.find('select').attr('disabled','disabled');
		}
	});
}

function init_autocomplete (inputs) {
	$.each(inputs, function (i, input) {
		$(input).autocomplete({
			source		:  assertions.label,
			select		: function (event, ui) {

				target = $(event.target);
				target.prop('pattern', ui.item.value);

				var tr = target.closest('tr');
				var params = tr.find('input.test-param');

				// affiche l'aide dans le p.help à coté de target
				i = $.inArray(ui.item.value, assertions['label']);

				if(assertions['doc'][i] != null)
					target.next('p').html("<span class='glyphicon glyphicon-info-sign'></span>&nbsp;" + assertions['doc'][i]);
				else
					target.next('p').html("");

				var nb = ui.item.value.match(/<[a-z]+>/) ? ui.item.value.match(/<[a-z]+>/g).length : 0;
				// si un param est demandé par le libellé du test, il faut activer une ou pls zones de params

				$.each(tr.find('input.test-param'), function () { $(this).prop('disabled', true); });
				if(nb > 0) {

					var values = target.prop('pattern').match(/<[a-z]+>/g) || [];
					// enable 1st text field
					for (var i=0; i<nb; i++) {
						target.prop('param_'+i, false);

						$(tr.find('input.test-param')[i]).prop('disabled', false)
						.attr('placeholder', values[i])
						.change({'i': i,'values': values}, function (e) {
							var target		= tr.find('input.test-label');
							var origin_val	= target_val = target.prop('pattern');


							if (e.data.values.length > 0) {
								target_val = target_val.replace(e.data.values[e.data.i], '"'+$(e.target).val()+'"');
							}

							if (e.data.i == 1 && target.prop('param_0')) {
								target_val	= target_val.replace (/<[a-z]+>/, target.prop('param_0'));
							}

							if (e.data.i == 0 && target.prop('param_1')) {
								target_val		= target_val.replace (/<[a-z]+>/, target.prop('param_1'));
							}

							target.val(target_val);
							target.prop('param_'+e.data.i, '"'+$(e.target).val()+'"');
							do_update_vars();
						});

						if ($.support.placeholder == false) {
							$(tr.find('input.test-param')[i]).val(values[i]);
						}
					}
				}

			}
		});
	});
}

function init_add_step (btn) {
	btn.click(function(e) {
		$('fieldset.active table:not(.scenario-vars) > tbody').append (window.tr.clone());

		init_autocomplete($('fieldset.active tbody tr:last input.test-label'));
		$.each ($('fieldset.active > table tbody tr:last select'), function (i, select) {
			init_select(select);
		});
		init_checkbox($('fieldset.active > table tbody tr:last input[type=checkbox]'));
	});
}

function set_modal () {
	// set actions on modal form
	$('#modal form').submit(function (e, form) {
		e.preventDefault();
		do_save(e);

		$('#modal').modal('hide');
	});
	$('#modal form input[type=button]').click(function (e, input) {
		$('#text-filename').val('');
		$('#modal').modal('hide');
	});
}

function init_assertions () {
	// assertions are divided into 3 pieces, need to construct 3 different arrays from this
	assertions['tags']	= [];
	assertions['label'] = [];
	assertions['doc'] 	= [];
	assertions['rule'] 	= [];
	$.each( assertions, function (i, a) {
		// element, text, page, checkbox, num, value, filename, field, option, code
		// pattern,  button, name, select, link
		assertions['tags'][i]		= a[0].match(/<[a-z]+>/g) || []; // gets all params requested by assertion and gotten from regexp
		var label = a[0];
// console.log(a[0]);
		for (var j=0; j<assertions['tags'][i].length; j++) {
			var tag = assertions['tags'][i][j];
//			0-1 ", 1 caractère, 0-1 ?, 0-n car. alpha, <tag>, 0-n car sans espace, ), 0-1 "
			var expr = "[\"]?.{1}[\?]?[a-zA-Z]*("+tag+".[^\\s]*)[\)][\"]?";
// console.log(expr);
			var matches = label.match(new RegExp(expr, "g")) || [];
// console.log(matches);
			var len = matches.length;
			for (var k=0; k<len; k++) {
				label = label.replace( matches[k], tag);
			}
		}
		assertions['doc'][i] 	= a[1];
		assertions['rule'][i] 	= a[2];
		assertions['label'][i] 	= label;
	});

	init_autocomplete($('tbody input.test-label'));

}

function do_delete (e) {
	var fieldset = $('fieldset.active');
	var id = fieldset.attr('id');
	var prev = $('a[href=#' + id+']').parent().prev();
	fieldset.remove();
	$('a[href=#' + id+']').remove();
	prev.find('a').tab('show');

}

function do_update_vars() {
	var panel	= $('.panel.active');
	var params	= panel.find('input.test-param:not(:disabled)');
	var scenario_vars = {};
	$.each(params, function (i, input) {
		if(input.value.substring(0,2) == "<@") {
			if(! panel.find ('.has-vars').prop('checked') == true) {
				panel.find ('.has-vars').prop('checked', true);
				$('.panel.active .examples').toggle();
			}

			scenario_vars["'"+input.value.substring(1)+"'"] = input.value; // better use key==>value to avoid duplicates
		}

	});

	// now update "Exemples:" section
	var tr_head = panel.find('.scenario-vars thead tr');
	var tr_body = panel.find('.scenario-vars tbody tr');

	var html_head = "";
	var html_body = "";
	$.each(scenario_vars, function (i, value) {
		html_head += "<th>"+ value.substring(1, value.length -1) + "</th>";
		html_body += "<td><input type='text' required value=''></td>";
	});
	html_body += "<td><a href='javascript:void(0)' class='btn text-success add-var' onclick='clone_tr(this)'><span class='glyphicon glyphicon-plus'></span></a>&nbsp;|&nbsp;";
	html_body += "<a href='javascript:void(0)' class='btn text-danger remove-var' onclick='remove_tr(this)'><span class='glyphicon glyphicon-minus'></span></a></td>";

	tr_head.html(html_head);
	// FIXME : will destroy existing lines (tr)
	panel.find('.scenario-vars tbody').html('<tr>'+html_body+'</tr>');
}

function clone_tr(elt) {
	$('.scenario-vars tbody').append($(elt).parents("tr").clone());
}
function remove_tr(elt) {
	$(elt).parents('tr').remove();
}

function do_export (e) {
	e.preventDefault();

	var i = [];
	var EOL = "\r\n";
	$.each( $('#func input:not(:disabled)'), function (int, input) {
		i[input.name] = input.value;
	});
	/*
	 * FONCTIONNALITE
	 */
	var txt = "# language: fr" + EOL +
	"Fonctionnalité: " + i['testing[label]'] + EOL +
	"\t" + i['testing[as]'] + EOL +"\t" + i['testing[ctx]'] + EOL +"\t" + i['testing[res]'] + EOL + EOL;
	/*
	 * CONTEXTE
	 */
	txt += "Contexte: " + EOL;
	// loop through each step in Contexte tab
	$.each ($("#ctx tbody tr:not(.disabled)"), function (int, tr) {
		$.each ($(tr).find("input.test-label, input[type=hidden], select:not(:disabled)"), function (j, input) {
			txt += "\t" + $(input).val() + " ";
		});
		txt += EOL;
	});
	txt += EOL + EOL;
	/*
	 * SCENARIO
	 */
	// loop through each step of each Scenario tab
	$.each ($(".scenario"), function (int, tab) {
		tab = $(tab);
		txt += "@javascript ";
		if(tab.find('div.form-group input[name*="tags"]').val()) {
			txt += tab.find('div.form-group input[name*="tags"]').val();
		}
		txt +=  EOL;

		if(tab.find('input.has-vars').prop('checked')) {
			var scenario_name = tab.find('div.form-group input[name*="label"]').val() || "Plan de scénario sans nom";
			txt += "Plan du Scénario: " + scenario_name + EOL + "\t";
		} else {
			var scenario_name = tab.find('div.form-group input[name*="label"]').val() || "Scénario sans nom";
			txt += "Scénario: " + scenario_name + EOL + "\t";
		}

		$.each ($(tab).find(".table-condensed tbody tr:not(.disabled)"), function (j, tr) {
			$.each ($(tr).find("input.test-label:not(:disabled), input[type=hidden], select:not(:disabled)"), function (j, input) {
				txt += $(input).val() + " ";
			});
			txt += EOL + "\t";
		});
		txt += EOL;
		/*
		 * WITH VARIABLES
		 */
		if(tab.find('input.has-vars').prop('checked') && $('.scenario-vars td').length > 0) {
			txt += " Exemples:" + EOL;

			var k=0;
			var th_length = $('.scenario-vars th').length;
			while ($('.scenario-vars th').get(k)) {
				txt += "| " + $($('.scenario-vars th').get(k)).html();
				++k;
			}
			txt += " |" + EOL;

			var k=0;
			while ($('.scenario-vars input[type=text]').get(k)) {
				var value = $($('.scenario-vars input[type=text]').get(k)).val() || false;
				if(value) {
					txt += "| " + value + ' ';
				}
				++k;
				if(k%th_length == 0)
					txt += " |" + EOL;
			}
		}
	});

	window.txt = txt;

	fct = $('input[name="testing[label]"]').val() || "test-behat";
	$('#text-filename').val(fct);
	$('#modal').modal({});
}

function do_save (e) {
	// try to use File API, and if error use an iFrame trick
	try {
		// @TODO replace saveAs with std feature from File API
		// @TODO and remove FileSaver.js lib from HTML file
		var blob = new Blob([txt], {type: "text/plain;charset=utf-8",endings: 'transparent'});
		saveAs(blob, e.target[0].value+".feature");
	} catch (err) {
		// browser does not support FileSaver.js :: saveAs, so must propose alternative
		// probably a good old IE version...
		$('body').append('<iframe id="saveFrame" style="display:none"></iframe>');
		saveFrame.document.open("text/plain", "replace");
		saveFrame.document.write(txt);
		saveFrame.document.close();
		saveFrame.focus();

		if(saveFrame.document.execCommand('SaveAs', true, e.target[0].value + ".feature.txt")) {
			alert("Attention, vous utilisez un navigateur ancien qui modifie le nom du fichier lors de l'enregistrement. \n\n" +
			"Pensez à renommer le fichier en " + e.target[0].value + ".feature avant de le transmettre.\nMerci !");
		}
	}
}

function do_duplicate (e) {
	e.preventDefault();
	++ i_scenario;
	var panel = window.panel.clone();
	panel.attr('id', 'scenario'+i_scenario);
	panel.removeClass('active');

	panel.appendTo('div.tab-content');
	panel.find('input, select').val('');
	// add events
	init_autocomplete(panel.find('tbody input.test-label'));
	init_add_step(panel.find('.add_step'));
	init_checkbox(panel.find('input[type=checkbox]'));
	// TODO need to add checkbox events
	// TODO and uncheck checkbox

	panel.find('.btn.delete').click(function(e) { do_delete(e); });
	panel.find('.scenario-label').blur(function (e) {
		$(e.target).val() != '' ? $('nav li.active a').html($(e.target).val()) : false;
	});

	// clone tab
	var tab = window.tab.clone();
	tab.find('a').attr({
		'href'			: '#scenario'+ i_scenario,
		'aria-controls'	: 'scenario' + i_scenario
	})
	.html('Scénario '+ i_scenario);
	tab.removeClass('active');

	$('.nav-tabs li').last().before(tab);

	tab.find('a').tab('show');
}

