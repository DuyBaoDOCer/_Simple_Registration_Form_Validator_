function Validator(options) {
    function validate(inputElement, rule) {
        //value: inputElement.value
        //test func: rule.test
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    //Lấy element của form cần validate
    var formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                // xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorMessage = rule.test(inputElement.value)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập ít nhất ${min} kí tự`
        }
    }
}
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}