import axios from "axios";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options).replace(/,/g, '');
};

const encrypt = (data) => {
    data = data.toString()
    
    let output = '';
    const key = "7918375013298347"
    for (let i = 0; i < data.length; i++) {
        output += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    console.log(btoa(output));
    
    return btoa(output);
}



export {formatDate,encrypt}