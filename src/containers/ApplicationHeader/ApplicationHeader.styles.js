import styled from 'styled-components'
import Layout from 'antd/es/layout'
import { COLORS } from 'theme'

const Logo = styled.img`
  display: block;
  max-height: 6rem;
`

const UserOptions = styled.div`
  display: flex;
  justify-content: space-between;
`

const AuthOptions = styled.div`
  margin-left: 2rem;
  
  & button {
    margin: 0 0.5rem;
  }
`

const MoreOptionsIcon = styled.span`
  margin-left: 0.3rem;
`

const UserName = styled.span`
  margin-right: 1rem;
  font-size: 1.6rem;
`

const Header = styled(Layout.Header)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${COLORS.BACKGROUND};
  box-shadow: 0px 0px 3px grey;
`

export {
  Logo,
  Header,
  UserOptions,
  AuthOptions,
  MoreOptionsIcon,
  UserName
}
