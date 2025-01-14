
describe('test /spaceships endpoint', () => {
    test('get_all_spaceships_should_return_200', async () => {
        const response = await fetch("http://localhost:3000/spaceships/", {
            headers: {
                "Content-Type": 'application/json',
            },
            method: "GET",
        })


        const body = await response.json();

        console.log(body);
        expect(body.status).toBe("success");
        expect(response.status).toEqual(200);
    });


    test('post_spaceship_should_return_201', async () => {
        const response = await fetch("http://localhost:3000/spaceships/", {
            headers: {
                "Content-Type": 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                "model": "AAAA",
                "manufacturer": "BBBB",
                "capacity": 10
            })
        })

        expect(response.status).toEqual(201)
    });

    test('post_spaceship_should_return_201', async () => {
        const response = await fetch("http://localhost:3000/spaceships/", {
            headers: {
                "Content-Type": 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                "model": "AAAA",
                "manufacturer": "BBBB",
                "capacity": 10
            })
        })

        expect(response.status).toEqual(201)
    });
});
