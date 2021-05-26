export default function (data, key) {

    let unique = [];

    data.map(entry => {
        if (entry[key] && unique.indexOf(entry[key]) === -1) unique.push(entry[key])
    })

    return unique;

}