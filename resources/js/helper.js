import Swal from "sweetalert2";

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
    
    return btoa(output);
}

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const unformatNumber = (str) => {
    return str.replace(/,/g, '');
};

const showAlert = (title, text, icon) => {
    Swal.fire({
        title : title,
        text : text,
        icon : icon
    })
}

const sanitizedNumber = (value) => {
    return value.replace(/[^0-9,]/g, '');
}

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi ditambah 1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


export {
    formatDate,
    encrypt, 
    formatNumber,
    unformatNumber,
    showAlert,
    sanitizedNumber,
    getTodayDate
}