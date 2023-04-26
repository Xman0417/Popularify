import styled from 'styled-components/macro';

const StyledAbout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 50px;
    margin: auto;
    justify-content: center;
    align-items:center;
    h1{
        font-size: 60px
    }
    h2{
        font-size: 30px;
    }
    p{
        
    }
`;

const About = () => {
    return(
        <StyledAbout>
            <h1>About Popularify</h1>
            <p>This is an app designed to make the Popularity scores that spotify gives all tracks more transparent.
                At the moment, it's not completely finished, and has some more features that will be added before
                the quota extension will be requested for Spotify. Because of that, this is still in development mode
                and users have to be approved before they can go into the website. We do not store any user information
                and all logins are through Spotify. 
            </p>
            <h2>Popularity Score?</h2>
            <p>This is a number from 0-100 that ranks how popular a song or an artist is in relation to 
                other songs/artists on spotify. As this number grows, the more this song/artist gets added 
                automatically to Spotify's playlists that are sorted by genre. The specific thresholds for playlists
                are unknown to people outside of Spotify, but generally speaking, artists want that number higher.
            </p>
            <h2> Why do I care about this?</h2>
            <p>Some people pride themselves on having a lesser known music taste, using other websites that compare
                the "obscureness" of your music taste to other people who use that website. For those people, Popularify
                can give you an actual number value for that value. Outside of that, some people want to spread the music
                of underrated artists, and if you want to find some of your favorite songs that have relatively low
                popularity scores, you can quickly recommend those! <br /> <br /> A feature to look up songs
                or artists is currently being worked on, and would then also be able to help artists find
                their own popularity scores in order to determine the success of advertising campaigns for their
                own music. 
            </p>
            
        </StyledAbout>
    );
    
}

export default About;