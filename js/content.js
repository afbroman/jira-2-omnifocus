$(function() {

	// creates an OF task using the supplied ticket info
	function createTaskForTicket(ticket) {
		var message = {
			method : "createTask",
			params : {
				name: "["+ticket.key+'] '+ticket.summary,
				note: window.location.href +"\n"+ ticket.description
			}
		};

		chrome.extension.sendMessage(message, function(data) {
			//TODO: might want to do something fancy in this callback
			//console.info("Response %s", data);
		});
	}

	var $sendButton = $("<a id=\"send-to-omnifocus\">Send to OmniFocus &raquo;</a>");
	$sendButton.prependTo( "#viewissuesidebar" );

	$sendButton.on('click', function( evt ) {

		evt.preventDefault();

    var description = $("#description-val").text() == null ? "" : $.trim($("#description-val").text());
    if(description === "Click to add description") {
      description = "";
    }

		createTaskForTicket({
			key        : $("#key-val").text(),
			summary    : $("#summary-val").text().replace( /\s+/, ' ' ).replace( /^\s*(\S.+\S)\s*$/, '$1' ),
			description: description
		});

	});

});
