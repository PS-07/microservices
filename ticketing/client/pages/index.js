import buildClient from '../api/buils-client';

const LandingPage = ({ currentUser }) => {
    return (currentUser
        ? (<h1>You are signed in</h1>)
        : (<h1>You are NOT signed in</h1>));
};

// first arg is refered to context i.e. here context = { req }
LandingPage.getInitialProps = async (context) => {
    console.log('Landing page');
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');
    return data;
}

export default LandingPage;