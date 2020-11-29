import styled from 'styled-components'

const ApplicationsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  
  & div {
    margin: 1rem 0;
    max-width: 30rem;
    width: 100%;
  }
`

export {
  ApplicationsWrapper
}
