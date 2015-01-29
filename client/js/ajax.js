export function Post(url, requestData) {
    console.warn("post", url, requestData);
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(requestData),
        dataType: 'json',
        success: function(responseData, status, jqXHR) {
            //var data = JSON.parse(responseData);
            console.warn("got", responseData);
        }
    });
};
