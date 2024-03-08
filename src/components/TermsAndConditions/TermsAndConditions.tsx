import React, { useState } from 'react';
import './TermsAndConditions.css';

interface TermsAndConditionsProps {
  titleClassName?: string;
  contentClassName?: string;
  chevronClassName?: string;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  titleClassName,
  contentClassName,
  chevronClassName
}) => {
    const [showContent, setShowContent] = useState<boolean>(false);
    const [chevronDirection, setChevronDirection] = useState<string>('bi-chevron-down');

    const toggleContent = () => {
        setShowContent(prevState => !prevState);
        setChevronDirection(prevState => prevState === 'bi-chevron-down' ? 'bi-chevron-right' : 'bi-chevron-down');
    };

    return (
        <div className='flex flex-col justify-center content-center m-5'>
        <div
            className={`flex cursor-pointer ${titleClassName}`}
            onClick={toggleContent}
            >
            <h4>Términos y Condiciones</h4>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            // Adiciona o rotate
            className={`bi ${chevronDirection} ${chevronClassName}` + (showContent ? ' rotated' : '')}
            viewBox="0 0 16 16"
            >
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
            </svg>
        </div>
        <p className={contentClassName}>Después de la confirmación, regresará al entorno de la institución X.</p>
        {/* {showContent && (

        )} */}
        </div>
    );
};

export default TermsAndConditions;
