// Used format_date code from activities //
// Used StackOverflow for help with the truncate function //
module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        if (!date) {
            return '';
        }

        return new Date(date).toLocaleDateString();
    },
    truncate: (str, len) => {
        if (str.length > len) {
            return str.substring(0, len) + '...';
        }
        return str;
    }
};

