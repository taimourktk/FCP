export default function (form) {

    let form_ = new FormData(form);
    let data = [... form_];
    let formData = {};
    data.map(val => {
        formData[val[0]] = val[1];
    });
    return formData;

}