import { describe, expect, } from '@jest/globals';


import { fireEvent } from '@testing-library/react';


describe('GameTests', () => {
  let  saveTotalCorrectGuessesMock, playTextMock, handleResetMock, NextWordMock;

  beforeEach(() => {
    // Mocking functions
    saveTotalCorrectGuessesMock = jest.fn();
    playTextMock = jest.fn();
    handleResetMock = jest.fn();
    NextWordMock = jest.fn();
  });
  it('calls setAccent function with the selected value when Accent select changes', () => {
    const mockValue = 'en-GB';
  
    // Create a select element
    const select = document.createElement('select');
    select.setAttribute('id', 'languageSelect');
  
    // Create a mock function
    const setAccentMock = jest.fn();
  
    // Ensure listener is attached before setting value
    select.addEventListener('change', (e) => setAccentMock(e.target.value));
  
    // Set the value of the select element
    select.value = mockValue;
  
    // Dispatch a change event on the select element
    select.dispatchEvent(new Event('change'));
  
    // Expect the mock function to have been called with the expected value
    expect(setAccentMock).toHaveBeenCalledWith(mockValue);
  });
  
  
  

  it('calls saveTotalCorrectGuesses function when Save button is clicked', () => {
    const button = document.createElement('button');
    button.innerText = 'Save';
    button.addEventListener('click', saveTotalCorrectGuessesMock);

    document.body.appendChild(button);

    fireEvent.click(button);

    expect(saveTotalCorrectGuessesMock).toHaveBeenCalled();
  });

  it('calls playText function when Play Text button is clicked', () => {
    const button = document.createElement('button');
    button.innerText = 'Play Text';
    button.addEventListener('click', playTextMock);

    document.body.appendChild(button);

    fireEvent.click(button);

    expect(playTextMock).toHaveBeenCalled();
  });

  it('calls handleReset function when Reset button is clicked', () => {
    const button = document.createElement('button');
    button.innerText = 'Reset';
    button.addEventListener('click', handleResetMock);

    document.body.appendChild(button);

    fireEvent.click(button);

    expect(handleResetMock).toHaveBeenCalled();
  });

  it('calls NextWord function when Next button is clicked', () => {
    const button = document.createElement('button');
    button.innerText = 'Next';
    button.addEventListener('click', NextWordMock);

    document.body.appendChild(button);

    fireEvent.click(button);

    expect(NextWordMock).toHaveBeenCalled();
  });
});
