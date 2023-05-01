import styled from 'styled-components/macro';
//Login page component

//Styled containers and login buttons
const StyledLoginContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const StyledLoginButton = styled.a`
    display: inline-block;
    background-color: var(--green);
    color: var(--white);
    border-radius: var(--border-radius-pill);
    font-weight: 700;
    font-size: var(--fz-lg);
    padding: var(--spacing-sm) var(--spacing-xl);

    &:hover,
    &:focus {
        text-decoration: none;
        filter: brightness(1.1);
    }
`;
const StyledTitle = styled.h1`
    
    color: var(--green);
    font-size:100px;
    
`;

//Mostly for readability - Essentially, if the app is in a developmental state, the login button will
//redirect you to the login page at localhost. Otherwise, it'll redirect you to the actual login page.
const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://popularify.herokuapp.com/login';

//Actual login component
const Login = () => (
    <>
    
    <StyledLoginContainer>
        <StyledTitle>Popularify for Spotify</StyledTitle>
        <StyledLoginButton href={LOGIN_URI}>
            Log in to Spotify
        </StyledLoginButton>
    </StyledLoginContainer>
    </>
);

export default Login;