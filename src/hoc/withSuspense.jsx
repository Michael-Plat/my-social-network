import React, { Suspense } from 'react';

export const withSuspense = (Comment) => {
    return (props) => {
       return <Suspense fallback={<div>Loading...</div>}><Comment {...props} /></Suspense>
    };
}; 