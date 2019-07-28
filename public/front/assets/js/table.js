$(function() {
	$('.autonumeric').autoNumeric('init');
	$('#picPreview').on('show.bs.modal', function(event) {
		var button = $(event.relatedTarget) // Button that triggered the modal
		var title = button.data('pic-title') // Extract info from data-* attributes
		var pic = button.data('pic-url') // Extract info from data-* attributes
		var modal = $(this)
		modal.find('.modal-header .title').text(title);
		modal.find('.modal-body .background').attr('src', pic)
	})
});


//- Initialize datatable with ability to add rows dynamically
$('#show-modal').on('click', function() {
	$('#addNewAppModal').modal('show');
});

$('#add').on('click', function() {
	// if success
	// $('#addNewAppModal').modal('hide');

});
var initPostList = function() {
	var table = $('#postList');

	var settings = {
		"sDom": "<'table-responsive't><'row'<p i>>",
		"sPaginationType": "bootstrap",
		"destroy": true,
		"scrollCollapse": true,
		"oLanguage": {
			"sLengthMenu": "_MENU_ ",
			"sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
		},
		"iDisplayLength": 5
	};
	table.dataTable(settings);

	// search box for table
	$('.search-table').keyup(function() {
		table.fnFilter($(this).val());
	});
}
initPostList();