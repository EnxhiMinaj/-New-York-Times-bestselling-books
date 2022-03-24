import React, { useCallback, useEffect, useState } from 'react';
import Chevron from 'react-chevron'
import axios from 'axios';


interface IProps {
  open?: boolean;
  title: string;
  customClass?: string;
}

const Collapsible: React.FC<IProps> = ({ open, children, title, customClass }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [reviews, setReviews] = useState([]);

    

  const getReviews = useCallback(async () => {
    const results = await axios.get(`/api/books/reviews/${title}`);
    setReviews(results.data);
  }, [title])

  const handleFilterOpening = async () => {
    setIsOpen((prev) => !prev);
    if(customClass !== 'sec-title') {
        await getReviews();
    }
  };

  return (
    <>
        <div className={isOpen ? "card color-active" : 'card'}>
          <div className="card-element">
            <p className={customClass}>{title}</p>
            <button type="button" className="button" onClick={handleFilterOpening}>
              {!isOpen ? (
                <Chevron direction={'down'}/>
              ) : (
                <Chevron direction={'up'}/>
              )}
            </button>
          </div>
        </div>

        <div className={customClass === 'sec-title' ? '' : "border-bottom"}>
            <div>
                {isOpen && <div className="p-3">{children}</div>}            
          </div>
        </div>
    </>
  );
};

export default Collapsible;