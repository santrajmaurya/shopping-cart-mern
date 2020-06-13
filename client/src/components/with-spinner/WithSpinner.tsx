import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './WithSpinnerStyles';

interface WithSpinnerProps {
    isLoading?: boolean
}

const WithSpinner = <P extends object>(WrappedComponent: React.FC<P>): React.FC<P & WithSpinnerProps> => { 
   const Spinner = ({ isLoading, ...props }: WithSpinnerProps) => {
   return  isLoading ? (
    <SpinnerOverlay> 
        <SpinnerContainer />
    </SpinnerOverlay> 
    ) : (
    <WrappedComponent {...props as P} />
    );
   }

   return Spinner;
}

export default WithSpinner;


