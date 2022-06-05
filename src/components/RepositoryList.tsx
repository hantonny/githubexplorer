import { useState, useEffect } from 'react'
import { RepositoryItem } from "./RepositoryItem"
import Slider from "react-slick";

import '../styles/repositories.scss'

import Img from '../assets/images/logo.svg'
//https://api.github.com/users/hantonny/repos

interface Repository {
    name: string,
    description: string,
    html_url: string,
}

interface Users {
    name: string,
    blog: string,
}


export function RepositoryList() {

    const [nameInput, setNameInput] = useState('')

    function InputName() {
        let inputname = (document.getElementById('userinput') as HTMLInputElement).value
        setNameInput(inputname);
        (document.getElementById('userinput') as HTMLInputElement).value = ''
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    const [repositories, setRepositories] = useState<Repository[]>([])
    const [users, setUsers] = useState<Users>({ name: '', blog: '' })

    useEffect(() => {
        if (nameInput) {
            fetch(`https://api.github.com/users/${nameInput}/repos`)
                .then(response => response.json())
                .then(data => setRepositories(data)).catch((error) =>{
                    console.log('Catch', error);
                })
        } else {
            setRepositories([])
        }
    }, [nameInput])

    useEffect(() => {
        if (nameInput) {
            fetch(`https://api.github.com/users/${nameInput}`)
                .then(response => response.json())
                .then(data => setUsers(data))
        } else {
            setUsers({ name: '', blog: '' })
        }

    }, [nameInput])

    return (
        <section className="repository-list">
            <img src={Img} />
            <h1 className="tituloprincipal">Explore repositórios no Github.</h1>
            <input type="text" id='userinput' placeholder='Coloque seu login' />
            <button type="button" onClick={() => InputName()} className="click">Pesquisar</button>
            {
                !nameInput ? '' :
                    <>
                        <h1>Lista de Repositórios de <a href={users.blog} target="_blank">{users.name}</a></h1>
                        <ul>
                            <Slider {...settings}>
                                {repositories.map(repository => {
                                    return <RepositoryItem key={repository.name} repository={repository} />
                                })}
                            </Slider>

                        </ul>
                    </>
            }
            {
                nameInput ? '' : <h1 className="textovazio">Nenhum repositórios</h1>
            }
        </section>

    )
}