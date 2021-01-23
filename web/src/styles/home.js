import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;

  min-height: 100vh;
`

export const Content = styled.div`
  width: 100%;
  max-width: 900px;

  form {
    display: flex;
    flex-direction: column;

    button {
      flex: 1;

      margin-top: 32px;
      padding: 10px;
      border: none;
      border-radius: 8px;

      background: #fff;
      color: #000;

      font-weight: bold;

      transition: all .1s ease-out;

      &:hover {
        transform: scale(.99);
      }
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  margin-top: 16px;

  span {
    flex: 1;
    display: flex;
    flex-direction: column;

    & + span {
      margin-left: 16px;
    }
  }

  input {
    margin-top: 8px;
    padding: 10px 5px;
    
    border: none;
    border-radius: 4px;
  }
`

export const GraphicContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 32px;
  
  h2 {
    margin-top: 32px;
    margin-bottom: 8px;
  }
`

export const Graphic = styled.div`
  display: grid;

  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);

  span {
    border: 1px solid #dfdfdf70;
    padding: 5px 10px;
    text-align: center;
  }

`


