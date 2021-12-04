
function getAccessToken() {
    debugger;
    if (location.hash) {
        if (location.hash.split('access_token')) {
            debugger;
            var accessToken = location.hash.split('access_token=')[1].split('&')[0];
            if (accessToken) {
                debugger;
                isUserRegistered(accessToken);
                debugger;
                alert('1 >>> ' + accessToken);
            }
        }
    }
}

function isUserRegistered(accessToken) {
    debugger;
    $.ajax({
        url: '/api/Account/UserInfo',
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + accessToken
        },
        success: function (response) {
            debugger;
            if (response.HasRegistered) {
                debugger;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('userName', response.Email);
                window.location.href = "Help";
                alert("2 >>> " + accessToken);
            } else {
                debugger;
                signupExternalUser(accessToken);
            }
        }
    });
}

function signupExternalUser(accessToken) {
    debugger;
    $.ajax({
        url: '/api/Account/RegisterExternal',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + accessToken
        },
        success: function () {
            debugger;
            window.location.href = "Help";
            alert('3 >>> ' + accessToken);
        }
    });
}