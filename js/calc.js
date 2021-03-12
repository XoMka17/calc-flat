$('.j-result').hide();

$('.j-count').click(function () {
    $('.j-result').show();

    $('.j-text-name').html($('.j-form-name').val());

    var investments = $('.j-form-investments').val();
    $('.j-text-investments').html(investments);


    var current_year = new Date().getFullYear();
    var table_body = $('.j-table-body');
    table_body.html('');
    var counter = 1;
    var amount_by_user = 0;
    var amount_for_squar = 0;
    var percent = 0;
    var total_amount = 0;

    do {

        amount_by_user = investments * 12;

        if(amount_by_user >= 1200) {
            amount_for_squar = (amount_by_user/1200).toFixed(0) * 100;
        }
        else {
            amount_by_user = 0;
        }

        percent = (total_amount * 0.1);
        total_amount += amount_by_user + percent;



        table_body.append('<tr>');

        table_body.append('<td>' + counter + ' год (' + current_year + ')</td>');
        table_body.append('<td>' + amount_by_user.toLocaleString('ru') + '$</td>');
        table_body.append('<td>' + amount_for_squar + '$</td>');
        table_body.append('<td>' + percent.toLocaleString('ru') + '$</td>');
        table_body.append('<td>' + (total_amount).toLocaleString('ru') + '$</td>');

        table_body.append('</tr>');

        counter++;
    } while (counter < 6);

    var period = ($('.j-form-cost').val() / (investments * 12)).toFixed(1);
    var period_text = period;

    if(period == 1) {
        period_text = period + ' год';
    }
    else if(period < 1 || (period > 1 && period < 5)) {
        period_text = period + ' года';
    }
    else if( period >= 5) {
        period_text = period + ' лет';
    }

    $('.j-text-period').html(period_text);
});