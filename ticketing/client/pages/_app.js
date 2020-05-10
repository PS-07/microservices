import 'bootstrap/dist/css/bootstrap.css';

// it acts like a wrapper around our components
export default ({ Component, pageProps }) => {
    return <Component {...pageProps} />
};