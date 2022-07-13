// app.js
const http = require("http");
const user = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    //api/signin : post
    if (req.url === "/api/signup" && req.method === "POST") {
        // get the data sent along
        
        let user_data = await getReqData(req);
        // create the user
        let user = await new user().createuser(JSON.parse(user_data));
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the user
        res.end(JSON.stringify(user));
    }
    
    // api/login : post

    // else if (req.url="/api/login" && req.method === "post") {
    //     try {
            
    //         let user_data = await getReqData(req);
    //         let data = JSON.parse(user_data);
    //         let {name,password} = {data}
            
    //         console.log(name)
    //         // get user
    //         const user = await new user().getuser(name);
    //         // set the status code and content-type
    //         res.writeHead(200, { "Content-Type": "application/json" });
    //         // send the data
    //         res.end(JSON.stringify(user));
    //     } catch (error) {
    //         // set the status code and content-type
    //         res.writeHead(404, { "Content-Type": "application/json" });
    //         // send the error
    //         res.end(JSON.stringify({ message: error }));
    //     }
    // }
    


    // /api/users : GET
    else if (req.url === "/api/users" && req.method === "GET") {
        // get the users.
        const users = await new user().getusers();
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(users));
    }

    // /api/users/:id : GET
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        try {
            // get id from url
            console.log(1)
            const id = req.url.split("/")[3];
            console.log(id)
            // get user
            const userf = await new user().getuser(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(userf));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/users/:id : DELETE
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete user
            let message = await new user().deleteuser(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/users/:id : UPDATE
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "PATCH") {
        try {
            let user_data = await getReqData(req);
           
            // get the id from the url
            const id = req.url.split("/")[3];
            // update user
            let updated_user = await new user().updateuser(id,JSON.parse(user_data));
            
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_user));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

   
    

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
})