export const validate = (input) => {
    if (input.type === 'email' || input.name === 'email') {
        if (
            input.value
                .trim()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                ) == null
        ) {
            return false;
        }
    } else if (input.name === 'phoneNumber') {
        if (input.value.trim().match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g) == null) {
            return false;
        }
    } else {
        if (input.value.trim() === '') {
            return false;
        }
    }
};

export const showValidate = (input, cx) => {
    const thisAlert = input.parentElement;
    thisAlert.classList.add(`${cx('alert-validate')}`);
};

export const hideValidate = (input, cx) => {
    const thisAlert = input.parentElement;

    thisAlert.classList.remove(`${cx('alert-validate')}`);
};
