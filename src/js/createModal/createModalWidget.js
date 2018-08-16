const jQuery = require('jquery');

function createModelPopup(data) { // headername modelId
  jQuery('body').append(`<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="${data.modalId}">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header ${data.ClassName}">
            <h4 class="modal-title" id="exampleModalLabel"> ${data.modalHeading}</h4>
            <button type="button" class="close modalClose" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
             </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
           ${data.modalContent}
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-success modalSubmit ${data.submitBotton ? '' : 'd-none'}" data-dismiss="modal">${data.submitBotton}</button>
            <button type="button" class="btn btn-danger modalClose" data-dismiss="modal">${data.buttonName}</button>
        </div>

        </div>
    </div>
    </div>`);
  jQuery(`#${data.modalId}`).modal('show');
  jQuery(document).on('click', '.modalSubmit', () => {
    if (data.submitCallback) {
      data.submitCallback(data.modalId);
    }
  });
}
export default createModelPopup;
