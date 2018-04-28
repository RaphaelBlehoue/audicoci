'use strict';
$(document).ready(function () {
    ClassicEditor
        .create( document.querySelector( '.ckeditor' ), {
            plugins: [
                Enter, Typing, Paragraph, Heading, Undo, Bold, Italic, Heading, List, Image, ImageToolbar, Clipboard,
                ImageCaption, ImageStyle, ImageUpload, CKFinderUploadAdapter
            ],
            toolbar: [ 'heading', '|', 'undo', 'redo', 'bold', 'italic', 'bulletedList', 'numberedList', 'imageUpload' ],
            ckfinder: {
                // eslint-disable-next-line max-len
                uploadUrl: 'https://cksource.com/weuy2g4ryt278ywiue/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
            }
        } )
        .then(editor => {
            window.editor = editor;
        })
        .catch( error => {
            console.error( error.stack );
        } );
});