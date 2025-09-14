import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import Loading from '../loading/loading';
import Error from '../error/error';

interface SearchProps {
  submitSearch: any;
  isCelsius: boolean;
  isLoading: boolean;
  error: string | undefined;
  onTemperatureToggle: (isCelsius: boolean) => void;
  clearError: () => void;
}

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
    padding: 0 16px;
  }
`;

const SearchCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-width: 400px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
    max-width: 400px;
    padding: 24px;
  }
`;

const SearchTitle = styled.h1`
  color: white;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SearchSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  margin: 0 0 24px 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  position: relative;
  margin-bottom: 16px;
`;

const StyledField = styled(Field)`
  flex: 1;
  padding: 16px 20px;
  font-size: 1rem;
  color: #333;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-right: none;
  border-radius: 12px 0 0 12px;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 300;
  }

  &:focus {
    background: rgba(255, 255, 255, 1);
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 0.95rem;
  }
`;

const SearchButton = styled.button`
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-left: none;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  white-space: nowrap;
  letter-spacing: 0.3px;

  &:hover {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 0.95rem;
  }
`;

const ErrorContainer = styled.div`
  min-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(96, 165, 250, 0.15);
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
`;

const LoadingText = styled.span`
  color: #60A5FA;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UnitLabel = styled.span`
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.2s ease;
  user-select: none;
  
  &.active {
    color: #60A5FA;
    text-shadow: 0 0 6px rgba(96, 165, 250, 0.4);
  }
  
  &.inactive {
    opacity: 0.6;
  }
`;

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ToggleInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 48px;
  height: 26px;
  cursor: pointer;
  z-index: 2;
`;

const ToggleSlider = styled.div`
  position: relative;
  width: 48px;
  height: 26px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  ${ToggleInput}:checked + & {
    background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
    border-color: rgba(96, 165, 250, 0.5);
    
    &::after {
      transform: translateX(22px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }
  }

  ${ToggleInput}:hover + & {
    background: rgba(255, 255, 255, 0.25);
  }

  ${ToggleInput}:checked:hover + & {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  }
`;

const Search: FC<SearchProps> = ({ submitSearch, isCelsius, onTemperatureToggle, error, isLoading, clearError }) => {
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTemperatureToggle(!e.target.checked);
  };

  return (
    <SearchContainer>
      <SearchCard>
        <SearchTitle>Weather Forecast</SearchTitle>
        <SearchSubtitle>Get the 5-day weather forecast for any city</SearchSubtitle>

        <Formik
          initialValues={{ location: '' }}
          validationSchema={Yup.object({
            location: Yup.string().required('Please enter a city name'),
          })}
          onSubmit={(values) => {
            submitSearch(values.location);
          }}
        >
          {({ isSubmitting, errors, touched }) => {
            const formikError: string | null =
              touched.location && errors.location
                ? errors.location : null;

            const errorToShow: string | null =
              formikError || (error ?? null);

            return (
              <Form>
                <InputGroup>
                  <Field name="location">
                    {({ field }: { field: any }) => (
                      <StyledField
                        {...field}
                        type="text"
                        placeholder="Enter city name (e.g., Paris)"
                        disabled={isLoading}
                        onFocus={() => clearError()}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          clearError();
                          field.onChange(e);
                        }}
                      />
                    )}
                  </Field>

                  <SearchButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                  </SearchButton>
                </InputGroup>

                <ErrorContainer>
                  {errorToShow && !isLoading && <Error message={errorToShow} />}
                  {isLoading && (
                    <LoadingContainer>
                      <Loading />
                      <LoadingText>Fetching weather data...</LoadingText>
                    </LoadingContainer>
                  )}
                </ErrorContainer>
              </Form>
            );
          }}
        </Formik>

        <ToggleContainer>
          <ToggleGroup>
            <UnitLabel className={isCelsius ? 'active' : 'inactive'}>
              °C
            </UnitLabel>

            <ToggleWrapper>
              <ToggleInput
                id="temperature-toggle"
                type="checkbox"
                onChange={handleToggleChange}
                checked={!isCelsius}
                disabled={isLoading}
              />
              <ToggleSlider />
            </ToggleWrapper>

            <UnitLabel className={!isCelsius ? 'active' : 'inactive'}>
              °F
            </UnitLabel>
          </ToggleGroup>
        </ToggleContainer>
      </SearchCard>
    </SearchContainer>
  );
};

export default Search;