'use strict';
$(document).ready(function () {
    ClassicEditor
        .create( document.querySelector( '.ckeditor' ), {
            plugins: [ Image, ImageToolbar, ImageCaption, ImageStyle ],
            image: {
                toolbar: [ 'imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side' ],
                styles: [
                    'full',
                    'alignLeft',
                    'alignRight'
                ]
            }
        } )
        .then( editor => {
            console.log( editor );
        } )
        .catch( error => {
            console.error( error );
        });
});