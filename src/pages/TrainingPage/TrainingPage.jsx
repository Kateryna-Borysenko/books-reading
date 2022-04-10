import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/common/Container';
import Allimer from '../../components/Alltimer/Alltimer';
import ALLdatePicker from '../../components/Alldatepicker/Alldatepicker';
import TrainigForm from '../../components/TrainingForm/TrainingForm';
import TrainingBookList from '../../components/TrainingBookList/TrainingBookList';
import StartGoal from '../../components/MyGoal/StartGoal';
import ResultGoal from '../../components/MyGoal/ResultGoal';
import LineChart from 'components/LineChart/LineChart';
import Statistics from '../../components/Statistics/Statistics';
import s from './TrainingPage.module.css';
import {
  getIsTraining,
  getIsTrainingGo,
} from '../../redux/training/trainingSelectors';
import { getUserBooks } from '../../redux/book/bookSelectors';

// import { getTraningData } from 'redux/training/trainingOperatons';
import { startTraining } from '../../redux/training/trainingOperatons';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const TrainingPage = () => {
  const dispatch = useDispatch();
  const books = useSelector(getUserBooks);
  const isTraining = useSelector(getIsTraining);
  const isTrainingGo = useSelector(getIsTrainingGo);

  const [inputValue, setInputValue] = useState('');
  const [newBooks, setNewBooks] = useState(
    () => JSON.parse(localStorage.getItem('newBooks')) || []
  );

  const [trainingList, setTrainingList] = useState({
    startDate: '',
    endDate: '',
    books: newBooks.map(({ _id }) => _id),
  });

  // const bookTitle = books.goingToRead.map(book => book._id);

  const addNewBook = chooseBook => {
    if (inputValue === '') {
      Notify.warning('Оберіть книгу');
    } else if (!inputValue === '') {
      return;
    }

    if (newBooks.includes(chooseBook)) {
      Notify.warning('Книга вже додана у список');
    } else if (inputValue === '') {
      return;
    } else setNewBooks(prevNewBooks => [...prevNewBooks, chooseBook]);

    setTrainingList(prevTrainingList => ({
      ...prevTrainingList,
      books: [...prevTrainingList.books, chooseBook._id],
    }));
  };
  console.log(newBooks);

  const deleteTrainingBook = _id => {
    setNewBooks(prev => prev.filter(newBook => newBook._id !== _id));
  };

  const onSubmit = e => {
    // if (inputValue !== bookTitle) {
    //   Notify.warning('Виберіть зі списку');
    //   return;
    // }
    if (trainingList.startDate === '') {
      Notify.warning('Виберіть дату початку');
    } else if (trainingList.endDate === '') {
      Notify.warning('Виберіть дату завершення');
    } else {
      dispatch(startTraining(trainingList));
    }
    // dispatch(getTraningData());
  };

  function daysLeft() {
    return Math.floor(
      ((Date.parse(trainingList.endDate) - Date.parse(trainingList.startDate)) /
        (1000 * 60 * 60 * 24)) %
        30
    );
  }
  return (
    <Container>
      <div className={s.trainingPage}>
        {isTraining && <Allimer expiryTimestamp={daysLeft() * 60 * 60 * 24} />}
        <div className={s.trainingPageFlex}>
          {!isTraining && (
            <StartGoal
              daysLeft={daysLeft}
              newBooks={newBooks}
              className={s.startGoal}
            />
          )}
          {isTraining && (
            <ResultGoal
              daysLeft={daysLeft}
              newBooks={newBooks}
              className={s.resultGoal}
            />
          )}
          <div className={s.trainingContainer}>
            <div className={s.mobileModalTraining}>
              <div className={s.startTimer}>
                {!isTraining && (
                  <>
                    <h2 className={s.trainingTitle}>Моє тренування</h2>
                    <ALLdatePicker
                      setTrainingList={setTrainingList}
                      trainingList={trainingList}
                    />
                  </>
                )}
              </div>

              {!isTraining && (
                <TrainigForm
                  books={books}
                  newBooks={newBooks}
                  setNewBooks={setNewBooks}
                  addNewBook={addNewBook}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              )}
            </div>

            <TrainingBookList
              newBooks={newBooks}
              setNewBooks={setNewBooks}
              deleteTrainingBook={deleteTrainingBook}
            />
            {!isTraining && (
              <button
                type="button"
                className={s.startTrainingBtn}
                onClick={() => {
                  onSubmit();
                }}
              >
                Почати тренування
              </button>
            )}
          </div>
        </div>

        <div className={s.statisticsFlex}>
          <LineChart />
          <Statistics />
        </div>
      </div>
    </Container>
  );
};

export default TrainingPage;
