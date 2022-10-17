export async function api(response, {session}) {
    if(response.method !== 'POST') {
        return new Response ('Post required to logout', {
            status: 405,
            headers: {
                Allow: 'POST'
            }
        })
    }

    if(!session) {
        return new Response('Session storage not available',{
            status: 400,
        });
    }

    await session.set('customerAccessToken', '');

    return new Response();
}