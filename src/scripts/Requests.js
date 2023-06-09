import { deleteRequest, getRequests, getPlumbers, saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (e) => {
        if(e.target.id === "plumbers") {
            const [requestId, plumberId] = e.target.value.split("--")


            // Getting current date in dd/mm/yyyy format
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const formattedToday = dd + '/' + mm + '/' + yyyy;

            /* 
                This object should have 3 properties
                    1. requestId
                    2. plumberId
                    3. date_created
            */
            const completion = {
                "requestId": requestId,
                "plumberId": plumberId,
                "dateCreated": formattedToday
            }

            /* 
                Invoke the function that performs the POST request
                to the 'completions' resource of your API. Send the 
                completion object as a parameter
            */
            saveCompletion(completion)
        }
    }
)

//Define a function to convert each service request object into HTML representations
    //Should return html
export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    //Should take in 1 parameter (request object in array)
    //Desc of service request should be interpolated inside the <li> HTML representation
    let html = `
        <table id="request__table">
            <tr>
            <th>Description</th>
            <th>Completed By</th>
            <th></th>
            <th></th>
            </tr>
                ${
                    requests.map(request => {
                        return `
                        <tr>
                        <td>
                            ${request.description}
                        </td>
                        <td>
                        <select class="plumbers" id="plumbers">
                            <option value="">Choose</option>
                            ${
                                plumbers.map(
                                    plumber => {
                                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                                    }
                                ).join("")
                            }
                        </select>
                        </td>
                        <td id="table__space">
                        </td>
                        <td>
                            <button class="request__delete"
                                    id="request--${request.id}">
                                Delete
                            </button>
                        </td>
                        </tr>`
                    }).join("")
                }
        </table>`

    return html
}