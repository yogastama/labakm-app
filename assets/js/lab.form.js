resetValidate = (selector, validateObject = null) => {
    let validate = validateObject ? validateObject.resetForm() : $(selector).validate().resetForm()

    $(`${selector} .is-invalid`).each(function () {
        $(this).removeClass('is-invalid').removeAttr('aria-describedby');
    });
    $(`${selector} .invalid-feedback`).each(function () {
        $(this).remove();
    });

    $(selector)[0].reset();

    return validate;
}

$.validator.setDefaults({
    highlight: function (element) {
        $(element).addClass('is-invalid');
        $(element).closest('.form-group').addClass('is-invalid');
    },
    unhighlight: function (element) {
        $(element).removeClass('is-invalid');
        $(element).closest('.form-group').removeClass('is-invalid');
    },
    errorElement: 'small',
    errorClass: 'invalid-feedback',
    errorPlacement: function (error, element) {
        if (element.closest('.form-group').length) {
            element.closest('.form-group').append(error);
        } else {
            error.insertAfter(element);
        }
    }
});
function formDefaultFilled(element) {
    var input = $(element).find('.form-control').val();
    input != '' ? $(element).addClass('form-group-default-filled') : $(element).removeClass('form-group-default-filled')
}

$(document)
    .on("click", '.form-group-default-input', function () {
        $(this).find('.form-control')[0].focus();
    })
    .on("input", ".form-group-default-input input", function () {
        $(this).closest('.form-group-default').trigger('filled-input');
    })
    .on("filled-input", ".form-group-default", function () {
        formDefaultFilled(this);
    });

$(".my-validate").each(function () {
    $(this).validate();
});

$(".form-group-default").each(function () {
    formDefaultFilled(this);
});