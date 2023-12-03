import { useEffect, useState } from 'react';
import css from './DetailSection.module.css';
import DetailText from 'components/DetailText';

function DetailSection() {
  const [showDetails, setShowDetails] = useState(false);
  const [showActiveInfo, setActiveInfo] = useState('user');

  useEffect(()=>{

  }, [showActiveInfo])

  const handleChangeState = () => {
    setShowDetails(prevState => !prevState);
  };

  const handleChangeInfo = info => {
    setActiveInfo(info);
  };

  return (
    <div>
      <div>
        <button
          className={`${css.Btn} ${
            showActiveInfo === 'user' ? css.isActive : ''
          } `}
          type="button"
          onClick={() => handleChangeInfo('user')}
        >
          User
        </button>
        <button
          className={`${css.Btn} ${
            showActiveInfo === 'views' ? css.isActive : ''
          } `}
          type="button"
          onClick={() => setActiveInfo('views')}
        >
          Views
        </button>
        <button
          className={`${css.Btn} ${
            showActiveInfo === 'comments' ? css.isActive : ''
          } `}
          type="button"
          onClick={() => handleChangeInfo('comments')}
        >
          Comments
        </button>
      </div>

      {showActiveInfo === 'user' && <p>I'm a USER INFO</p>}
      {showActiveInfo === 'views' && <p>I'm INFO about VIEWS</p>}
      {showActiveInfo === 'comments' && <p>I'm COMMENTS</p>}

      <button type="button" onClick={handleChangeState}>
        Toggle Details
      </button>
      {showDetails === true && <DetailText />}
    </div>
  );
}

export default DetailSection;
