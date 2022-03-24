import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import './App.scss';
import Collapsible from "./Collapsible";


const App = () => {

  const [bookTypes, setBookTypes] = useState([]);
  const [selectedBookType, setSelectedBookType] = useState({value: '', label: 'Select Book Category'});
  const [books, setBooks] = useState([] as any[]);

  const getBooks = useCallback(async () => {
    const results = await axios.get(`/api/books/${selectedBookType.value}`);
    setBooks(results.data);
  }, [selectedBookType])

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBookTypes(data.results));
  }, []);

  useEffect(() => {
    if(selectedBookType.value.length) {
      getBooks();
    }
  }, [getBooks, selectedBookType])
  
  type OptionType = {
    value: string;
    label: string;
  };


  const options: OptionType[] = 
    bookTypes.map((bookType: any) => ({ value: bookType.list_name_encoded, label: bookType.display_name}));

  const handleChange = (option: SingleValue<{ value: string | null | undefined; label: string | null | undefined; }>) => {
    setSelectedBookType({value: option?.value  || '', label: option?.label  || ''})
  };

  return (
    <div className="App">
      <header className="App-header">
        {console.log(books)}
        <Select 
           className='custom-select'
           defaultValue={selectedBookType}
           onChange={option => handleChange(option)}
           options={options}
        />
        {books.map((book) => {
          return (
            <>
              <div className={selectedBookType.value.length ? '' : 'no-display-books'}>
                <Collapsible title={book.title} customClass='title'>
                  <p className='color-active'>Author: {book.author}</p>
                  <Collapsible title='ISBN' customClass='sec-title'>
                    {book.isbns.map((isbn: any) => {
                      return (
                        <>
                          <p>ISBN10: {isbn.isbn10}</p>
                          <p>ISBN13: {isbn.isbn13}</p>
                        </>
                      )
                    })}
                  </Collapsible>
                  <Collapsible title='Reviews' customClass='sec-title'>
                    {book.isbns.map((isbn: any) => {
                      return (
                        <>
                          <p>ISBN10: {isbn.isbn10}</p>
                          <p>ISBN13: {isbn.isbn13}</p>
                        </>
                      )
                    })}
                  </Collapsible>
                </Collapsible>
              </div>
            </>
          )
        })}
      </header>
    </div>
  );
}

export default App;
