import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Logo from '../../assets/chat.png'

export const Contacts = ({contacts, currentUser, changeChat}) => {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage , setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined);

    // test
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ searchResults, setSearchResults ] = useState([])

    const searchHandler = (searchTerm)=>{
        setSearchTerm(searchTerm)
        if(searchTerm !== ''){
            const newContactList = contacts.filter((contact)=>{
                return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
            })
            setSearchResults(newContactList)
        }else{
            setSearchResults(contacts)
        }
    }
    const inputEl = useRef('');
    const getSearchTerm = ()=>{        
        searchHandler(inputEl.current.value)
    }
    
    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.name);
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index);
        changeChat(contact);
    }
  return (
    <>
        {
            currentUserImage && currentUserName && (
                <Container>
                    <div className='brand'>
                        <img src={Logo} />
                        <h3>Gossip</h3>
                    </div>
                    <div className='contacts'>
                        {
                            searchTerm.length < 1 ? 
                                contacts.map((contact, index)=>{
                                
                                return (
                                    <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} 
                                    onClick={()=>changeCurrentChat(index, contact)} >
                                        <div className='avatar'>
                                            <img src={`data: image/svg+xml;base64, ${contact.avatarImage}`} 
                                            />
                                        </div>
                                        <div className='username'>
                                            <h3>
                                                {contact.name}
                                            </h3>
                                        </div>
                                    </div>
                                )
                            }) :                            
                            searchResults.map((contact, index)=>{
                                
                                return (
                                    <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} 
                                    onClick={()=>changeCurrentChat(index, contact)} >
                                        <div className='avatar'>
                                            <img src={`data: image/svg+xml;base64, ${contact.avatarImage}`} 
                                            />
                                        </div>
                                        <div className='username'>
                                            <h3>
                                                {contact.name}
                                            </h3>
                                        </div>
                                    </div>
                                )
                            })
                        }                        
                    </div>
                    <form >
                        <input className="search" type="text" placeholder="Search" value={searchTerm} onChange={getSearchTerm} ref={inputEl} />
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    </form>
                </Container>
            )
        }
    </>
  )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 82% 8%;
overflow: hidden;
background-color: #cbe6f9;
.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    &::::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: var;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    img{
        height: 2rem;
    }
    h3{
        color: black;
        text-transform: uppercase;
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    .contact{
        background-color: #cae5f8;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
        .avatar{
            img{
                height: 3rem;
            }
        }
        .username{
            h3{
                color: black;
            }
        }
    }
    .selected{
        background-color: #bfd6e6;
    }
}
.current-user{
    background-color: #0099ff;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;
        }
    }
    .username{
        h2{
            color: black;
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username{
                h2{
                    font-size: 1rem;
                }
            }
        }
    }
}
.search{
    width: 90%;
    height: 20px;
    border-radius: 20px;
    margin-left: 10px;
    padding: 10px;
    border: 1px solid  #0099ff;
    padding: 5px;

    &:focus{
        border: 1px solid  blue;
    }
}

.search-icon{
    position: absolute;
    transform: translate(-25px, 8px);
}
`;