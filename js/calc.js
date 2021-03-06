$('.j-section-2').hide();
$('.j-section-3').hide();

var money_for_one_square = 1200;
var table_body = $('.j-table-body');

$('.j-open-group-1').click(function () {
    $('.j-section-1').hide();
    $('.j-section-2').show();

    $('.j-way-line-1').addClass('is-active');
    $('.j-way-point-2').addClass('is-active');

    $('.j-group-2').hide();
    $('.j-group-1').show();
});

$('.j-open-group-2').click(function () {
    $('.j-section-1').hide();
    $('.j-section-2').show();

    $('.j-way-line-1').addClass('is-active');
    $('.j-way-point-2').addClass('is-active');

    $('.j-group-1').hide();
    $('.j-group-2').show();
});



$('.j-count-1').click(function () {
    if(!$('.j-form-name').val().trim() || !$('.j-form-cost').val() || !$('.j-form-investments').val()) {
        if(current_language == 'ua'){
            alert('Для підрахунку потрібно заповнити всі поля');
        }
        else {
            alert('Для подсчёта нужно заполнить все поля');
        }
        return -1;
    }

    $('.j-way-line-2').addClass('is-active');
    $('.j-way-point-3').addClass('is-active');

    table_body.html('');
    $('.j-section-2').hide();
    $('.j-section-3').show();

    $('.j-text-name').html($('.j-form-name').val().trim());

    var flat_cost = $('.j-form-cost').val();

    var investments = $('.j-form-investments').val();
    $('.j-text-investments').html(investments);

    var current_year = new Date().getFullYear();

    var counter = 0;

    var total = 0;

    var money_all = [];

    do {
        money_all[counter] = {};
        money_all[counter]['percent'] = 0;
        money_all[counter]['user_money_month'] = investments;
        money_all[counter]['user_money_year'] = investments * 12;

        money_all[counter]['money_per_square'] = Math.round(money_all[counter]['user_money_year']/12);

        var user_money_year_plus_percent = 0;
        for(var i = 1; i <= counter; i++) {
            user_money_year_plus_percent += money_all[i]['user_money_year'] + money_all[i]['percent'];
        }

        money_all[counter]['percent'] = Math.round(user_money_year_plus_percent * 0.1);

        money_all[counter]['total'] = Math.round(money_all[counter]['user_money_year'] + money_all[counter]['percent'] + money_all[counter]['money_per_square']);

        total += money_all[counter]['total'];



        table_body.append('<tr>' +
            '<td>' + getNumberWithYearByNumber(counter + 1) + ' (' + (current_year + counter) + ')</td>' +
            '<td>' + money_all[counter]['user_money_month'].toLocaleString('ru') + '$</td>' +
            '<td>' + money_all[counter]['user_money_year'].toLocaleString('ru') + '$</td>' +
            '<td>' + money_all[counter]['money_per_square'].toLocaleString('ru') + '$</td>' +
            '<td>' + money_all[counter]['percent'].toLocaleString('ru') + '$</td>' +
            '<td>' + total.toLocaleString('ru') + '$</td>' +
            '</tr>'
        );

        counter++;
    } while (total <= flat_cost);

    var period = counter;
    $('.j-text-period').html(getNumberWithYearByNumber(period));
});


