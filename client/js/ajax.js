export function Post(url, requestData, callback) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(requestData),
        dataType: 'json',
        success: function(responseData, status, jqXHR) {
            callback(responseData);
        }
    });
};
