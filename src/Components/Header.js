import { useEffect } from 'react';
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import { auth, provider } from '../firebase';
import { selectUserName, selectUserEmail,selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/users/userSlice';

const Header=(props)=>{
    const dispatch =useDispatch();
    let navigate = useNavigate();

    const username=useSelector(selectUserName);
    const userphoto=useSelector(selectUserPhoto);


    const handleAuth=()=>{

        if(!username){
            auth.signInWithPopup(provider).then((result)=>{
                // console.log(result);
                setUser(result.user);
             }).catch((error)=>{
                 alert(error.message)
             });
        }else if(username){
            auth.signOut().then(()=>{
                dispatch(setSignOutState())
                navigate("/", { replace: true });
            }).catch((err)=>alert(err.message))
        }
        
    }

    const setUser = (user)=>{
        dispatch(setUserLoginDetails({
            name:user.displayName,
            email:user.email,
            photo:user.photoURL
        }))
    }

    useEffect(()=>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                setUser(user);
                navigate("/home", { replace: true });
            }
        })
    },[username])
    return <Nav>
        <Logo><img src="images/logo.svg"/></Logo>

        {!username? (
            <Login onClick={handleAuth}>Login</Login>
        ):(
            <>
            <NavMenu>
            <a href="/home">
                <img src="/images/home-icon.svg" alt="Home"/>
                <span>HOME</span>
            </a>
          
            <a href="/search">
                <img src="/images/search-icon.svg" alt="Search"/>
                <span>SEARCH</span>
            </a>

            <a href="/watchlist">
                <img src="/images/watchlist-icon.svg" alt="Watchlist"/>
                <span>WATCHLIST</span>
            </a>

            <a href="/originals">
                <img src="/images/original-icon.svg" alt="Original"/>
                <span>ORIGINALS</span>
            </a>

            <a href="/movies">
                <img src="/images/movie-icon.svg" alt="MOVIES"/>
                <span>MOVIES</span>
            </a>

            <a href="/series">
                <img src="/images/series-icon.svg" alt="SERIES"/>
                <span>SERIES</span>
            </a>


        </NavMenu>
        <SignOut>
        <UserImg src={userphoto} alt={username} />
        <DropDown>
            <span onClick={handleAuth}>Sign out</span>
        </DropDown>
        </SignOut>
        </>
        )}
        
        
       
    </Nav>
}
export default Header;

const Nav=styled.nav`
position:fixed;
top:0;
left:0;
right:0;
height:70px;
background-color:#090b13;
display:flex;
justify-content:space-between;
align-items:center;
padding:0 36px;
letter-spacing:16px;
z-index:3;
`;

const Logo=styled.a`
padding:0;
width:80px;
margin-top:4px;
max-height:70px;
font-size:0;
display:inline-block;
img{
    display:block;
    width:100%;
}
`;

const NavMenu=styled.div`
display:flex;
align-items:center;
flex-flow:row nowrap;
height:100%;
jutify-content:flex-end;
margin:0px;
padding:0px;
position:relative;
margin-right:auto;
margin-left:25px;
a{
    display:flex;
    align-items:center;
    padding:0 12px;


img{
    height:20px;
    min-width:20px;
    width:20px;
    z-index:auto;
}

span{
    color:rgb(249, 249, 249);
    font-size:13px;
    letter-spacing:1.42px;
    line-height:1.08;
    white-space:nowrap;
    position:relative;
    padding:2px 0px;

    &:before{
        content:'';
        background-color:rgb(249, 249, 249);
        border-radius:0 0 4px 4px;
        bottom:-6px;
        left:0;
        height:2px;
        opacity:0;
        position:absolute;
        right:0px;
        transform-origin: left center;
        tranform:scaleX(0);
        transition:all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility:hidden;
        width:auto;
        }
    
}



&:hover{
    span:before{
        transform:scaleX(1);
        visibility:visible;
        opacity:1 !important;
    }
}
}
// @media(max-width:768px){
//     display:none;
// }
`;


const Login=styled.a`
background-color:rgba(0, 0, 0, 0.6);
padding:8px 16px;
text-transform:uppercase;
letter-spacing:1.5px;
border:1px solid #f9f9f9;
border-radius:4px;
transition:all .2s ease 0s;

&:hover{
    background-color:#f9f9f9;
    color:#000;
    border-color:transparent;
}
`;


const UserImg= styled.img`
height:100%;
`;

const DropDown = styled.div`
position:absolute;
top:48px;
right:0;
background:rgb(19,19,19);
border:1px solid rgba(151,151,151, 0.34);
border-radius:4px;
box-shadow:rgb(0 0 0 / 50%) 0px 0px 18px 0px;
padding:10px;
font-size:14px;
letter-spacing:3px;
width:100px;
opacity:0;
`;

const SignOut = styled.div`
position:relative;
width:48px;
height:48px;
display:flex;
cursor:pointer;
align-items:center;
justify-content:center;

${UserImg}{
    border-radius:50%;
    width:100%;
    height:100%;
}

&:hover{
    ${DropDown}{
        opacity:1;
        transition-duration:1s;
    }
}
`;



