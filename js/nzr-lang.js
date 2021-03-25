// Get available languages
var languages = [];
$('.j-nzr-lang li').each(function (key) {
    languages[key] = $(this).attr('data-lang');
});

// Set default language
var current_language = getCookie('nzr-lang') ? getCookie('nzr-lang') : 'ru';
changeLang(current_language);

// Change language, if user click
$('.j-nzr-lang li').click(function () {
    var new_language = $(this).attr('data-lang');

    if(new_language == current_language) {
        return 0;
    }

    changeLang(new_language);
    current_language = new_language;
});


function changeLang(new_language) {
    document.cookie = "nzr-lang=" + new_language;
    $('.j-nzr-lang li').each(function () {
        if($(this).attr('data-lang') == new_language) {
            $(this).addClass('is-active');
        }
        else {
            $(this).removeClass('is-active');
        }
    });

    languages.forEach(function (value) {
        if(value == new_language) {
            $('body').find('[data-lang-element="' + value + '"]').show();
        }
        else {
            $('body').find('[data-lang-element="' + value + '"]').hide();
        }
    });
}