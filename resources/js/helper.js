const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options).replace(/,/g, '');
};

export {formatDate}