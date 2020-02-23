const BASE_URL = 'https://myvmware.workspaceair.com';
let currentResults = null;

function storeSuccess(results) {
    if (results.status === 200) {
        currentResults = results.json;
    }
    return results;
}

function checkAuthenticated(results) {
    if (results.status === 401) {
        chrome.tabs.create({url: BASE_URL});
    }
    return results;
}

function onPopupLoad(successCallback) {
    if (currentResults !== null) {
        successCallback(currentResults);
    } else {
        fetch(BASE_URL + '/catalog-portal/services/api/entitlements', {
            credentials: 'include'
        }).then(checkAuthenticated)
            .then(storeSuccess)
            .then(res => res.json())
            .then(successCallback)
    }
}