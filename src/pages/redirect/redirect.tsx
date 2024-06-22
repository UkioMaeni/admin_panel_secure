import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage:FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home'); // Переход на страницу "/target-page"
  }, []);

  return <div></div>; // Компонент ничего не отображает
};

export default RedirectPage;
