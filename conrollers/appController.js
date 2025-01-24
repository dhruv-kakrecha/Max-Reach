exports.allAppData = (req, res) => {
    res.json({
        status: true,
        data: {
            serviceData: {
                title: "our service",
                subtitle: "Effective Solutions",
                description: "Our power of choice is untrammelled and when nothing prevents being able to do what we like best every pleasure. Our power of choice is untrammelled and when nothing prevents being able to do what we like best every pleasure.",
                services: [
                    {
                        title: "Talent Management",
                        description: "Once your company has hired the best employees, the next step.",
                        image: "/assets/images/service/service-image-6.jpg",
                        bulletPoints: [
                            "Reducing Redundancy",
                            "Uncovering Hidden Resources",
                            "Increasing Company’s Agility",
                        ],
                    },
                    {
                        title: "Ask Professionals",
                        description: "Once your company has hired the best employees, the next step.",
                        image: "/assets/images/service/service-image-2.png",
                        bulletPoints: [
                            "Reducing Redundancy",
                            "Uncovering Hidden Resources",
                            "Increasing Company’s Agility",
                        ],
                    },
                    {
                        title: "Support to Grow",
                        description: "Once your company has hired the best employees, the next step.",
                        image: "/assets/images/service/service-image-3.png",
                        bulletPoints: [
                            "Reducing Redundancy",
                            "Uncovering Hidden Resources",
                            "Increasing Company’s Agility",
                        ],
                    },
                ]

            }
        }
    })
}


exports.getUserDetails = (req, res) => {
    const { id, name, age } = req.query;

    // Define required fields
    const requiredFields = ["id", "name", "age"];

    // Find missing fields
    const missingFields = requiredFields.filter(field => !req.query[field]);

    

    // If any fields are missing, return a custom message
    if (missingFields.length > 0) {
        return res.send(
            `
             <html>
             <head>
             <title>Missing Fields</title>
             </head>
             <body>
             <h1>Missing Fields</h1>
             <p>Please provide the following fields: ${missingFields.join(", ")}</p>
             </body>
             </html>


            `
        )
        // return res.json({
        //     status: false,
        //     message: `${missingFields.join(", ")} is required`
        // });
    }

    // // If all fields are provided, return the data
    // res.json({
    //     status: true,
    //     data: {
    //         userDetails: {
    //             id,
    //             name,
    //             age,
    //         }
    //     },
    //     message: `${name} is ${age} years old`
    // });

    res.send(
        `
         <html>
            <head>
                <title>User Details</title>
            </head>
            
            <body>
                <h1>User Details</h1>
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Age:</strong> ${age}</p>
                <p>${name} is ${age} years old.</p>
            </body>
        </html>`
    )
};
