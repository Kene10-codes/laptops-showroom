import styled from 'styled-components'

export const InputContainer = styled.div`
    div {
        display: flex;
        flex-direction: column;
    }
    ,
    label {
        font-size: 1rem;
        color: #282828;
        text-align: left;
        margin-bottom: 3px;
    }
`
export const FormWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Input = styled.input`
    min-width: 200px;
    width: 100%;
    height: 15px;
    radius: 5px;
    width-color: #b1b7d6;
    padding: 10px;
    margin-bottom: 15px;
`

export const Button = styled.button`
    width: 200px;
    height: 40px;
    margin: 15px 0;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    min-width: 300px;
    background: green;
    border: none;
`