$('.j-count-2').click(function () {
    if(!$('.j-form-name').val().trim() || !$('.j-form-cost').val() || !$('.j-form-period').val()) {

        if(current_language == 'ua'){
            alert('Для підрахунку потрібно заповнити всі поля');
        }
        else {
            alert('Для подсчёта нужно заполнить все поля');
        }
        return -1;
    }

    $('.j-way-line-2').addClass('is-active');
    $('.j-way-point-3').addClass('is-active');

    table_body.html('');
    $('.j-section-2').hide();
    $('.j-section-3').show();

    $('.j-text-name').html($('.j-form-name').val().trim());

    var flat_cost = $('.j-form-cost').val();

    var period = $('.j-form-period').val();
    $('.j-text-period').html(getNumberWithYearByNumber(period));


    var current_year = new Date().getFullYear();

    var total = 0;
    var money_all = [];

    var investments = 0;
    var mistake = 0;

    var is_ready = false;


    do {
        money_for_square = 0;
        total = 0;

        money_all = [];

        // Guess investments value
        // but on the next lap this value will be closer
        investments = Math.floor(flat_cost/period) - mistake;

        for(var counter = 0; counter < period; counter++) {

            money_all[counter] = {};
            money_all[counter]['percent'] = 0;
            money_all[counter]['user_money_year'] = investments;

            money_all[counter]['money_per_square'] = Math.round(money_all[counter]['user_money_year']/12);

            var user_money_year_plus_percent = 0;
            for(var i = 1; i <= counter; i++) {
                user_money_year_plus_percent += money_all[i]['user_money_year'] + money_all[i]['percent'];
            }

            money_all[counter]['percent'] = Math.round(user_money_year_plus_percent * 0.1);

            money_all[counter]['total'] = Math.round(money_all[counter]['user_money_year'] + money_all[counter]['percent'] + money_all[counter]['money_per_square']);
            total += money_all[counter]['total'];
        }

        if(flat_cost < total) {
            mistake += 10;

            if(is_ready == true) {
                break;
            }
        }
        else if(flat_cost == total) {
            break;
        }
        else {
            mistake--;
            is_ready = true;
        }
    } while(true);

    total = 0;
    for(var counter = 0; counter < period; counter++) {
        money_all[counter]['user_money_month'] = Math.ceil(money_all[counter]['user_money_year']/12);
        total += money_all[counter]['total'];

        table_body.append('<tr>' +
            '<td>' + getNumberWithYearByNumber(counter + 1) + ' (' + (current_year + counter) + ')</td>' +
            '<td>' + money_all[counter]['user_money_month'].toLocaleString('ru') + '$</td>' +
            '<td>' + money_all[counter]['user_money_year'].toLocaleString('ru') + '$</td>' +
            '<td>' + money_all[counter]['money_per_square'].toLocaleString('ru') + '$</td>' +
            '<td>' + money_all[counter]['percent'].toLocaleString('ru') + '$</td>' +
            '<td>' + total.toLocaleString('ru') + '$</td>' +
            '</tr>'
        );
    }

    $('.j-text-investments').html(investments.toLocaleString('ru'));
});


$('.j-repeat').click(function () {
    $('.j-way-line-1').removeClass('is-active');
    $('.j-way-point-2').removeClass('is-active');
    $('.j-way-line-2').removeClass('is-active');
    $('.j-way-point-3').removeClass('is-active');

    table_body.html('');
    $('.j-section-1').show();
    $('.j-section-2').hide();
    $('.j-section-3').hide();

    $('.j-section-2 form input').val('');
});


$('.j-contact-form').hide();
$('.j-open-contact-form').click(function () {
    $('.j-contact-form').show();
    $('html').css('overflow','hidden');
});

$('.j-close-contact-form').click(function () {
    $('.j-contact-form').hide();
    $('html').css('overflow','auto');
});


function getNumberWithYearByNumber(period) {
    var period_text = period;
    if(period == 1) {
        if(current_language == 'ua'){
            period_text = period + ' <span data-lang-element="ua" style="display: block">рік</span><span data-lang-element="ru" style="display: none">год</span>';
        }
        else {
            period_text = period + ' <span data-lang-element="ua" style="display: none">рік</span><span data-lang-element="ru" style="display: block">год</span>';
        }
    }
    else if(period < 1 || (period > 1 && period < 5)) {
        if(current_language == 'ua'){
            period_text = period + ' <span data-lang-element="ua" style="display: block">роки</span><span data-lang-element="ru" style="display: none">года</span>';
        }
        else {
            period_text = period + ' <span data-lang-element="ua" style="display: none">роки</span><span data-lang-element="ru" style="display: block">года</span>';
        }
    }
    else if( period >= 5) {
        if(current_language == 'ua'){
            period_text = period + ' <span data-lang-element="ua" style="display: block">років</span><span data-lang-element="ru" style="display: none">лет</span>';
        }
        else {
            period_text = period + ' <span data-lang-element="ua" style="display: none">років</span><span data-lang-element="ru" style="display: block">лет</span>';
        }
    }

    return period_text;
}