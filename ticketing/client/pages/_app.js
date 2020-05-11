import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buils-client';
import Header from '../components/header';

// it acts like a wrapper around our components
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <Component {...pageProps} />
        </div>
    );
};

// here context = { Component, ctx: { req, res } }
AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return { pageProps, ...data };
}

export default AppComponent;