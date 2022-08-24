import React from 'react';
import Layout from "../components/Layout";

const Success = () => {
    return (
        <Layout>
            <div className="py-5 text-center">
                <h2>Success</h2>
                <p className="lead">Your purchase has been completed!</p>
            </div>
        </Layout>
    );
};

export default Success;