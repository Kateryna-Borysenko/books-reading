import s from '../Library/Library.module.css';
import { ReactComponent as Training } from '../../images/training-icon.svg';
import { useSelector } from 'react-redux';
import { getBooks } from '../../redux/auth/authSelectors';

const GoingToRead = () => {
  const books = useSelector(getBooks);

  return (
    <table className={s.table}>
      <caption className={s.tableCaption}>Маю намір прочитати</caption>
      <thead>
        <tr className={s.tableHeader}>
          <th className={s.title}>Назва книги</th>
          <th className={s.author}>Автор</th>
          <th className={s.year}>Рік</th>
          <th className={s.page}>Стор.</th>
        </tr>
      </thead>
      <tbody>
        {books.map(({ _id, title, author, publishYear, pagesTotal }) => (
          <tr key={_id} className={s.bookItem}>
            <td className={s.itemTitle}>
              <Training className={s.orange} /> {title}
            </td>
            <td>{author}</td>
            <td>{publishYear}</td>
            <td>{pagesTotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GoingToRead;
