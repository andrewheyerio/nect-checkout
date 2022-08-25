import React from 'react';
import Head from "next/head";

const Layout = (props) => {
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
                      crossOrigin="anonymous"/>
                <script src="https://js.stripe.com/v3/"></script>
            </Head>

            <div className="container">
                {props.children}
            </div>
        </>
    );
};

export default Layout;