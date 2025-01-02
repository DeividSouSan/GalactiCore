
describe('spaceships entity routes', () => {
    test('post_should_return_200', async () => {
        const response = await fetch("http://localhost:3000/spaceships/", {
            headers: {
                "Content-Type": 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                "model": "2025",
                "manufacturer": "God",
                "capacity": 12
            })
        })

        expect(response.status).toEqual(200)
    });

    test('get_to_spaceships_should_return_200', async () => {
        const response = await fetch("http://localhost:3000/spaceships/")

        expect(response.status).toEqual(200)
    });

    test('get_to_spaceships_id_should_return_200', async () => {
        const response = await fetch("http://localhost:3000/spaceships/1")

        expect(response.status).toEqual(200)
    });

    test('put_to_spaceships_id_should_return_200', async () => {
        const response = await fetch("http://localhost:3000/spaceships/")

        expect(response.status).toEqual(200)
    });

    test('delete_to_spaceships_id_should_return_200', async () => {
        const response = await fetch("http://localhost:3000/spaceships/2", {
            method: 'DELETE',
        })

        expect(response.status).toEqual(200)
    });
});
