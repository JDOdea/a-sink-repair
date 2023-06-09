const applicationState = {
    requests: []
}

const API = "http://localhost:8088"

const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    //    fetch("http://localhost:8088/requests")
    return fetch(`${API}/requests`)
        .then(res => res.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    //    fetch("http://localhost:8088/plumbers")
    return fetch(`${API}/plumbers`)
        .then(res => res.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

// Define and export a function that returns a copy of the requests state
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(res => res.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE"})
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// Define and export a function that performs the POST request to save the completion object to the API
export const saveCompletion = (userServiceCompletion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceCompletion)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(res => res.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// Define and export a function that will retrieve all completion objects from the API
export const fetchCompletions = () => {
    //    fetch("http://localhost:8088/completions")
    return fetch(`${API}/completions`)
    .then(res => res.json())
    .then(
        (completions) => {
            applicationState.completions = completions
        }
    )
}