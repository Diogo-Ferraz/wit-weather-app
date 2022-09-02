import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

interface SearchProps {
  submitSearch: any
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-right: -0.5rem;
    margin-left: -0.5rem;
    margin-top: -0.5rem;
`;

const SearchGroup = styled.div`
    flex: 0 0 auto;
    padding: 0.5rem;
`;

const InputGroup = styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
`;

const SearchButton = styled.button`
    width: auto;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    color: #ffffff;
    background: rgb(25 32 56);
    border: 1px solid rgb(25 32 56);
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
`;


const ErrorSpan = styled.small`
    margin-top: 0.25rem;
    color: #e24c4c;
    display: block;
`;

const formikFieldStyle = {
  flex: '1 1 auto',
  width: '1%',
  borderTopLeftRadius: '6px',
  borderBottomLeftRadius: '6px',
  fontSize: '1rem',
  color: '#495057',
  background: '#ffffff',
  padding: '0.75rem 0.75rem',
  border: '1px solid #ced4da',
  transition: 'background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s',
  appearance: 'none'
};

const Search: FC<SearchProps> = ({ submitSearch }) => {
  return (
    <Formik
      initialValues={{ location: '' }}
      validationSchema={Yup.object({
        location: Yup.string().required('Required field'),
      })}
      onSubmit={(values) => {
        submitSearch(values.location);
      }}
    >
      <Form>
        <Wrapper>
          <SearchGroup>
            <InputGroup>
              <Field style={formikFieldStyle} name="location" type="text" placeholder="Insert a city" />
              <SearchButton type='submit'>Search</SearchButton>
            </InputGroup>
          </SearchGroup>
        </Wrapper>
        <ErrorSpan>
          <ErrorMessage name="location" />
        </ErrorSpan>
      </Form>
    </Formik>
  );
};

export default Search;
